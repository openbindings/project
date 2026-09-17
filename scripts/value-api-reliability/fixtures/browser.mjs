import fs from 'node:fs';import {createRequire} from 'node:module';
const c=JSON.parse(fs.readFileSync(process.argv[2])),require=createRequire(c.playwright),playwright=require(c.playwright);
const browser=await playwright[c.browser].launch({headless:true,executablePath:c.executable});
try{
 if(browser.version()!==c.version)throw Error('Wrong actual browser version '+browser.version());
 const page=await browser.newPage(),errors=[];page.on('pageerror',error=>errors.push(error.message));
 await page.setContent('<!doctype html><title>Value API qualification</title>');
 await page.addScriptTag({type:'module',content:fs.readFileSync(c.bundle,'utf8')});await page.waitForFunction(()=>typeof globalThis.runQualification==='function');
 const result=await page.evaluate(async ({manifest,lane,id,selection})=>globalThis.runQualification(manifest,lane,id,selection),{manifest:JSON.parse(fs.readFileSync(c.manifest)),lane:c.lane,id:process.env.VALUE_RELIABILITY_COMMAND_ID,selection:process.env.VALUE_RELIABILITY_SELECTION});
 result.runtime={browser:c.browser,version:browser.version(),executable:c.executable};result.pageErrors=errors;
 fs.writeFileSync(c.output,JSON.stringify(result,null,2),{flag:'wx'});console.log(JSON.stringify({runtime:result.runtime,summary:result.summary,failed:result.observations.filter(x=>x.status==='FAIL'),errors}));
 if(result.summary.failed||errors.length||result.summary.executed===0)process.exitCode=1;
}finally{await browser.close();}
