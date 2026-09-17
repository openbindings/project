// Isolated staging: never rewrite a worktree package.json or an earlier archive.
import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
const [root, lane, stamp] = process.argv.slice(2);
if (!root || !lane || !stamp) throw Error('worktree root, new lane, stamp required');
if (fs.existsSync(lane)) throw Error('Refuse to overwrite a qualification lane');
fs.mkdirSync(lane,{recursive:true});
const sources = {
  '@openbindings/json':path.join(root,'openbindings-ts/packages/json'),
  '@openbindings/json-schema':path.join(root,'openbindings-ts/packages/json-schema'),
  '@openbindings/jsonata':path.join(root,'jsonata/javascript'),
};
const versions=Object.fromEntries(Object.keys(sources).map(name=>[name,(name.endsWith('/jsonata')?'0.0.0':'0.2.0')+'-valueapireliability.'+stamp]));
const archives=path.join(lane,'archives');fs.mkdirSync(archives);
const manifest={format:'value-api-reliability.packages@1',publication:false,stamp,sources:{},packages:[]};
const digest=file=>createHash('sha256').update(fs.readFileSync(file)).digest('hex');
for(const [name,dir] of Object.entries(sources)) {
  const state=execFileSync('git',['status','--porcelain'],{cwd:dir,encoding:'utf8'}).trim();
  if(state)throw Error('Dirty source: '+name+'\n'+state);
  const commit=execFileSync('git',['rev-parse','HEAD'],{cwd:dir,encoding:'utf8'}).trim();
  const listed=JSON.parse(execFileSync('npm',['pack','--dry-run','--json','--ignore-scripts'],{cwd:dir,encoding:'utf8'}))[0].files;
  const staged=path.join(lane,'staging',name.split('/')[1]);fs.mkdirSync(staged,{recursive:true});
  const inputs={};
  for(const {path:file} of listed) {
    if(file.startsWith('/')||file.split('/').includes('..'))throw Error('Unsafe archive path');
    const from=path.join(dir,file),to=path.join(staged,file);fs.mkdirSync(path.dirname(to),{recursive:true});fs.copyFileSync(from,to);inputs[file]=digest(from);
  }
  const pj=JSON.parse(fs.readFileSync(path.join(staged,'package.json'),'utf8'));
  const changes={version:[pj.version,versions[name]],dependencies:{}};pj.version=versions[name];
  for(const field of ['dependencies','peerDependencies','optionalDependencies','devDependencies'])for(const [dep,spec] of Object.entries(pj[field]??{})) {
    if(versions[dep]){changes.dependencies[field+':'+dep]=[spec,versions[dep]];pj[field][dep]=versions[dep];}
    else if(/^(workspace:|link:|file:)/.test(spec))throw Error('Unresolved local dependency '+dep);
  }
  fs.writeFileSync(path.join(staged,'package.json'),JSON.stringify(pj,null,2)+'\n');
  const out=JSON.parse(execFileSync('npm',['pack','--json','--ignore-scripts','--pack-destination',archives],{cwd:staged,encoding:'utf8'}))[0];
  manifest.sources[name]={dir,commit,inputs,substitutions:changes};
  manifest.packages.push({name,version:versions[name],file:'archives/'+out.filename,sha256:digest(path.join(archives,out.filename))});
}
const consumer=path.join(lane,'consumer');fs.mkdirSync(consumer);
fs.writeFileSync(path.join(consumer,'package.json'),JSON.stringify({private:true,type:'module',dependencies:Object.fromEntries(manifest.packages.map(p=>[p.name,'file:../'+p.file]))},null,2)+'\n');
fs.writeFileSync(path.join(lane,'MANIFEST.json'),JSON.stringify(manifest,null,2)+'\n');
console.log(JSON.stringify({consumer,packages:manifest.packages},null,2));
