import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { collect, digest, fileHash, publish, runCommand } from './value-api-reliability/evidence.mjs';

function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'value-evidence-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const manifest = { rules: {}, lanes: { node: 'test' }, cases: [{ assertions: [{ id: 'A.1', lanes: ['node'], evidenceKind: 'runtime' }] }] };
  fs.writeFileSync(path.join(root, 'artifact'), 'candidate');
  const selection = { acceptance: digest(manifest), source: 'commit', tool: 'node', runner: 'runner', files: [{ path: 'artifact', sha256: fileHash(path.join(root, 'artifact')) }] };
  fs.writeFileSync(path.join(root, 'log'), 'passed');
  const command = { format: 'value-reliability.command@1', id: 'command', lane: 'node', selection: digest(selection), exitCode: 0, signal: null, timedOut: false, truncated: false, started: 'start', ended: 'end', files: { stdout: { path: 'log', sha256: fileHash(path.join(root, 'log')) } } };
  const report = { format: 'value-reliability.observations@1', commandId: command.id, lane: 'node', selection: command.selection, summary: { executed: 1, skipped: 0, failed: 0 }, observations: [{ id: 'A.1', status: 'PASS', checks: 1, evidenceKind: 'runtime' }] };
  const write = () => { fs.writeFileSync(path.join(root, 'report.json'), JSON.stringify(report)); command.reports = [{ path: 'report.json', sha256: fileHash(path.join(root, 'report.json')) }]; fs.writeFileSync(path.join(root, 'command.json'), JSON.stringify(command)); };
  write();
  const options = { root, manifest, selection, commandFiles: ['command.json'], reportFiles: ['report.json'] };
  return { root, manifest, selection, command, report, options, write };
}

test('complete valid evidence passes without modifying its inputs', t => {
  const f = fixture(t), before = fileHash(path.join(f.root, 'report.json'));
  assert.equal(collect(f.options).status, 'COMPLETE');
  assert.equal(fileHash(path.join(f.root, 'report.json')), before);
});

for (const [name, mutate] of Object.entries({
  'failed lint': f => { f.command.exitCode = 1; },
  'failed coverage': f => { f.command.exitCode = 2; },
  'killed command': f => { f.command.exitCode = null; f.command.signal = 'SIGKILL'; },
  'timeout': f => { f.command.timedOut = true; },
  'truncated command': f => { f.command.truncated = true; },
  'missing lane': f => { f.options.reportFiles = []; },
  'missing vector': f => { f.report.observations = []; f.report.summary.executed = 0; },
  'skipped vector': f => { f.report.summary.skipped = 1; },
  'failed assertion': f => { f.report.observations[0].status = 'FAIL'; },
  'no assertion': f => { f.report.observations[0].checks = 0; },
  'inspection replacing runtime': f => { f.report.observations[0].evidenceKind = 'inspection'; },
  'duplicate stale pass': f => { f.options.reportFiles.push('report.json'); },
  'duplicate command': f => { f.options.commandFiles.push('command.json'); },
  'changed source': f => { f.selection.source = 'other'; },
  'changed runner': f => { f.selection.runner = 'other'; },
  'changed tool': f => { f.selection.tool = 'other'; },
  'changed acceptance': f => { f.manifest.cases[0].assertions[0].claim = 'different'; },
  'changed archive': f => { fs.writeFileSync(path.join(f.root, 'artifact'), 'other'); },
  'changed log': f => { fs.writeFileSync(path.join(f.root, 'log'), 'other'); },
  'wrong runtime': f => { f.report.lane = 'different'; },
  'unknown format': f => { f.report.format = 'unknown'; },
  'report without command': f => { f.options.commandFiles = []; },
  'missing inventory': f => { f.manifest.rules.resourceInventoryVectorsMustAlsoBeCollected = true; f.selection.acceptance = digest(f.manifest); }
})) test('refuses ' + name, t => {
  const f = fixture(t); mutate(f); f.write(); assert.throws(() => collect(f.options));
});

