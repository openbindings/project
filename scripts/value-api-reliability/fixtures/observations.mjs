// Portable assertion recorder. It never derives PASS from a command exit or count.
export function recorder(manifest, lane, commandId, selection) {
  const required=new Map(manifest.cases.flatMap(f=>f.assertions).filter(a=>a.lanes.includes(lane)).map(a=>[a.id,a]));
  const observations=[];
  const observe=async(id,body)=>{
    if(!required.has(id))return;
    let checks=0;const comparisons=[];
    const check=(condition,message='assertion failed')=>{checks++;if(!condition)throw Error(id+': '+message);};
    const equal=(actual,expected,message)=>{const scalar=v=>v===null||typeof v==='boolean'||typeof v==='number'&&Number.isFinite(v)||typeof v==='string'&&v.length<160;if(comparisons.length<8&&scalar(actual)&&scalar(expected))comparisons.push({actual,expected});check(Object.is(actual,expected),message||'values differ');};
    const rejects=async(work,predicate=()=>true)=>{let failed=false,error;try{await work();}catch(e){failed=true;error=e;}check(failed,'expected failure');check(predicate(error),'wrong failure');return error;};
    const record={id,evidenceKind:required.get(id).evidenceKind,checks:0,status:'FAIL'};
    try{await body({check,equal,rejects});check(checks>0,'empty assertion');record.status='PASS';}catch(error){record.error=error?.stack||String(error);}
    record.checks=checks;record.comparisons=comparisons;observations.push(record);
  };
  return {observe,required,finish:()=>({format:'value-reliability.observations@1',commandId,selection,lane,summary:{executed:observations.length,skipped:0,failed:observations.filter(x=>x.status==='FAIL').length},observations})};
}
