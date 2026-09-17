import fs from 'node:fs';
import path from 'node:path';
import { createHash, randomUUID } from 'node:crypto';
import { spawn } from 'node:child_process';

export const hash = value => createHash('sha256').update(value).digest('hex');
export const fileHash = file => hash(fs.readFileSync(file));
const canonical = value => Array.isArray(value) ? value.map(canonical) : value && typeof value === 'object'
  ? Object.fromEntries(Object.keys(value).sort().map(key => [key, canonical(value[key])])) : value;
export const digest = value => hash(JSON.stringify(canonical(value)));
const ensure = (value, message) => { if (!value) throw new Error(message); };

/** A run may only refer to its own regular files, including through symlinks. */
export function resolveEvidence(root, name) {
  ensure(typeof name === 'string' && name.length > 0 && !path.isAbsolute(name), 'relative evidence path required');
  const base = fs.realpathSync(root), target = fs.realpathSync(path.resolve(base, name));
  ensure(target.startsWith(base + path.sep) && fs.statSync(target).isFile(), 'evidence escapes run root');
  return target;
}

/** Immutable publication: an existing observation can never be overwritten. */
export function publish(root, name, record) {
  ensure(!path.isAbsolute(name) && !name.split(/[\\/]/).includes('..'), 'unsafe output path');
  const target = path.join(root, name);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  const temporary = target + '.' + randomUUID() + '.tmp';
  fs.writeFileSync(temporary, JSON.stringify(record, null, 2) + '\n', { flag: 'wx' });
  try { fs.linkSync(temporary, target); } finally { fs.unlinkSync(temporary); }
  return name;
}

/** Record the real command exit separately from behavioral observations. */
export async function runCommand({ root, selection, command, cwd, lane, id = randomUUID(), env = {}, reports = [], timeout = 300000, maxLogBytes = 33554432 }) {
  ensure(Array.isArray(command) && command.length > 0 && command.every(x => typeof x === 'string'), 'command argv required');
  ensure(Number.isSafeInteger(timeout) && timeout > 0 && Number.isSafeInteger(maxLogBytes) && maxLogBytes > 0, 'positive command bounds required');
  const started = new Date().toISOString(), chunks = { stdout: [], stderr: [] };
  let size = 0, truncated = false, timedOut = false, spawnError;
  const child = spawn(command[0], command.slice(1), { cwd, env: { ...process.env, ...env, VALUE_RELIABILITY_COMMAND_ID: id, VALUE_RELIABILITY_SELECTION: digest(selection) }, stdio: ['ignore', 'pipe', 'pipe'] });
  const append = stream => data => {
    const room = Math.max(0, maxLogBytes - size);
    chunks[stream].push(data.subarray(0, room));
    size += data.length;
    if (size > maxLogBytes) { truncated = true; child.kill('SIGKILL'); }
  };
  child.stdout.on('data', append('stdout')); child.stderr.on('data', append('stderr'));
  child.on('error', error => { spawnError = error.message; });
  const timer = setTimeout(() => { timedOut = true; child.kill('SIGKILL'); }, timeout);
  const outcome = await new Promise(resolve => child.on('close', (exitCode, signal) => resolve({ exitCode, signal })));
  clearTimeout(timer);
  const files = {};
  fs.mkdirSync(path.join(root, 'commands'), { recursive: true });
  for (const stream of ['stdout', 'stderr']) {
    const name = `commands/${id}.${stream}.log`;
    fs.writeFileSync(path.join(root, name), Buffer.concat(chunks[stream]), { flag: 'wx' });
    files[stream] = { path: name, sha256: fileHash(path.join(root, name)) };
  }
  const outputs = reports.map(name => {
    try { return { path: name, sha256: fileHash(resolveEvidence(root, name)) }; }
    catch { return { path: name, missing: true }; }
  });
  const record = { format: 'value-reliability.command@1', id, lane, selection: digest(selection), command, cwd,
    started, ended: new Date().toISOString(), ...outcome, timedOut, truncated, spawnError, files, reports: outputs };
  publish(root, `commands/${id}.json`, record);
  return record;
}

