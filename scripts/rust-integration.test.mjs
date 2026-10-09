import assert from 'node:assert/strict';
import test from 'node:test';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {loadProject, resolveSelection, validateCohort} from './project-lib.mjs';
import {integrationPlan, requireIntegrationResults} from './integration-plan.mjs';

const project=loadProject(resolve(dirname(fileURLToPath(import.meta.url)), '..'));
const cohort=project.cohorts.get('cohorts/0.2/next.json');
function selected(source) {
  return resolveSelection({catalog:project.catalog, cohort, overrideRepository:source, overrideSha:'a'.repeat(40)});
}
test('SDK override runs Rust and facade independently of legacy engines', () => {
  for (const source of ['sdk','openbindings/sdk']) {
    const selection=selected(source),plan=integrationPlan(selection);
    assert.equal(selection.refs.sdk,'a'.repeat(40));
    assert.equal(plan.rust_sdk,true);
    assert.equal(plan.rust_openapi,false);
    assert.equal(plan.go,false);
    assert.equal(plan.typescript,false);
    assert.match(selection.qualifications.sdk.specificationCommit,/^[0-9a-f]{40}$/);
  }
});
test('OpenAPI overrides run Rust and retained legacy consumers', () => {
  const plan=integrationPlan(selected('openapi-client'));
  for (const name of ['rust_openapi','go','typescript','ob']) assert.equal(plan[name],true);
  assert.equal(plan.rust_sdk,false);
});
test('a historical cohort stays historical and cannot qualify Rust', () => {
  const older=structuredClone(cohort);
  delete older.components.sdk;
  delete older.components['openapi-client'].qualification;
  validateCohort(older,project.catalog,'cohorts/0.2/next.json');
  const plan=integrationPlan(resolveSelection({catalog:project.catalog,cohort:older}));
  assert.equal(plan.rust_sdk,false);
  assert.equal(plan.rust_openapi,false);
});
test('selected Rust results must exist and succeed; skipped is not success', () => {
  const plan=integrationPlan(resolveSelection({catalog:project.catalog,cohort}));
  assert.equal(plan.rust_sdk,true);assert.equal(plan.rust_openapi,true);
  const good={resolve:'success',...Object.fromEntries(Object.entries(plan).map(([name,required])=>[name,required?'success':'skipped']))};
  requireIntegrationResults(plan,good);
  for (const lane of ['rust_sdk','rust_openapi']) {
    for (const result of [undefined,'skipped','failure','cancelled']) assert.throws(()=>requireIntegrationResults(plan,{...good,[lane]:result}));
  }
});
test('Rust SDK qualification requires an exact applied spec input', () => {
  const invalid=structuredClone(cohort);
  invalid.components.sdk.qualification.specificationCommit='release/0.2';
  assert.throws(()=>validateCohort(invalid,project.catalog,'cohorts/0.2/next.json'),/exact applied specification/);
});
