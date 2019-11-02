import DBObject from './bo/impl/DBObject';
import MGObject from './bo/impl/MGObject';
import DBQuery from './bo/impl/DBQuery';
import MGQuery from './bo/impl/MGQuery';
import InfluxQuery from './bo/impl/InfluxQuery';
import Func from './bo/Func';
import { ping } from './util/kit';
import Constant from './Constant';

const isBrowser = (typeof document !== "undefined" && typeof window !== 'undefined');

function init(options: {[index:string]: any}): void{
  Constant.setOptions( options );
}
const fpmc :{[index:string]: any} = { init, ping, Object: DBObject, DBObject, MGObject, MGQuery, Query: DBQuery, Func, DBQuery, InfluxQuery };

export default fpmc;
export { init, ping, DBObject, DBObject as Object, MGObject, Func, DBQuery, MGQuery, DBQuery as Query, InfluxQuery };
export { fpmc };

if(isBrowser){
  (window as any).fpmc = fpmc;
}

Constant.welcome();