test('refuses malformed/truncated input, missing files, and escaping paths', t => {
  const f = fixture(t);
  fs.writeFileSync(path.join(f.root, 'report.json'), '{'); assert.throws(() => collect(f.options));
  fs.unlinkSync(path.join(f.root, 'report.json')); assert.throws(() => collect(f.options));
  f.options.reportFiles = ['../outside']; assert.throws(() => collect(f.options));
});

test('publication cannot overwrite an earlier observation', t => {
  const f = fixture(t); publish(f.root, 'immutable.json', { a: 1 });
  assert.throws(() => publish(f.root, 'immutable.json', { a: 2 }));
  assert.deepEqual(JSON.parse(fs.readFileSync(path.join(f.root, 'immutable.json'))), { a: 1 });
});

test('runner records independent command failures and real signals', async t => {
  const f = fixture(t);
  const failed = await runCommand({ root: f.root, selection: f.selection, lane: 'node', command: [process.execPath, '-e', 'console.log("tests pass"); process.exit(7)'], cwd: f.root });
  assert.equal(failed.exitCode, 7); assert.equal(failed.signal, null);
  const killed = await runCommand({ root: f.root, selection: f.selection, lane: 'node', command: [process.execPath, '-e', 'setInterval(()=>{},1000)'], cwd: f.root, timeout: 100 });
  assert.equal(killed.timedOut, true); assert.equal(killed.signal, 'SIGKILL');
  const overflow = await runCommand({ root: f.root, selection: f.selection, lane: 'node', command: [process.execPath, '-e', 'console.log("x".repeat(2048))'], cwd: f.root, maxLogBytes: 64 });
  assert.equal(overflow.truncated, true);
  const pass = await runCommand({ root: f.root, selection: f.selection, lane: 'node', command: [process.execPath, '-e', 'console.log("ok")'], cwd: f.root });
  assert.equal(pass.exitCode, 0);
});

test('command identifiers cannot escape the immutable run directory', async () => {
  for (const id of ['../outside', '/absolute', 'a/b', '']) {
    await assert.rejects(runCommand({root:'/unused',selection:{},command:[process.execPath,'-e','throw Error("must not run")'],cwd:process.cwd(),lane:'test',id}), /safe command id/);
  }
});


test('closure derives its self-referential propositions only after all input checks', t => {
  const f=fixture(t);f.manifest.lanes.closing='fresh collection';
  f.manifest.cases.push({assertions:['CLOSE-01.1','CLOSE-01.3'].map(id=>({id,lanes:['closing'],evidenceKind:'runtime'}))});
  f.selection.acceptance=digest(f.manifest);f.command.selection=digest(f.selection);f.report.selection=f.command.selection;f.write();
  assert.throws(()=>collect(f.options),/missing required/);
  const result=collect({...f.options,close:true});assert.equal(result.passed,3);assert.equal(result.terminalObservations.length,2);
  f.report.observations=[];f.report.summary.executed=0;f.write();assert.throws(()=>collect({...f.options,close:true}),/missing required/);
});


test('collection rechecks live source/tool/consumer inputs against the frozen selection',t=>{
 const f=fixture(t),file=path.join(f.root,'external');fs.writeFileSync(file,'original');f.selection.externalInputs=[{path:file,sha256:fileHash(file)}];f.command.selection=digest(f.selection);f.report.selection=f.command.selection;f.write();assert.equal(collect(f.options).status,'COMPLETE');fs.writeFileSync(file,'changed');assert.throws(()=>collect(f.options),/external input changed/);
});


test('assertion recording never coerces retained comparison operands or stores thrown domain objects',async()=>{
 const {recorder}=await import('./value-api-reliability/fixtures/observations.mjs');let calls=0;const native={toString(){calls++;throw Error('force');},toJSON(){calls++;throw Error('force');}};
 const manifest={cases:[{assertions:[{id:'A',lanes:['node'],evidenceKind:'runtime'}]}]};const r=recorder(manifest,'node','id','selection');await r.observe('A',async({equal,rejects})=>{equal(native,native);return rejects(()=>{throw native;},e=>e===native);});assert.equal(r.finish().summary.failed,0);assert.doesNotThrow(()=>JSON.stringify(r.finish()));assert.equal(calls,0);
});
