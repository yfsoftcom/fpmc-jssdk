'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _client = require('./client');

var _client2 = _interopRequireDefault(_client);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Query {
  constructor(t) {
    if (!_lodash2.default.isString(t)) {
      throw new Error('Class should be String');
    }
    this._client = new _client2.default();
    this._t = t;
    this._s = 'id-';
    this._l = 100;
    this._k = 0;
    this._c = ' 1=1 ';
    this._f = '*';
  }

  sort(s) {
    this._s = s;
    return this;
  }

  page(p, l) {
    this._l = l || 100;
    this._k = (p - 1) * this._l;
    return this;
  }

  condition(c) {
    this._c = c;
    return this;
  }

  and(a) {
    this._c = this._c + ' and ' + a;
    return this;
  }

  or(o) {
    this._c = this._c + ' or ' + o;
    return this;
  }

  select(f) {
    if (_lodash2.default.isString(f)) {
      f = f.split(',');
    }
    if (!_lodash2.default.has(f, 'id')) {
      f.push('id');
    }
    if (!_lodash2.default.has(f, 'createAt')) {
      f.push('createAt');
    }
    if (!_lodash2.default.has(f, 'updateAt')) {
      f.push('updateAt');
    }
    f = f.join(',');
    this._f = f;
    return this;
  }

  count() {
    return this._client.send('common.count', {
      table: this._t,
      condition: this._c
    });
  }

  first() {
    return this._client.send('common.first', {
      table: this._t,
      condition: this._c,
      sort: this._s,
      limit: this._l,
      skip: this._k,
      fields: this._f
    });
  }

  find() {
    return this._client.send('common.find', {
      table: this._t,
      condition: this._c,
      sort: this._s,
      limit: this._l,
      skip: this._k,
      fields: this._f
    });
  }

  findAndCount() {
    return this._client.send('common.findAndCount', {
      table: this._t,
      condition: this._c,
      sort: this._s,
      limit: this._l,
      skip: this._k,
      fields: this._f
    });
  }

}
exports.default = Query;