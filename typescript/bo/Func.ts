import { send } from '../util/kit';
import Constant from '../Constant';

class Func{
  _funcName: string;

  constructor(funcName: string){
    this._funcName = funcName;
  }

  async invoke( args?: { [index: string]: any }): Promise<{ [index: string]: any }>{
    try {
      return await send( this._funcName, (args || {}), Constant.getOptions());
    } catch (error) {
      throw error;
    }
  }
}

export default Func;
export { Func }