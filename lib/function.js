'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _client = require('./client');

var _client2 = _interopRequireDefault(_client);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Func {
  constructor(funcName) {
    this._funcName = funcName;
    this._client = new _client2.default();
  }

  invoke(argument) {
    return this._client.send(this._funcName, argument);
  }

}
exports.default = Func;