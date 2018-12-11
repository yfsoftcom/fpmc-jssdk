import DBObject from './bo/impl/DBObject';
import DBQuery from './bo/impl/DBQuery';
import Func from './bo/Func';
import { ping } from './util/kit';
import Constant from './Constant';

function init(options: {[index:string]: any}): void{
  Constant.setOptions( options );
}
const fpmc = { init, ping, DBObject, Func, DBQuery };
export default fpmc;
export { init, ping, DBObject, Func, DBQuery };
export { fpmc };

if(typeof window !== 'undefined'){
  (window as any).fpmc = fpmc;
}

Constant.welcome();