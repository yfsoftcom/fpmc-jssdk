export type Options = {
  ping?: string;
  health?: string;
  api?: string;
  biz?: string;
  oauth?: string;
  domain?: string;
  appkey?: string;
  masterKey?: string;
  serverKey?: string;
  accessToken?: string;
  v?: string;
}

interface IFpmOptions {
  getOptions(): Options;
  setOptions(options: Options): FpmOptions;
  setDomain(domain: string): FpmOptions;
  setAccessToken(accessToken: string): FpmOptions;
}

class FpmOptions implements IFpmOptions {
  _settled:boolean = false;
  _options:Options = {
    v: '0.0.1',
  };

  getOptions(): Options {
    if(!this._settled && console.warn){
      console.warn('Warning: you have not call `init(Options)` for the sdk! do you mean to use the default options?', this._options);
    }
    return this._options;
  }

  setOptions(options: Options): FpmOptions {
    this._options = {...this._options, ...options};
    this._settled = true;
    return this;
  }

  setDomain(domain: string): FpmOptions {
    this._options = {...this._options, ...{
      ping: `${domain}/ping`,
      health: `${domain}/health`,
      biz: `${domain}/biz`,
      api: `${domain}/api`,
      oauth: `${domain}/oauth`,
      domain,
    }}
    return this;
  }

  setAccessToken(accessToken: string): FpmOptions {
    this._options.accessToken = accessToken;
    return this;
  }
}

const _defaultOptions: FpmOptions = new FpmOptions();
_defaultOptions.setDomain('http://api.yunplus.io');

const welcome = ():void => {
  if(!console.log) return;
  console.log('welcome to use fpmc-js-sdk V3');
}

const init = (options: Options):void => {
  if (options.domain) {
    _defaultOptions.setDomain(options.domain);
  }
  _defaultOptions.setOptions(options);
}

const getOptions = ():Options => _defaultOptions.getOptions();
const setAccessToken = (token: string): FpmOptions => _defaultOptions.setAccessToken(token);

export default { welcome, init, getOptions, setAccessToken };
export { welcome, init, getOptions, setAccessToken };