#!/usr/bin/env node
import fs from 'node:fs';
import { runCommand } from './evidence.mjs';
const [configuration] = process.argv.slice(2);
if (!configuration) throw new Error('A JSON command configuration is required');
const record = await runCommand(JSON.parse(fs.readFileSync(configuration, 'utf8')));
console.log(JSON.stringify(record));
process.exitCode = record.exitCode === 0 && !record.signal && !record.timedOut && !record.truncated && !record.spawnError ? 0 : 1;
