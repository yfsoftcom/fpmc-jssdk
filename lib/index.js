'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _function = require('./function');

var _function2 = _interopRequireDefault(_function);

var _query = require('./query');

var _query2 = _interopRequireDefault(_query);

var _object = require('./object');

var _client = require('./client');

var _client2 = _interopRequireDefault(_client);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  init: function (options) {
    _client2.default.init(options);
  },

  Func: _function2.default,
  Query: _query2.default,
  Object: _object.Obj,
  Batch: _object.Batch

};