class Constant{
  private static _options:{[index:string]: any} = {
    ping: 'http://api.yunplus.io/ping',
    endpoint: 'http://api.yunplus.io/api',
    appkey: '123123123',
    masterKey: '123123123',
    v: '0.0.1',
  };

  static welcome():void{
    if(!console.log)
      return;
    console.log('welcome to use fpmc-js-sdk V: 2.0.0');
  }

  private static _setted: boolean = false;

  static setOptions(options: {[index:string]: any}){
    Constant._setted = true;
    Constant._options = options;
  }

  static getOptions(): {[index:string]: any}{
    if(!Constant._setted){
      console.log('Warnning: you have not call `init(Options)` for the sdk! do you mean to use the default options?', Constant._options);
    }
    return Constant._options;
  }
}

export default Constant;
export { Constant };