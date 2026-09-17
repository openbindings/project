// Installed-package counterexamples for the bounded adversarial repair pass.
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {createRequire} from 'node:module';
import {execFileSync} from 'node:child_process';
import {recorder} from './observations.mjs';
import {collect,digest,fileHash,runCommand} from '../evidence.mjs';
const c=JSON.parse(fs.readFileSync(process.argv[2]));
const manifest=JSON.parse(fs.readFileSync(c.manifest));
const report=recorder(manifest,c.lane,process.env.VALUE_RELIABILITY_COMMAND_ID,process.env.VALUE_RELIABILITY_SELECTION);
const require=createRequire(path.join(c.consumer,'package.json'));
const jsonata=require('@openbindings/jsonata'),node=require('@openbindings/jsonata/node');
await report.observe('REPAIR-01',async({equal,check,rejects})=>{
  equal(process.version,c.version);
  for(const engine of [jsonata.createJSONata({stack:30}),node.createNodeJSONata({workers:1,stack:30})]) {
    try {
      for(const width of [49,50,128])for(const kind of ['array','object']) {
        const source=kind==='array'?'['+Array(width).fill('x').join(',')+']':'{'+Array.from({length:width},(_,i)=>'"f'+i+'":x').join(',')+'}';
        const value=await engine(source).evaluate({x:3});
        equal(Object.keys(value).length,width);check(Object.values(value).every(v=>v===3));
      }
      await rejects(()=>engine('($f:=function($n){$n=0?0:1+$f($n-1)};[$f(100),$f(100)])').evaluate(null),e=>e.code==='D1011');
      const value=await engine('($f:=function($n,$a){$n=0?$a:$f($n-1,$a+1)};[$f(100,0),$f(100,0)])').evaluate(null);
      equal(value[0],100);equal(value[1],100);
    } finally {await engine.close?.();}
  }
});
await report.observe('REPAIR-03',async({equal,rejects})=>{
  const rows=JSON.parse(execFileSync(process.execPath,['--expose-gc','--max-old-space-size=128',c.lifetimeProbe,c.consumer],{encoding:'utf8',timeout:10000}));
  equal(rows.length,4);
  for(const row of rows){equal(row.inputRetained,false);equal(row.outputRetained,false);equal(JSON.stringify(row.costsAfter),JSON.stringify(row.costsBefore));}
  for(const engine of [jsonata,node.createNodeJSONata({workers:1})]){
    try {
      const session=engine('$').session({x:1});const value=await session.complete();
      const pending=session.complete();session.close();session.close();
      await rejects(()=>pending,e=>e.code==='ERR_JSON_DISPOSED_SESSION');equal(value.x,1);
      await rejects(()=>session.complete(),e=>e.code==='ERR_JSON_DISPOSED_SESSION');
    } finally {await engine.close?.();}
  }
});
await report.observe('REPAIR-04',async({equal,rejects})=>{
  for(const factory of [jsonata.createJSONata,jsonata.createJSONataExecutor,jsonata.createJSONataValueExecutor,node.createNodeJSONata,node.createNodeExecutor]) {
    let calls=0;
    for(const options of [Object.defineProperty({},'timeout',{enumerable:true,get(){calls++;return 100;}}),Object.create({timeout:100}),[],{[Symbol('limit')]:1}]){
      let value;
      try {await rejects(()=>{value=factory(options);});}finally{await value?.close?.();}
    }
    equal(calls,0);
    const accepted=factory(Object.assign(Object.create(null),{timeout:undefined}));await accepted.close?.();
  }
});
await report.observe('REPAIR-02',async({equal,rejects})=>{
  const root=fs.mkdtempSync(path.join(os.tmpdir(),'correction-gate-'));
  try {
    const manifest={rules:{},lanes:{test:'test'},cases:[{assertions:[{id:'A',lanes:['test'],evidenceKind:'runtime'}]}]},selection={acceptance:digest(manifest)};
    const observation={format:'value-reliability.observations@1',commandId:'test',lane:'test',selection:digest(selection),summary:{executed:1,skipped:0,failed:0},observations:[{id:'A',status:'PASS',checks:1,evidenceKind:'runtime'}]};
    fs.writeFileSync(path.join(root,'observation.json'),JSON.stringify(observation));fs.writeFileSync(path.join(root,'raw.json'),'{"coverage":100}');
    const command={format:'value-reliability.command@1',id:'test',lane:'test',selection:digest(selection),exitCode:0,signal:null,timedOut:false,truncated:false,started:'start',ended:'end',files:{},reports:['observation.json','raw.json'].map(name=>({path:name,sha256:fileHash(path.join(root,name))}))};
    fs.writeFileSync(path.join(root,'command.json'),JSON.stringify(command));
    const options={root,manifest,selection,commandFiles:['command.json'],reportFiles:['observation.json']};
    equal(collect(options).status,'COMPLETE');fs.unlinkSync(path.join(root,'raw.json'));await rejects(()=>collect(options));
    fs.writeFileSync(path.join(root,'raw.json'),'{"coverage":0}');await rejects(()=>collect(options));
    fs.writeFileSync(path.join(root,'raw.json'),'{"coverage":100}');equal(collect(options).status,'COMPLETE');
  }finally{fs.rmSync(root,{recursive:true,force:true});}
});
await report.observe('REPAIR-05',async({equal,check})=>{
  const root=fs.mkdtempSync(path.join(os.tmpdir(),'correction-command-'));
  try {
    const marker=path.join(root,'descendant');
    const child='setTimeout(()=>require("node:fs").writeFileSync('+JSON.stringify(marker)+',"alive"),700)';
    const parent='require("node:child_process").spawn(process.execPath,["-e",'+JSON.stringify(child)+'],{stdio:"inherit"});setInterval(()=>{},1000)';
    const start=performance.now();
    const record=await runCommand({root,selection:{},command:[process.execPath,'-e',parent],cwd:root,lane:'control',timeout:200});
    check(performance.now()-start<650);equal(record.timedOut,true);equal(record.signal,'SIGKILL');equal(record.cleanupError,undefined);
    await new Promise(resolve=>setTimeout(resolve,800));equal(fs.existsSync(marker),false);
  }finally{fs.rmSync(root,{recursive:true,force:true});}
});
const result=report.finish();
fs.writeFileSync(c.output,JSON.stringify(result,null,2),{flag:'wx'});
console.log(JSON.stringify({summary:result.summary,failed:result.observations.filter(x=>x.status==='FAIL')}));
if(result.summary.failed)process.exitCode=1;
