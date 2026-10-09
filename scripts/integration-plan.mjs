import assert from 'node:assert/strict';
export function integrationPlan(selection,extended=false){
  const source=selection.source, runtime='jsonata';
  assert(source==='all'||Object.hasOwn(selection.refs,source),'Unselected source');
  const selected=names=>names.includes(source);
  return {
    rust_sdk:!!selection.refs.sdk&&selected(['all','sdk','spec']),
    rust_openapi:!!selection.qualifications?.['openapi-client']&&selected(['all','openapi-client']),
    runtime:!!selection.refs[runtime]&&selected(['all','go','typescript','ob',runtime]),
    go:selected(['all','spec','interfaces','go','openapi-client',runtime]),
    typescript:selected(['all','spec','interfaces','go','typescript','openapi-client',runtime]),
    ob:selected(['all','spec','interfaces','go','ob','openapi-client',runtime]),
    elements:source==='elements'||extended&&selected(['all','spec','interfaces','go','typescript','ob',runtime]),
    web:source==='web'||extended&&selected(['all','spec','interfaces','ob',runtime]),
  };
}
export function requireIntegrationResults(plan,results){
  assert.equal(results.resolve,'success','Input resolution must succeed, never skip');
  for(const [lane,required] of Object.entries(plan)){
    assert.equal(results[lane],required?'success':'skipped',lane+': missing, skipped, failed or unexpectedly executed lane');
  }
}
