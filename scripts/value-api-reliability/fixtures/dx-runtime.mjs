// Portable witnesses for the public guarantees described by the DX guide.
export async function runtime({json,jsonata,schema,docs}) {
  let checks=0;const rows=[];
  const check=(ok,label)=>{checks++;if(!ok)throw Error(label);};
  const equal=(a,b,label)=>check(Object.is(a,b),label);
  const error=(work,code)=>{let caught;try{work();}catch(e){caught=e;}equal(caught?.code,code,'expected '+code);};
  for(const value of [null,false,0,'']) {
    equal(await jsonata('$').evaluate(value),value,'present falsy value');
    const s=jsonata('$').session(value);
    try{equal(await s.complete(),value,'present completion');const found=await s.select('');check(found.present,'present selection');equal(found.value,value,'selection value');}finally{s.close();}
  }
  const missing=jsonata('missing');equal(await missing.evaluate({}),undefined,'absent evaluation');
  const absent=missing.session({});
  try{equal(await absent.complete(),undefined,'absent completion');const found=await absent.select('');equal(found.present,false,'absent selection');equal(found.value,undefined,'absent member');}finally{absent.close();}
  const source=Uint8Array.of(0,1,254,255),file=json.base64(source);source.fill(0);
  const input={nested:{total:json.number('0.10')},rows:[{name:'a'}],file};
  const output=await jsonata('$').evaluate(input);
  for(const value of [output,output.nested,output.rows,output.rows[0]])check(Object.isFrozen(value),'deeply frozen');
  check(!Object.isFrozen(input)&&!Object.isFrozen(input.rows),'input stays mutable');input.rows.push({name:'b'});equal(output.rows.length,1,'owned snapshot');
  equal(output.file,file,'native pass-through identity');const copy=output.file.bytes();copy[0]=9;equal(file.bytes()[0],0,'mutable detached byte copy');
  const report=schema.compile({type:'object',properties:{file:{type:'string',minLength:8,maxLength:8}}}).validate(output);
  check(report.valid,'length validation');equal(report.costs.encodes,0,'fresh validation is deferred');
  const text=json.stringify(output);check(text.includes('"total":0.10'),'exact token export');equal(json.bytes(json.parse(text).file),undefined,'text does not reconstruct backing');
  equal(String(file),'AAH+/w==','logical Base64');equal(json.bytes('AAH+/w=='),undefined,'no implicit decode');
  let encodes=0;const hex={length:b=>b.length*2,encode:b=>{encodes++;return Array.from(b,x=>x.toString(16).padStart(2,'0')).join('');}};
  const value=json.encoded(Uint8Array.of(251,255),hex);equal(await jsonata('$').evaluate(value),value,'hex native pass-through');equal(encodes,0,'no hex forcing');
  equal(await jsonata('$uppercase($)').evaluate(value),'FBFF','changed logical string');equal(encodes,1,'one hex encode');equal(String(value),'fbff','original unchanged');equal(json.bytes('FBFF'),undefined,'changed primitive has no backing');
  const numeric={n:json.number('0.1')};equal(json.toNumber(json.number('0.5')),0.5,'exact conversion');error(()=>json.toNumber(numeric.n),'ERR_JSON_INEXACT');equal(json.toNumber(numeric.n,{lossy:true}),0.1,'explicit rounding');
  equal(json.plain(numeric,{numbers:'token'}).n,'0.1','token projection changes type');equal(json.plain(numeric,{numbers:'lossy'}).n,0.1,'lossy projection');
  const mutable=json.parse('{"x":[1]}');mutable.x.push(2);equal(mutable.x.length,2,'mutable parse');
  const projection=json.plain({x:[1]});projection.x.push(2);equal(projection.x.length,2,'mutable projection');
  check(json.equal(json.number('0.10'),json.number('0.1')),'logical equality');
  const expression=jsonata('{"total":price*quantity,"other":$error("unused")}'),session=expression.session({price:json.number('0.1'),quantity:3});
  try{const selected=await session.select('/total');check(selected.present,'selected total');equal(String(selected.value),'0.3','exact total');equal(selected.coverage,'selected','selected coverage');let failed;try{await session.complete();}catch(e){failed=e;}equal(failed?.code,'D3137','partial does not prove completion');}finally{session.close();}
  if(docs)equal(await docs(),9,'all ordinary README examples');
  rows.push({id:'DX-runtime',status:'PASS',checks});
  return {status:'PASS',summary:{executed:rows.length,failed:0,skipped:0},assertions:checks,observations:rows};
}

export async function workers({json,createNodeJSONata}) {
  let checks=0;const check=(ok,label)=>{checks++;if(!ok)throw Error(label);};
  const engine=createNodeJSONata({workers:1});
  try {
    for(const value of [null,false,0,''])check(Object.is(await engine('$').evaluate(value),value),'worker present value');
    check(await engine('missing').evaluate({})===undefined,'worker absence');
    const session=engine('missing').session({});try{check(await session.complete()===undefined,'worker completion absence');const found=await session.select('');check(!found.present&&found.value===undefined,'worker absent selection');}finally{session.close();}
    const result=await engine('$').evaluate({nested:{x:[{n:1}]},file:json.base64(Uint8Array.of(1))});
    for(const value of [result,result.nested,result.nested.x,result.nested.x[0]])check(Object.isFrozen(value),'worker result is frozen');
    check(result.file==='AQ=='&&json.bytes(result.file)===undefined,'worker text boundary');
  }finally{await engine.close();}
  return {status:'PASS',assertions:checks};
}
