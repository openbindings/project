import fs from 'node:fs';import path from 'node:path';import os from 'node:os';
import {collect,digest,fileHash,publish,runCommand,obligations} from '../evidence.mjs';
// Fabricated miniature evidence is used only as adversarial INPUT to the gate.
// The outer observations below come from actually accepting/rejecting it.
export async function gateCases(report) {
 const roots=[];
 const fixture=()=>{
  const root=fs.mkdtempSync(path.join(os.tmpdir(),'value-gate-'));roots.push(root);
  const manifest={rules:{},lanes:{node:'fixture'},cases:[{assertions:[{id:'A',lanes:['node'],evidenceKind:'runtime'}]}]};
  fs.writeFileSync(path.join(root,'artifact'),'candidate');fs.writeFileSync(path.join(root,'log'),'ok');
  const selection={acceptance:digest(manifest),source:'source',runner:'runner',tool:'tool',files:[{path:'artifact',sha256:fileHash(path.join(root,'artifact'))}]};
  const command={format:'value-reliability.command@1',id:'command',lane:'node',selection:digest(selection),exitCode:0,signal:null,timedOut:false,truncated:false,started:'start',ended:'end',files:{stdout:{path:'log',sha256:fileHash(path.join(root,'log'))}}};
  const record={format:'value-reliability.observations@1',commandId:'command',lane:'node',selection:command.selection,summary:{executed:1,skipped:0,failed:0},observations:[{id:'A',status:'PASS',checks:1,evidenceKind:'runtime'}]};
  const write=()=>{fs.writeFileSync(path.join(root,'report.json'),JSON.stringify(record));command.reports=[{path:'report.json',sha256:fileHash(path.join(root,'report.json'))}];fs.writeFileSync(path.join(root,'command.json'),JSON.stringify(command));};write();
  return {root,manifest,selection,command,record,write,options:{root,manifest,selection,commandFiles:['command.json'],reportFiles:['report.json']}};
 };
 const refuse=async(a,mutations)=>{for(const mutate of mutations){const f=fixture();mutate(f);f.write();await a.rejects(()=>collect(f.options));}};
 const {observe}=report;
 try{
 await observe('GATE-01.1',async({equal})=>{const f=fixture();for(const code of [0,7]){const r=await runCommand({root:f.root,selection:f.selection,lane:'node',command:[process.execPath,'-e','process.exit('+code+')'],cwd:f.root});equal(r.exitCode,code);equal(r.signal,null);}const r=await runCommand({root:f.root,selection:f.selection,lane:'node',command:[process.execPath,'-e','setInterval(()=>{},1000)'],cwd:f.root,timeout:100});equal(r.signal,'SIGKILL');equal(r.timedOut,true);});
 await observe('GATE-01.2',async({equal,rejects})=>{const f=fixture();publish(f.root,'immutable.json',{n:1});await rejects(()=>publish(f.root,'immutable.json',{n:2}));equal(JSON.parse(fs.readFileSync(path.join(f.root,'immutable.json'))).n,1);});
 await observe('GATE-01.3',a=>refuse(a,[f=>{f.record.observations=[];f.record.summary.executed=0;},f=>{f.record.observations[0].checks=0;}]));
 await observe('GATE-01.4',({equal})=>equal(collect(fixture().options).status,'COMPLETE'));
 await observe('GATE-02.1',a=>refuse(a,[f=>{f.command.exitCode=1;}]));
 await observe('GATE-02.2',a=>refuse(a,[f=>{f.command.exitCode=2;}]));
 await observe('GATE-02.3',a=>refuse(a,[f=>{f.options.reportFiles=[];},f=>{f.record.observations=[];f.record.summary.executed=0;},f=>{f.record.summary.skipped=1;}]));
 await observe('GATE-02.4',a=>refuse(a,[f=>{f.command.exitCode=null;f.command.signal='SIGKILL';},f=>{f.command.exitCode=1;}]));
 await observe('GATE-02.5',async a=>{await refuse(a,[f=>{f.record.format='unknown';}]);const f=fixture();fs.writeFileSync(path.join(f.root,'report.json'),'{');await a.rejects(()=>collect(f.options));});
 await observe('GATE-03.1',a=>refuse(a,[f=>{fs.writeFileSync(path.join(f.root,'artifact'),'changed');},...['source','runner','tool'].map(key=>f=>{f.selection[key]='changed';}),f=>{f.manifest.cases[0].assertions[0].claim='changed';}]));
 await observe('GATE-03.2',a=>refuse(a,[f=>{f.options.reportFiles.push('report.json');},f=>{f.record.selection='stale';},f=>{f.record.observations[0].status='FAIL';}]));
 await observe('GATE-03.3',async({equal,rejects})=>{const f=fixture();f.manifest.rules.resourceInventoryVectorsMustAlsoBeCollected=true;await rejects(()=>obligations(f.manifest));const inventory={frozen:true,assertions:[{id:'I',lanes:['node'],evidenceKind:'resource-test'}]};equal(obligations(f.manifest,inventory).size,2);f.selection.acceptance=digest(f.manifest);f.selection.inventory=digest(inventory);f.command.selection=digest(f.selection);f.record.selection=f.command.selection;f.write();await rejects(()=>collect({...f.options,inventory}));});
 await observe('GATE-03.4',a=>refuse(a,[f=>{f.record.observations[0].evidenceKind='inspection';}]));
 await observe('GATE-03.5',({equal})=>{const f=fixture(),before=fileHash(path.join(f.root,'report.json'));collect(f.options);equal(fileHash(path.join(f.root,'report.json')),before);});
 await observe('REGRESSION-03.1',a=>refuse(a,[f=>{f.command.exitCode=1;},f=>{f.record.observations[0].checks=0;}]));
 }finally{for(const root of roots)fs.rmSync(root,{recursive:true,force:true});}
}
