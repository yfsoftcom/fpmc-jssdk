import { send } from '../util/kit';
import { getOptions } from '../options';

class Func{
  _funcName: string;

  constructor(funcName: string){
    this._funcName = funcName;
  }

  async invoke( args?: { [index: string]: any }): Promise<{ [index: string]: any }>{
    try {
      return await send( this._funcName, (args || {}), getOptions());
    } catch (error) {
      throw error;
    }
  }
}

export default Func;
export { Func }