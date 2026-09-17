import fs from 'node:fs';import path from 'node:path';import {createRequire} from 'node:module';import {fileURLToPath} from 'node:url';import {spawnSync} from 'node:child_process';import {recorder} from './observations.mjs';
const c=JSON.parse(fs.readFileSync(process.argv[2])),manifest=JSON.parse(fs.readFileSync(c.manifest)),require=createRequire(import.meta.url);
const report=recorder(manifest,c.lane,process.env.VALUE_RELIABILITY_COMMAND_ID,process.env.VALUE_RELIABILITY_SELECTION),entry=fileURLToPath(new URL('./negative-child.mjs',import.meta.url));
const {run}=require(c.supervisor),runs=[];
const witness=async mode=>{const r=await run({entry,args:[c.baselineConsumer,mode],node:c.node18});runs.push(r);if(r.exitCode!==0||r.reason||!r.gone)throw Error(JSON.stringify(r));const output=JSON.parse(r.stdout);if(output.version!==(c.baselineVersion||'v18.20.8'))throw Error('Wrong baseline runtime');return output.result;};
const ownership=async({equal})=>{const r=await witness('schema');equal(r.before,false);equal(r.after,true);};
if(c.lane==='json-owner')await report.observe('REGRESSION-03.1',async({equal})=>equal((await witness('equality')).error,'ERR_JSON_ADMISSION'));
if(c.lane==='schema-owner'){await report.observe('REGRESSION-03.1',ownership);await report.observe('REGRESSION-03.4',ownership);}
if(c.lane==='jsonata-owner'){
 await report.observe('REGRESSION-03.1',async({equal,check})=>{equal((await witness('options')).value,'long');check((await witness('diagnostic')).code!=='T2009');equal((await witness('budget')).ignored,true);const r=await witness('costs');equal(r.aCalls,0);equal(r.A,1);
  const file=path.join(c.baselineConsumer,'reliability-negative.cts');if(!fs.existsSync(file))fs.writeFileSync(file,'import jsonata = require("@openbindings/jsonata");\njsonata("1");\n',{flag:'wx'});
  const type=spawnSync(process.execPath,[c.tsc,'--strict','--noEmit','--target','ES2022','--module','NodeNext','--moduleResolution','NodeNext',file],{encoding:'utf8'});check(type.status!==0);check(type.stdout.includes('TS2349'));return {typeFailure:type.stdout};
 });
 await report.observe('REGRESSION-03.2',({check,equal})=>{const source=fs.readFileSync(c.workBudget,'utf8'),marker='if (++units < 256) return;';check(source.includes(marker));const mutated=source.replace(marker,'return;');const module={exports:{}};new Function('module','require',mutated)(module,require);let now=0;const bad=module.exports.createBudget({timeout:100,now:()=>now});now=101;let detected=false;for(let i=0;i<256;i++)try{bad.step();}catch{detected=true;}equal(detected,false);const good=require(c.workBudget).createBudget({timeout:100,now:()=>now});now=202;detected=false;for(let i=0;i<256;i++)try{good.step();}catch(e){detected=e.code==='D1012';}equal(detected,true);});
 await report.observe('REGRESSION-03.3',async({check})=>{for(const r of await witness('sort'))check(r.copies>r.ceiling);});
 await report.observe('REGRESSION-03.5',async({equal})=>{const r=await witness('costs');equal(r.aCalls,0);equal(r.bCalls,1);equal(r.A,1);equal(r.B,1);});
}
if(c.baselineOnly)await report.observe('SORT-02.4',async({check})=>{const results=await witness('sort');for(const r of results)check(r.copies>r.ceiling);return results;});
const result=report.finish();result.supervisions=runs;fs.writeFileSync(c.output,JSON.stringify(result,null,2),{flag:'wx'});console.log(result.summary);if(result.summary.failed)process.exitCode=1;
