import DBObject from './bo/DBObject';
import { Options, ping } from './util/kit';
import Constant from './Constant';

function init(options: object): void{
  Constant.options = Options.parse(options);
}

export { init, ping, DBObject, DBObject as Object }