import fs from 'node:fs';import path from 'node:path';import {createRequire} from 'node:module';import {fileURLToPath} from 'node:url';
const c=JSON.parse(fs.readFileSync(process.argv[2])),dir=c.consumer;
const readme=name=>fs.readFileSync(path.join(dir,'node_modules/@openbindings',name,'README.md'),'utf8');
const blocks=name=>[...readme(name).matchAll(/```ts\n([\s\S]*?)```/g)].map(m=>m[1]);
const snippets={json:blocks('json'),jsonata:blocks('jsonata'),schema:blocks('json-schema')};
if(snippets.json.length!==4||snippets.jsonata.length!==6||snippets.schema.length!==1)throw Error('README example inventory changed');
const strip=s=>s.replace(/^import .*;\n/gm,'');
const prelude='import * as json from "@openbindings/json";\nimport jsonata from "@openbindings/jsonata";\nimport {compile} from "@openbindings/json-schema";\nfunction equal(a:unknown,b:unknown){if(!Object.is(a,b))throw Error("documentation expectation");}\nfunction inexact(fn:()=>unknown){try{fn();}catch(e){if((e as {code?:string}).code==="ERR_JSON_INEXACT")return;throw e;}throw Error("missing inexact refusal");}\n';
const checks={
 'json/0':'equal(String(data.id),"9007199254740993");equal(String(data.price),"0.10");equal(json.stringify(data),\'{"id":9007199254740993,"price":0.10}\');equal(file.byteLength,4);equal(file.length,8);equal(String(file),"AAH+/w==");',
 'json/1':'equal(json.toNumber(json.number("0.5")),0.5);',
 'json/2':'equal(String(value),"fbff");equal(json.bytes("fbff"),undefined);equal(value.bytes()[0],251);',
 'json/3':'equal(json.isDecimal(value),true);',
 'jsonata/0':'equal(String(output.total),"0.3");equal(json.stringify(output),\'{"total":0.3}\');',
 'jsonata/1':'equal(report.file,file);equal(report.length,8);equal(report.file.bytes()[3],255);',
 'jsonata/2':'',
 'jsonata/3':'equal(validateTotal.validate(output).valid,true);',
 'schema/0':'equal(report.valid,true);equal(report.costs.encodes,0);equal(variant.costs.encodes,1);equal(variant.costs.forcing["schema-constraint"],4);equal(schema.validate({...value,total:json.number("0.30000000000000004")}).errors[0]?.code,"multiple-of-error");'
};
let text=prelude,calls=[];
for(const [name,items]of Object.entries(snippets))for(const [index,raw]of items.entries()){
 if(name==='jsonata'&&index>=4)continue;
 const id=name+'/'+index,fn='doc_'+name+'_'+index;let code=strip(raw);
 if(id==='json/1')code=code.replace('json.toNumber(json.number("0.1"));','inexact(()=>json.toNumber(json.number("0.1")));');
 if(id==='jsonata/2'){code='const input=json.parse(\'{"price":0.1,"quantity":3}\');\n'+code;code=code.replace('if (selected.present) console.log(String(selected.value), selected.coverage);','equal(selected.present,true); if(selected.present){equal(String(selected.value),"0.3");equal(selected.coverage,"selected");}');}
 if(id==='jsonata/3')code='const output={total:json.number("0.3")};\n'+code;
 text+='async function '+fn+'(){\n'+code+'\n'+checks[id]+'\n}\n';calls.push('await '+fn+'();');
}
text+='export async function runDocs(){'+calls.join('\n')+'return '+calls.length+';}\n';
fs.writeFileSync(path.join(dir,'docs.mts'),text,{flag:'wx'});
const worker=strip(snippets.jsonata[4]);fs.writeFileSync(path.join(dir,'docs-worker.mts'),prelude+'import {createNodeJSONata} from "@openbindings/jsonata/node";\nexport async function runWorkerDoc(){const input=json.parse(\'{"price":0.1,"quantity":3}\');\n'+worker.replace('console.log(String(output));','equal(String(output),"0.3");')+'}\n',{flag:'wx'});
const fixtures=path.join(path.dirname(fileURLToPath(import.meta.url)),'fixtures');
for(const name of ['types.cts','types.mts','browser-boundary.mts'])fs.copyFileSync(path.join(fixtures,name),path.join(dir,name));
fs.writeFileSync(path.join(dir,'doc-inventory.json'),JSON.stringify({counts:Object.fromEntries(Object.entries(snippets).map(([k,v])=>[k,v.length])),snippets},null,2),{flag:'wx'});
const require=createRequire(c.esbuild),esbuild=require(c.esbuild);
const entry=`import * as json from '@openbindings/json';import jsonata from '@openbindings/jsonata';import * as schema from '@openbindings/json-schema';import * as advanced from '@openbindings/json/advanced';import {runDocs} from './docs.mts';import {publicCases} from ${JSON.stringify(path.join(fixtures,'public-cases.mjs'))};import {recorder} from ${JSON.stringify(path.join(fixtures,'observations.mjs'))};globalThis.runQualification=async(manifest,lane,id,selection)=>publicCases({json,jsonata,schema,advanced,docs:runDocs},recorder(manifest,lane,id,selection));`;
fs.writeFileSync(path.join(dir,'browser-entry.mjs'),entry,{flag:'wx'});
const result=await esbuild.build({entryPoints:[path.join(dir,'browser-entry.mjs')],absWorkingDir:dir,bundle:true,platform:'browser',format:'esm',conditions:['browser'],outfile:path.join(dir,'browser.mjs'),metafile:true});
fs.writeFileSync(path.join(dir,'browser-meta.json'),JSON.stringify(result.metafile,null,2),{flag:'wx'});
