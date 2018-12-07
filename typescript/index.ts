import DBObject from './bo/DBObject';
import { Options, ping } from './util/kit';
import Constant from './Constant';

function init(options: object): void{
  Constant.setOptions( Options.parse(options) );
}
const fpmc = { init, ping, DBObject };
export default fpmc;
export { init, ping, DBObject };
export { fpmc };
console.log(fpmc)