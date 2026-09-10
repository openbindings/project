import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';
import test from 'node:test';
import {execFileSync} from 'node:child_process';
import {loadProject,resolveSelection,validateCohort} from './project-lib.mjs';
import {integrationPlan,requireIntegrationResults} from './integration-plan.mjs';
import {verifyRuntimeInput} from './runtime-input.mjs';
const root=path.resolve(path.dirname(new URL(import.meta.url).pathname),'..');
const project=loadProject(root),original=project.cohorts.get('cohorts/0.2/next.json');
function fixture(){
  const catalog=structuredClone(project.catalog),cohort=structuredClone(original);
  // Synthetic revisions exercise override behavior without claiming publication.
  catalog.repositories['jsonata']={repository:'openbindings/jsonata',role:'artifact-runtime',cohortTier:'required',defaultBranch:'main',integrationRef:'main',releaseMechanism:'independent-go-and-npm'};
  cohort.components['jsonata']={repository:'openbindings/jsonata',commit:'1'.repeat(40),releaseState:'test fixture only; not published'};
  return {catalog,cohort};
}
test('runtime selection pins exact SHA and supports component/repository overrides',()=>{
  const {catalog,cohort}=fixture();validateCohort(cohort,catalog,'fixture/cohorts/0.2/next.json');
  for(const source of ['jsonata','openbindings/jsonata']){
    const selection=resolveSelection({catalog,cohort,overrideRepository:source,overrideSha:'2'.repeat(40)});
    assert.equal(selection.refs['jsonata'],'2'.repeat(40));
    assert.equal(selection.refs.go,original.components.go.commit);
    assert.deepEqual(integrationPlan(selection),{runtime:true,go:true,typescript:true,ob:true,elements:false,web:false});
    assert(Object.values(integrationPlan(selection,true)).every(Boolean));
  }
  assert.throws(()=>resolveSelection({catalog,cohort,overrideRepository:'jsonata',overrideSha:'main'}));
});
test('runtime events cannot produce a false-green result from skipped consumer jobs',()=>{
  const {catalog,cohort}=fixture(),selection=resolveSelection({catalog,cohort,overrideRepository:'jsonata',overrideSha:'2'.repeat(40)});
  const plan=integrationPlan(selection,true),results={resolve:'success',...Object.fromEntries(Object.keys(plan).map(k=>[k,'success']))};
  requireIntegrationResults(plan,results);
  for(const lane of ['resolve',...Object.keys(plan)])assert.throws(()=>requireIntegrationResults(plan,{...results,[lane]:'skipped'}));
  assert.throws(()=>requireIntegrationResults(plan,{...results,go:'failure'}));
});
test('older cohorts without the dependency stay valid, new SDK inputs fail closed',()=>{
  const older=structuredClone(original);delete older.components.jsonata;
  const selection=resolveSelection({catalog:project.catalog,cohort:older});assert.equal(integrationPlan(selection).runtime,false);
  assert.equal(integrationPlan(resolveSelection({catalog:project.catalog,cohort:original})).runtime,true);
  const workspace=fs.mkdtempSync(path.join(os.tmpdir(),'runtime-selection-'));
  fs.mkdirSync(path.join(workspace,'openbindings-go'));
  fs.writeFileSync(path.join(workspace,'openbindings-go/go.mod'),'module example.test/old\n');
  assert.equal(verifyRuntimeInput(workspace,'').required,false);
  fs.appendFileSync(path.join(workspace,'openbindings-go/go.mod'),'require github.com/openbindings/jsonata/go v0.0.0-dev\n');
  assert.throws(()=>verifyRuntimeInput(workspace,''),/does not include it/);
  assert.throws(()=>verifyRuntimeInput(workspace,'1'.repeat(40)),/missing\/incomplete/);
});
test('selected runtime is an exact clean source checkout, not a claimed SHA over dirty files',()=>{
  const workspace=fs.mkdtempSync(path.join(os.tmpdir(),'runtime-exact-source-'));
  const runtime=path.join(workspace,'jsonata');
  fs.mkdirSync(path.join(runtime,'go'),{recursive:true});
  fs.mkdirSync(path.join(runtime,'javascript'));
  fs.writeFileSync(path.join(runtime,'go/go.mod'),'module example.test/runtime\n');
  fs.writeFileSync(path.join(runtime,'javascript/package-lock.json'),'{}\n');
  const git=args=>execFileSync('git',args,{cwd:runtime,encoding:'utf8',stdio:['ignore','pipe','pipe']}).trim();
  git(['init']);git(['add','go/go.mod','javascript/package-lock.json']);
  git(['-c','user.name=Runtime qualification','-c','user.email=qualification@example.invalid','commit','-m','Isolated source fixture']);
  const head=git(['rev-parse','HEAD']);
  assert.equal(verifyRuntimeInput(workspace,head).head,head);
  assert.throws(()=>verifyRuntimeInput(workspace,'0'.repeat(40)),/differs from selected SHA/);
  fs.appendFileSync(path.join(runtime,'go/go.mod'),'// dirty\n');
  assert.throws(()=>verifyRuntimeInput(workspace,head),/must be clean/);
});
