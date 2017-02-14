'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _md = require('md5');

var _md2 = _interopRequireDefault(_md);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const sign = args => {
  let argStrArray = _lodash2.default.map(args, (val, key) => {
    if (_lodash2.default.isObject(val)) {
      val = (0, _stringify2.default)(val);
    }
    return key + '=' + encodeURIComponent(val);
  });
  const content = argStrArray.join('&');
  const d = (0, _md2.default)(content);
  return d;
};

const defaultOptions = {
  v: '0.0.1',
  endpoint: 'http://api.yunplus.io/api'
};

class YFClient {

  constructor() {
    console.log('new YFClient');
    if (_lodash2.default.isEmpty(YFClient._options)) {
      throw new Error('YFClient has not inited');
    }
  }

  static init(options) {
    YFClient._options = _lodash2.default.assign(defaultOptions, options);
  }

  send(action, args) {
    args = _lodash2.default.isEmpty(args) ? '{}' : args;
    args = _lodash2.default.isString(args) ? args : (0, _stringify2.default)(args);
    let inputData = {
      method: action,
      appkey: YFClient._options.appkey,
      masterKey: YFClient._options.masterKey,
      v: YFClient._options.v,
      timestamp: _lodash2.default.now(),
      param: args
    };
    inputData.sign = sign(inputData);
    delete inputData.masterKey;

    return new _promise2.default((resolve, reject) => {
      (0, _nodeFetch2.default)(YFClient._options.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        },
        body: (0, _stringify2.default)(inputData)
      }).then(rsp => {
        return rsp.json();
      }).then(json => {
        if (json.errno === 0) {
          resolve(json.data);
        } else {
          reject(json);
        }
      }).catch(err => {
        reject(err);
      });
    });
  }

  toString() {
    return 'ops ~ hi there ';
  }
}

exports.default = YFClient;