import fs from 'node:fs';import path from 'node:path';import {createRequire} from 'node:module';import {fileURLToPath} from 'node:url';
import {recorder} from './observations.mjs';
const configuration=process.argv[2],config=JSON.parse(fs.readFileSync(configuration)),require=createRequire(import.meta.url);
if(process.version!==config.version)throw Error('Wrong resource runtime');
const {run,CEILINGS,checkInput}=require(config.supervisor),manifest=JSON.parse(fs.readFileSync(config.manifest));
manifest.cases.push({assertions:JSON.parse(fs.readFileSync(config.inventory)).assertions});
const report=recorder(manifest,config.lane,process.env.VALUE_RELIABILITY_COMMAND_ID,process.env.VALUE_RELIABILITY_SELECTION),supervisions=[];
const fixture=path.join(path.dirname(config.supervisor),'supervisor-fixture.cjs');
const control=async(mode,wallMs=1000,signal)=>{const r=await run({entry:fixture,args:[mode],node:process.execPath,wallMs,signal});supervisions.push(r);return r;};
await report.observe('RESOURCE-02.1',async({equal,check})=>{const r=await control('spin',300);equal(r.reason,'wall-limit');equal(r.exitSignal,'SIGKILL');check(r.samples>0);equal(r.gone,true);});
await report.observe('RESOURCE-02.2',async({equal,check,rejects})=>{equal(CEILINGS.oldSpaceMiB,128);equal(CEILINGS.rssKiB,384*1024);check(CEILINGS.sampleMs<=25);equal(CEILINGS.items,16384);equal(CEILINGS.depth,16);equal(CEILINGS.wallMs,10000);equal(CEILINGS.logBytes,262144);equal(checkInput([1,2]).items,2);await rejects(()=>checkInput(Array(16385).fill(0)));let deep=0;for(let i=0;i<17;i++)deep=[deep];await rejects(()=>checkInput(deep));return CEILINGS;});
await report.observe('RESOURCE-02.3',async({equal,check})=>{const r=await control('output');equal(r.reason,'output-limit');check(Buffer.byteLength(r.stdout)+Buffer.byteLength(r.stderr)<=CEILINGS.logBytes);equal(r.gone,true);});
await report.observe('RESOURCE-02.4',async({equal})=>{const r=await control('exit');equal(r.exitCode,0);equal(r.gone,true);equal(r.stdout,'ok');const c=new AbortController(),pending=control('spin',1000,c.signal);setTimeout(()=>c.abort(),100);const cancelled=await pending;equal(cancelled.reason,'cancelled');equal(cancelled.gone,true);});
await report.observe('RESOURCE-02.5',async({equal,check})=>{let ticks=0;const timer=setInterval(()=>ticks++,10);let r;try{r=await control('spin',150);}finally{clearInterval(timer);}equal(r.reason,'wall-limit');check(ticks>=2);});
const observations=[];
for(const [id,a]of report.required){
 if(id.startsWith('RESOURCE-02.')||a.observationSubject==='preserved-baseline')continue;
 const entry=fileURLToPath(new URL('./node.mjs',import.meta.url));
 const r=await run({entry,args:[configuration,id],node:process.execPath});supervisions.push(r);
 if(r.exitCode!==0||r.reason||r.spawnError||!r.gone)throw Error('Supervised assertion failed '+id+': '+JSON.stringify(r));
 const result=JSON.parse(fs.readFileSync(path.join(config.childReports,id+'.json')));
 if(result.summary.executed!==1||result.summary.failed||result.observations[0].id!==id)throw Error('Wrong child observation '+id);
 observations.push(...result.observations);
}
await report.observe('RESOURCE-02.6',({check})=>{check(supervisions.length>5);for(const r of supervisions){check([fixture,fileURLToPath(new URL('./node.mjs',import.meta.url))].includes(r.entry));check(r.ceilings.oldSpaceMiB===128);check(r.gone);}return {entries:[...new Set(supervisions.map(r=>r.entry))]};});
const result=report.finish();result.observations.push(...observations);result.summary.executed=result.observations.length;result.summary.failed=result.observations.filter(x=>x.status==='FAIL').length;result.runtime={version:process.version,execPath:process.execPath};result.supervisions=supervisions;
fs.writeFileSync(config.output,JSON.stringify(result,null,2)+'\n',{flag:'wx'});console.log(JSON.stringify({summary:result.summary}));if(result.summary.failed)process.exitCode=1;
