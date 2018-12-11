import DBObject from './bo/impl/DBObject';
import DBQuery from './bo/impl/DBQuery';
import Func from './bo/Func';
import { ping } from './util/kit';
import Constant from './Constant';

function init(options: {[index:string]: any}): void{
  Constant.setOptions( options );
}
const fpmc :{[index:string]: any} = { init, ping, DBObject, Func, DBQuery };
fpmc.Object = DBObject;

export default fpmc;
export { init, ping, DBObject as Object, Func, DBQuery };
export { fpmc };

if(typeof window !== 'undefined'){
  (window as any).fpmc = fpmc;
}

Constant.welcome();