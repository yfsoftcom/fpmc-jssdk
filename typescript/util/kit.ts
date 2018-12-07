import axios from 'axios';
import { Md5 } from 'ts-md5/dist/md5';

function sign(args: any): string {
  // let keys = new Array();
  let keys = (<any>Object).keys(args);
  // for( let k in args){
  //   if( k == 'sign' )
  //     continue;
  //   keys.push[k];
  // }
  delete keys.sign;
  keys = keys.sort();
  const content = keys.map( (k:string) => {
    let val = args[k];
    if( typeof (val) == 'object' ){
      val = JSON.stringify(val)
    }
    return k + '=' + encodeURIComponent(val);
  }).join('&');
  return Md5.hashStr(content) as string;
}

async function ping(uri: string): Promise<object> {
  try{
    const rsp = await axios.get(uri);
    const { data } = rsp;
    return data;
  }catch(e){
    throw e;
  }
}

async function send(action: string, args ?: object, options ?: Options): Promise<any> {
  const strOfArgs = JSON.stringify(args);
  const { endpoint, appkey, masterKey, v } = options;
  const inputData = {
    method: action,
    appkey: appkey,
    masterKey: masterKey,
    v: v,
    timestamp: new Date().getTime(),
    param: strOfArgs,
    sign: '',
  };
  inputData.sign = sign(inputData)
  delete inputData.masterKey
  try{
    const rsp = await axios.post(endpoint, inputData);
    const { data } = rsp;
    if( data.errno === 0)
      return data.data;
    throw new Error( JSON.stringify(data) );
  }catch(e){
    throw e;
  }
}

class Options {
  ping :string = 'http://api.yunplus.io/ping';
  endpoint :string = 'http://api.yunplus.io/api';
  appkey :string = '123123123';
  masterKey :string = '123123123';
  v :string = '0.0.1';


  static parse(options: any):Options{
    const _options = new Options();
    
    if(options.appkey)
      _options.appkey = options.appkey;
    
    if(options.masterKey)
      _options.masterKey = options.masterKey;

    if(options.v)
      _options.v = options.v;

    if(options.endpoint)
      _options.endpoint = options.endpoint;

    if(options.ping)
      _options.ping = options.ping;
    return _options;
  }
}

export { ping, send, Options };