/** Expand the frozen contract; observations cannot choose their own required set. */
export function obligations(manifest, inventory) {
  const result = new Map();
  const add = assertion => {
    ensure(assertion && typeof assertion.id === 'string' && Array.isArray(assertion.lanes) && assertion.lanes.length, 'invalid assertion');
    for (const lane of assertion.lanes) {
      ensure(Object.hasOwn(manifest.lanes, lane), 'unknown lane ' + lane);
      const key = assertion.id + '/' + lane;
      ensure(!result.has(key), 'duplicate obligation ' + key);
      result.set(key, { ...assertion, lane });
    }
  };
  for (const family of manifest.cases) for (const assertion of family.assertions) add(assertion);
  if (manifest.rules.resourceInventoryVectorsMustAlsoBeCollected) {
    ensure(inventory?.frozen === true && Array.isArray(inventory.assertions) && inventory.assertions.length, 'frozen resource inventory required');
    for (const assertion of inventory.assertions) add(assertion);
  }
  ensure(result.size > 0, 'empty required set');
  return result;
}

/** Pure collection of immutable command/report files. No output files are modified. */
export function collect({ root, manifest, inventory, selection, baselineSelection, commandFiles, reportFiles }) {
  ensure(selection.acceptance === digest(manifest), 'acceptance hash mismatch');
  if (manifest.rules.resourceInventoryVectorsMustAlsoBeCollected) ensure(selection.inventory === digest(inventory), 'inventory hash mismatch');
  for (const file of selection.files ?? []) ensure(fileHash(resolveEvidence(root, file.path)) === file.sha256, 'selected file changed: ' + file.path);
  const read = name => JSON.parse(fs.readFileSync(resolveEvidence(root, name), 'utf8'));
  const commands = new Map(), observations = new Map(), required = obligations(manifest, inventory);
  for (const name of commandFiles) {
    const command = read(name);
    ensure(command.format === 'value-reliability.command@1' && typeof command.id === 'string', 'invalid command record');
    ensure(!commands.has(command.id), 'duplicate command');
    ensure(command.exitCode === 0 && command.signal === null && !command.timedOut && !command.truncated && !command.spawnError, 'command failed: ' + command.id);
    ensure(typeof command.started === 'string' && typeof command.ended === 'string', 'missing command timing');
    for (const file of Object.values(command.files)) ensure(fileHash(resolveEvidence(root, file.path)) === file.sha256, 'command evidence changed');
    commands.set(command.id, command);
  }
  for (const name of reportFiles) {
    const report = read(name);
    ensure(report.format === 'value-reliability.observations@1' && Array.isArray(report.observations), 'invalid observations format');
    const command = commands.get(report.commandId);
    ensure(command, 'observation has no successful command');
    const artifact = command.reports?.find(file => file.path === name);
    ensure(artifact && !artifact.missing && artifact.sha256 === fileHash(resolveEvidence(root, name)), 'report not bound to command output');
    ensure(report.selection === command.selection && report.lane === command.lane, 'report/command selection or lane mismatch');
    ensure(report.summary && report.summary.executed === report.observations.length && report.summary.skipped === 0 && report.summary.failed === 0, 'incomplete report');
    for (const observation of report.observations) {
      const key = observation.id + '/' + report.lane, obligation = required.get(key);
      ensure(obligation && !observations.has(key), 'unknown or duplicate observation ' + key);
      const subject = obligation.observationSubject === 'preserved-baseline' ? baselineSelection : selection;
      ensure(subject && report.selection === digest(subject), 'stale selection for ' + key);
      ensure(observation.status === 'PASS' && Number.isSafeInteger(observation.checks) && observation.checks > 0 && observation.evidenceKind === obligation.evidenceKind, 'failed or wrong-kind observation ' + key);
      observations.set(key, observation);
    }
  }
  const missing = [...required.keys()].filter(key => !observations.has(key));
  ensure(missing.length === 0, 'missing required observations: ' + missing.join(', '));
  return Object.freeze({ status: 'COMPLETE', selection: digest(selection), required: required.size, passed: observations.size });
}
