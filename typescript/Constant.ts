import { Options } from './util/kit';

class Constant{
  private static _options:Options = new Options();

  private static _setted: boolean = false;

  static setOptions(options: Options){
    Constant._setted = true;
    Constant._options = options;
  }

  static getOptions(): Options{
    if(!Constant._setted){
      console.log('Warnning: you have not call `init(Options)` for the sdk! do you mean to use the default options?', Constant._options);
    }
    return Constant._options;
  }
}

export default Constant;
export { Constant };