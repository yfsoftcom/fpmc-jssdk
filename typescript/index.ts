import DBObject from './bo/impl/DBObject';
import MGObject from './bo/impl/MGObject';
import DBQuery from './bo/impl/DBQuery';
import MGQuery from './bo/impl/MGQuery';
import Func from './bo/Func';
import { ping } from './util/kit';
import Constant from './Constant';

const isBrowser = (typeof document !== "undefined" && typeof window !== 'undefined');

function init(options: {[index:string]: any}): void{
  Constant.setOptions( options );
}
const fpmc :{[index:string]: any} = { init, ping, Object: DBObject, DBObject, MGObject, MGQuery, Query: DBQuery, Func, DBQuery };

export default fpmc;
export { init, ping, DBObject, DBObject as Object, MGObject, Func, DBQuery, MGQuery, DBQuery as Query };
export { fpmc };

if(isBrowser){
  (window as any).fpmc = fpmc;
}

Constant.welcome();