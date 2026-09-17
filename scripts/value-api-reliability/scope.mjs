// Paths authorized by DESIGN.md. Read-only fixtures are checked separately.
export function permitsChange(repository, file) {
  if (repository === 'openbindings-ts') {
    // The workspace changelog carries the schema ownership compatibility note.
    return file === 'CHANGELOG.md' || /^packages\/(json|json-schema)\//.test(file);
  }
  if (repository === 'jsonata') return file.startsWith('javascript/');
  if (repository === 'project') return file.startsWith('scripts/value-api-reliability/') || file === 'scripts/value-api-reliability.test.mjs';
  return false;
}
