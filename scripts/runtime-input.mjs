// Exact-source integration only, not production dependency publication.
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
export function needsRuntime(workspace){
  const go=path.join(workspace,'openbindings-go/go.mod');
  const ts=path.join(workspace,'openbindings-ts/package.json');
  return fs.existsSync(go)&&/github\.com\/openbindings\/jsonata-runtime\/go\s/.test(fs.readFileSync(go,'utf8')) ||
    fs.existsSync(ts)&&!!JSON.parse(fs.readFileSync(ts)).devDependencies?.['@openbindings/jsonata-runtime'];
}
export function verifyRuntimeInput(workspace,ref){
  const required=needsRuntime(workspace), runtime=path.join(workspace,'jsonata-runtime');
  if(required)assert(ref,'Selected SDK requires jsonata-runtime, but the cohort/selection does not include it');
  if(!ref)return {required,selected:false};
  assert(fs.existsSync(path.join(runtime,'go/go.mod'))&&fs.existsSync(path.join(runtime,'javascript/package-lock.json')),'Selected runtime checkout is missing/incomplete');
  const head=execFileSync('git',['rev-parse','HEAD'],{cwd:runtime,encoding:'utf8'}).trim();
  assert.equal(execFileSync('git',['status','--porcelain','--untracked-files=normal'],{cwd:runtime,encoding:'utf8'}).trim(),'','Exact-source runtime checkout must be clean');
  // Heads mode is explicitly allowed, but an immutable ref must match exactly.
  if(/^[0-9a-f]{40}$/.test(ref))assert.equal(head,ref,'Runtime checkout differs from selected SHA');
  return {required,selected:true,head};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  const [workspaceArg,ref='',workArg]=process.argv.slice(2),workspace=path.resolve(workspaceArg);
  const result=verifyRuntimeInput(workspace,ref);
  if(result.selected&&workArg){
    const cwd=path.resolve(workArg),run=args=>execFileSync('go',args,{cwd,stdio:'inherit',env:{...process.env,GOWORK:path.join(cwd,'go.work')}});
    if(!fs.existsSync(path.join(cwd,'go.work')))run(['work','init','.']);
    run(['work','edit','-use',path.join(workspace,'jsonata-runtime/go')]);
    const module='github.com/openbindings/jsonata-runtime/go';
    // Go forbids replacing every version of a module that is also a workspace
    // member. Replace only explicit prerelease requirements from selected inputs.
    run(['work','edit','-dropreplace',module]);
    const versions=new Set();
    for(const manifest of [path.join(workspace,'openbindings-go/go.mod'),path.join(cwd,'go.mod')]){
      if(!fs.existsSync(manifest))continue;
      const value=JSON.parse(execFileSync('go',['mod','edit','-json',manifest],{encoding:'utf8'}));
      for(const dependency of value.Require??[])if(dependency.Path===module)versions.add(dependency.Version);
    }
    for(const version of versions)run(['work','edit','-replace',module+'@'+version+'='+path.join(workspace,'jsonata-runtime/go')]);
  }
  console.log(JSON.stringify({...result,purpose:'Selected source integration, not registry install proof'}));
}
