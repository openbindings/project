import jsonata,{createJSONata,JSONataError} from '@openbindings/jsonata';
import type {Engine,Selection} from '@openbindings/jsonata';
import * as json from '@openbindings/json';
const engine:Engine=createJSONata();
export async function run(){const selected:Selection<json.Value>=await engine('$').select<json.Value>(1,'');if(!selected.present||selected.value!==1)throw Error('selection');if(await jsonata('1+2').evaluate({})!==3)throw Error('ESM callable');if(new JSONataError({code:'T2009'}).code!=='T2009')throw Error('named error');return true;}
if(false){
 // @ts-expect-error expressions must be strings
 jsonata(1);
}
