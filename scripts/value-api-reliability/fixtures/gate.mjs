import fs from 'node:fs';import {recorder} from './observations.mjs';import {gateCases} from './gate-cases.mjs';
const config=JSON.parse(fs.readFileSync(process.argv[2])),manifest=JSON.parse(fs.readFileSync(config.manifest));
const report=recorder(manifest,'coordination',process.env.VALUE_RELIABILITY_COMMAND_ID,process.env.VALUE_RELIABILITY_SELECTION);await gateCases(report);const result=report.finish();fs.writeFileSync(config.output,JSON.stringify(result,null,2),{flag:'wx'});console.log(result.summary);if(result.summary.failed)process.exitCode=1;
