import axios from 'axios';
import {
  Md5
} from 'ts-md5/dist/md5';
import Exception from '../bo/Exception';

function sign(args: { [index: string]: any }, masterKey: string): string {
  args.masterKey = masterKey;
  let keys = ( < any > Object).keys(args);
  keys = keys.sort();
  const content = keys.map((k: string) => {
    let val = args[k];
    if (typeof (val) == 'object') {
      val = JSON.stringify(val)
    }
    return k + '=' + encodeURIComponent(val);
  }).join('&');
  return Md5.hashStr(content) as string;
}

async function ping(uri: string): Promise < object > {
  try {
    const rsp = await axios.get(uri);
    const {
      data
    } = rsp;
    return data;
  } catch (e) {
    throw e;
  }
}

async function send(method: string, 
  args?: { [index: string]: any }, 
  options?: { [index: string]: any }): Promise<{ [index: string]: any }> {

    // seriralize the json data
  const strOfArgs = JSON.stringify(args);

  // get the options
  const {
    endpoint,
    appkey,
    masterKey,
    v
  } = options;

  // define the payload
  const payload: { [index: string]: any} = {
    method,
    appkey,
    v,
    timestamp: new Date().getTime(),
    param: strOfArgs,
  };
  // make a sign
  payload.sign = sign(payload, masterKey);
  try {
    // post the data
    const rsp = await axios.post(endpoint, payload);
    const {
      data
    } = rsp;
    // return success data if the errno is 0
    if (data.errno === 0)
      return data.data;
    throw new Exception(data);
  } catch (e) {
    // handled ex
    if(e.errno)
      throw e;
    // axios error;
    throw new Exception({ errno: -998, message: e.toString() });
  }
}

export {
  ping,
  send
};