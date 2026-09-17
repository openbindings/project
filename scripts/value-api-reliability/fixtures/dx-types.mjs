// Focused installed-declaration checks; no new build or test framework.
import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
const c=JSON.parse(fs.readFileSync(process.argv[2])),require=createRequire(c.compiler),ts=require(c.compiler);
const dir=path.dirname(fileURLToPath(import.meta.url)),body=fs.readFileSync(path.join(dir,'dx-types.body.ts'),'utf8');
const packages=['@openbindings/json','@openbindings/json/advanced','@openbindings/json/values','@openbindings/json/internal','@openbindings/jsonata','@openbindings/jsonata/node','@openbindings/json-schema'];
const esm='import * as json from "@openbindings/json";\nimport jsonata, * as api from "@openbindings/jsonata";\n';
const cjs='import json = require("@openbindings/json");\nimport jsonata = require("@openbindings/jsonata");\nimport api = require("@openbindings/jsonata");\n';
const worker=`import {createNodeJSONata} from '@openbindings/jsonata/node';
async function workerTypes(){
 const engine=createNodeJSONata();
 const expression=engine('$');
 const result=await expression.evaluate<{file:string}>({file:json.base64(Uint8Array.of(1))});
 // @ts-expect-error DX-RED: worker result can be absent
 result.file;
 if(result!==undefined){
  const text:string=result.file;void text;
  // @ts-expect-error DX-RED: worker containers are readonly
  result.file='changed';
 }
 const session=expression.session({});
 const done=await session.complete<{file:string}>();
 // @ts-expect-error DX-RED: worker completion can be absent
 done.file;
 session.close();await engine.close();
}
void workerTypes;
`;
const results=[];
for(const lane of c.lanes||['esm','cjs','browser']) {
 const prefix=lane==='cjs'?cjs:esm;
 const inventoryPackages=packages.filter(p=>lane!=='browser'||!p.endsWith('/node'));
 const inventories=inventoryPackages.map((p,i)=>`import * as inventory${i} from '${p}';`).join('\n');
 const extra=lane==='browser'?"// @ts-expect-error Node-only entry is unavailable in browsers\nimport {createNodeJSONata} from '@openbindings/jsonata/node';\nvoid createNodeJSONata;\n":worker;
 // Baseline positivity is independent of the stricter-result witnesses.
 const source=prefix+inventories+'\n'+body+'\n'+extra;
 const file=path.join(c.consumer,'dx-'+lane+(lane==='cjs'?'.cts':'.mts'));
 if(fs.existsSync(file)){if(fs.readFileSync(file,'utf8')!==source)throw Error('Existing fixture differs: '+file);}
 else fs.writeFileSync(file,source,{flag:'wx'});
 if(c.prepareOnly)continue;
 const options={strict:true,noEmit:true,target:ts.ScriptTarget.ES2022,module:lane==='browser'?ts.ModuleKind.ESNext:ts.ModuleKind.NodeNext,moduleResolution:lane==='browser'?ts.ModuleResolutionKind.Bundler:ts.ModuleResolutionKind.NodeNext,...(lane==='browser'?{customConditions:['browser']}:{})};
 const program=ts.createProgram([file],options),diagnostics=ts.getPreEmitDiagnostics(program);
 const lines=source.split('\n');
 const formatted=diagnostics.map(d=>({code:d.code,file:d.file?.fileName,line:d.file&&d.start!==undefined?d.file.getLineAndCharacterOfPosition(d.start).line+1:undefined,message:ts.flattenDiagnosticMessageText(d.messageText,'\n')}));
 const expected=lines.flatMap((line,i)=>line.includes('@ts-expect-error DX-RED:')?[i+1]:[]);
 const checker=program.getTypeChecker(),sf=program.getSourceFile(file),symbols={};
 for(const statement of sf.statements) if(ts.isImportDeclaration(statement)&&statement.importClause?.namedBindings&&ts.isNamespaceImport(statement.importClause.namedBindings)&&statement.importClause.namedBindings.name.text.startsWith('inventory')) {
  const module=checker.getSymbolAtLocation(statement.moduleSpecifier);
  symbols[statement.moduleSpecifier.text]=checker.getExportsOfModule(module).map(symbol=>{
   const target=symbol.flags&ts.SymbolFlags.Alias?checker.getAliasedSymbol(symbol):symbol;
   return {name:symbol.name,deprecated:target.getJsDocTags(checker).filter(t=>t.name==='deprecated').map(t=>ts.displayPartsToString(t.text))};
  }).sort((a,b)=>a.name.localeCompare(b.name));
 }
 const expectedRed=c.baseline===true;
 const valid=expectedRed?formatted.length===expected.length&&formatted.every(d=>d.code===2578&&d.file===file&&expected.includes(d.line)):formatted.length===0;
 results.push({lane,valid,expectedRed,expectedRedCount:expected.length,expectedErrorDirectives:lines.filter(x=>x.includes('@ts-expect-error')).length,options,diagnostics:formatted,symbols});
}
const report={status:c.prepareOnly?'PREPARED':results.every(r=>r.valid)?'PASS':'FAIL',compiler:ts.version,baseline:c.baseline===true,results};
fs.writeFileSync(c.output,JSON.stringify(report,null,2)+'\n',{flag:'wx'});
console.log(JSON.stringify({status:report.status,lanes:results.map(r=>({lane:r.lane,valid:r.valid,expectedRed:r.expectedRedCount,diagnostics:r.diagnostics}))}));
if(report.status==='FAIL')process.exitCode=1;
