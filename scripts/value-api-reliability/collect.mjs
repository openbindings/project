import fs from 'node:fs';import {collect,publish} from './evidence.mjs';
const config=JSON.parse(fs.readFileSync(process.argv[2]));const result=collect(config);
const record={...result,collectorProcess:{pid:process.pid,version:process.version,commandId:process.env.VALUE_RELIABILITY_COMMAND_ID},commandId:process.env.VALUE_RELIABILITY_COMMAND_ID};
publish(config.root,process.argv[3],record);console.log(JSON.stringify({status:record.status,required:record.required,passed:record.passed}));
