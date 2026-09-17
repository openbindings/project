import fs from 'node:fs';import path from 'node:path';import {createRequire} from 'node:module';import {pathToFileURL,fileURLToPath} from 'node:url';import {spawnSync} from 'node:child_process';
import {recorder} from './observations.mjs';
const c=JSON.parse(fs.readFileSync(process.argv[2])),r=recorder(JSON.parse(fs.readFileSync(c.manifest)),c.lane,process.env.VALUE_RELIABILITY_COMMAND_ID,process.env.VALUE_RELIABILITY_SELECTION);
const browser=c.lane==='types-browser',args=['--strict','--target','ES2022','--module',browser?'ESNext':'NodeNext','--moduleResolution',browser?'Bundler':'NodeNext',...(browser?['--customConditions','browser','--noEmit']:['--outDir','compiled']),'types.mts','docs.mts',...(browser?['browser-boundary.mts']:['types.cts','docs-worker.mts'])];
const type=spawnSync(process.execPath,[c.tsc,...args],{cwd:c.consumer,encoding:'utf8',maxBuffer:1024*1024});
fs.writeFileSync(c.log,JSON.stringify({command:[process.execPath,c.tsc,...args],status:type.status,signal:type.signal,stdout:type.stdout,stderr:type.stderr}),{flag:'wx'});
if(type.status!==0)throw Error(type.stdout+type.stderr);
const dxConfig={consumer:c.consumer,compiler:path.resolve(path.dirname(c.tsc),'../lib/typescript.js'),lanes:browser?['browser']:['esm','cjs'],output:c.log.replace(/\.json$/,'-contracts.json')};
const dxFile=c.log.replace(/\.json$/,'-contracts-config.json');fs.writeFileSync(dxFile,JSON.stringify(dxConfig,null,2),{flag:'wx'});
const dx=spawnSync(process.execPath,[path.join(path.dirname(fileURLToPath(import.meta.url)),'dx-types.mjs'),dxFile],{cwd:c.consumer,encoding:'utf8',maxBuffer:1024*1024});
if(dx.status!==0)throw Error(dx.stdout+dx.stderr);
await r.observe('IMPORT-01.1',({equal})=>equal(type.status,0));
await r.observe('IMPORT-01.4',({check})=>{for(const file of ['types.cts','types.mts'])check(fs.readFileSync(path.join(c.consumer,file),'utf8').includes('@ts-expect-error'));check(type.status===0);});
if(!browser){
 const require=createRequire(path.join(c.consumer,'package.json'));
 await r.observe('IMPORT-01.3',async({equal})=>{equal(await require('./compiled/types.cjs').run(),true);equal(await (await import(pathToFileURL(path.join(c.consumer,'compiled/types.mjs')))).run(),true);});
 await r.observe('DOC-01.1',async({equal})=>{equal(await (await import(pathToFileURL(path.join(c.consumer,'compiled/docs.mjs')))).runDocs(),9);await (await import(pathToFileURL(path.join(c.consumer,'compiled/docs-worker.mjs')))).runWorkerDoc();equal(type.status,0);});
 await r.observe('DOC-01.4',async({equal})=>{equal(await require('./compiled/types.cjs').run(),true);equal(await (await import(pathToFileURL(path.join(c.consumer,'compiled/types.mjs')))).run(),true);});
}else{
 const require=createRequire(c.esbuild),esbuild=require(c.esbuild);
 await r.observe('IMPORT-02.2',({check})=>{const meta=JSON.parse(fs.readFileSync(path.join(c.consumer,'browser-meta.json')));check(Object.keys(meta.inputs).some(x=>x.includes('jsonata/value-api.browser.mjs')));check(!Object.keys(meta.inputs).some(x=>x.includes('node-executor')||x.includes('json-worker')));for(const out of Object.values(meta.outputs))check(out.imports.length===0);});
 await r.observe('IMPORT-02.3',async({rejects,check})=>{await rejects(()=>esbuild.build({stdin:{contents:"import '@openbindings/jsonata/node'",resolveDir:c.consumer},bundle:true,platform:'browser',write:false,logLevel:'silent'}),e=>e.errors.length>0);check(type.status===0);});
}
const result=r.finish();result.typeCommand={status:type.status,command:[process.execPath,c.tsc,...args]};result.contracts={report:dxConfig.output,status:dx.status};fs.writeFileSync(c.output,JSON.stringify(result,null,2),{flag:'wx'});console.log(result.summary);if(result.summary.failed)process.exitCode=1;
