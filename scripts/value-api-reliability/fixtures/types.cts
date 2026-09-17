import jsonata = require('@openbindings/jsonata');
import json = require('@openbindings/json');
const engine:jsonata.Engine=jsonata.createJSONata();
const error:jsonata.JSONataError=new jsonata.JSONataError({code:'T2009',message:'test'});
export async function run(){const expression:jsonata.Expression=jsonata('$sum(prices)');const result=await expression.evaluate<number>({prices:[1,2]});if(result!==3||engine.representation!=='value'||error.code!=='T2009')throw Error('CJS expectation');const x=await jsonata('$').evaluate<json.Value>(json.number('0.1'));if(json.stringify(x)!=='0.1')throw Error('CJS exact value');return true;}
if(false){
 // @ts-expect-error expressions must be strings
 jsonata(1);
 // @ts-expect-error resource values must be numeric
 jsonata.createJSONata({timeout:'1'});
}
