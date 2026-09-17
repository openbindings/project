import fs from 'node:fs';import path from 'node:path';import os from 'node:os';import {execFileSync} from 'node:child_process';import {recorder} from './observations.mjs';import {gateCases} from './gate-cases.mjs';import {collect,digest,fileHash} from '../evidence.mjs';
const c=JSON.parse(fs.readFileSync(process.argv[2])),read=p=>JSON.parse(fs.readFileSync(p)),manifest=read(c.manifest),base=read(c.baseline),selection=read(c.selection),packages=read(c.packages),report=recorder(manifest,'closing',process.env.VALUE_RELIABILITY_COMMAND_ID,process.env.VALUE_RELIABILITY_SELECTION);
const git=(dir,...args)=>execFileSync('git',args,{cwd:dir,encoding:'utf8'}).trim();
await report.observe('CLOSE-01.2',async({equal,rejects,check})=>{
 const controls=recorder(manifest,'coordination','closing-controls',digest(selection));await gateCases(controls);equal(controls.finish().summary.failed,0);check(controls.finish().summary.executed>=14);
 if(!c.previousCollection)return;
 const good=read(c.previousCollection);equal(collect(good).status,'COMPLETE');
 const changes=[
  ['failed lint',x=>{x.commands.find(v=>v.command.some(t=>t==='lint')).exitCode=1;}],
  ['failed coverage',x=>{x.commands.find(v=>v.command.includes('check-coverage')).exitCode=1;}],
  ['killed command',x=>{x.commands[0].signal='SIGKILL';x.commands[0].exitCode=null;}],
  ['missing lane',x=>{x.config.reportFiles=x.config.reportFiles.filter(f=>read(path.join(x.root,f)).lane!=='webkit');}],
  ['missing vector',x=>{x.reports[0].observations.pop();x.reports[0].summary.executed--;}],
  ['skipped vector',x=>{x.reports[0].summary.skipped=1;}],
  ['failed assertion',x=>{x.reports[0].observations[0].status='FAIL';}],
  ['duplicate pass',x=>{x.config.reportFiles.push(x.config.reportFiles[0]);}],
  ['stale pass',x=>{x.reports[0].selection='stale';}],
  ['unknown format',x=>{x.reports[0].format='unknown';}],
  ['changed runner',x=>{x.config.selection.externalInputs[0].sha256='0'.repeat(64);}],
  ['changed archive',x=>{const f=x.config.selection.files.find(f=>f.path.endsWith('.tgz'));fs.appendFileSync(path.join(x.root,f.path),'changed');}]
 ];
 for(const [name,mutate]of changes){
  const root=fs.mkdtempSync(path.join(os.tmpdir(),'value-final-control-'));
  try{
   const config=structuredClone(good);config.root=root;const names=new Set([...good.commandFiles,...good.reportFiles,...good.selection.files.map(f=>f.path)]);
   for(const file of good.commandFiles){const command=read(path.join(good.root,file));for(const x of Object.values(command.files))names.add(x.path);for(const x of command.reports||[])if(!x.missing)names.add(x.path);}
   for(const file of names){const to=path.join(root,file);fs.mkdirSync(path.dirname(to),{recursive:true});fs.copyFileSync(path.join(good.root,file),to);}
   equal(collect(config).status,'COMPLETE');
   const commands=good.commandFiles.map(f=>read(path.join(root,f))),reports=good.reportFiles.map(f=>read(path.join(root,f)));
   mutate({root,config,commands,reports});
   for(const [i,r]of reports.entries())fs.writeFileSync(path.join(root,good.reportFiles[i]),JSON.stringify(r));
   for(const [i,command]of commands.entries()){for(const r of command.reports||[])if(!r.missing)r.sha256=fileHash(path.join(root,r.path));fs.writeFileSync(path.join(root,good.commandFiles[i]),JSON.stringify(command));}
   await rejects(()=>collect(config));
  }finally{fs.rmSync(root,{recursive:true,force:true});}
 }
});
await report.observe('CLOSE-01.4',({equal,check})=>{const d=read(c.dispositions);for(const key of ['sort-allocation','owned-loop-cooperation','result-budget-classification']){equal(d[key].status,'PASS');check(d[key].cases.length>0);check(d[key].limits.length>0);}});
await report.observe('CLOSE-01.5',({equal,check})=>{equal(selection.acceptance,digest(manifest));equal(selection.inventory,digest(read(c.inventory)));equal(selection.exemptions.length,0);check(!('inheritedPass' in selection));});
await report.observe('CLOSE-02.1',({equal})=>{for(const [file,sha]of Object.entries(base.preserved))equal(fileHash(file),sha);});
await report.observe('CLOSE-02.2',({equal})=>{for(const s of Object.values(selection.sources)){equal(git(s.dir,'rev-parse','HEAD'),s.commit);equal(git(s.dir,'status','--porcelain'),'');}for(const f of selection.externalInputs)equal(fileHash(f.path),f.sha256);});
await report.observe('CLOSE-02.3',({equal})=>{for(const [name,s]of Object.entries(packages.sources)){equal(git(s.dir,'rev-parse','HEAD'),s.commit);for(const [f,sha]of Object.entries(s.inputs))equal(fileHash(path.join(s.dir,f)),sha);}for(const p of packages.packages)equal(fileHash(path.join(path.dirname(c.packages),p.file)),p.sha256);});
await report.observe('CLOSE-02.4',({check})=>{const text=fs.readFileSync(c.rollback,'utf8');for(const name of ['openbindings-ts','jsonata'])check(text.includes(base.sources[name].commit));for(const p of c.baselineArchives)check(text.includes(p.sha256));check(text.includes('coordinated'));});
await report.observe('CLOSE-02.5',({check,equal})=>{equal(packages.publication,false);for(const name of ['openbindings-ts','jsonata','project'])check(git(selection.sources[name].dir,'branch','--show-current').startsWith('codex/value-api-reliability-')); // Read-only corpus fixtures may be detached.
 for(const file of fs.readdirSync(path.join(c.root,'commands')).filter(x=>x.endsWith('.json'))){const r=read(path.join(c.root,'commands',file));check(!r.command.some(x=>['push','publish','deploy','promotion','merge'].includes(x)));}});
const result=report.finish();result.finalInvalidControls=Boolean(c.previousCollection);fs.writeFileSync(c.output,JSON.stringify(result,null,2),{flag:'wx'});console.log(JSON.stringify({summary:result.summary,failed:result.observations.filter(x=>x.status==='FAIL')}));if(result.summary.failed)process.exitCode=1;
