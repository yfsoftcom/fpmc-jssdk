'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Batch = exports.Obj = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _client = require('./client');

var _client2 = _interopRequireDefault(_client);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Obj {
  constructor(t, d) {
    if (!_lodash2.default.isString(t)) {
      throw new Error('Object Class should be String');
    }
    this._client = new _client2.default();
    this._t = t;
    this._d = d || {};
    this.objectId = this._d.id || undefined;
  }

  set(k, v) {
    if (_lodash2.default.isObject(k)) {
      this._d = _lodash2.default.assign(this._d, k);
    } else {
      this._d[k] = v;
    }
    return this;
  }

  get(k) {
    if (k) {
      return this._d[k];
    }
    return this._d;
  }

  getById(id) {
    let self = this;
    return new _promise2.default((resolve, reject) => {
      self._client.send('common.get', {
        table: this._t,
        id: id
      }).then(data => {
        self._d = data;
        resolve(self);
      }).catch(err => {
        reject(err);
      });
    });
  }

  save(d) {
    if (this.objectId == undefined) {
      throw new Error('save error no objectid');
    }
    if (d) {
      this._d = d;
    }
    this._d.updateAt = _lodash2.default.now();
    let self = this;

    return new _promise2.default((resolve, reject) => {
      self._client.send('common.update', {
        table: this._t,
        condition: ' id = ' + this.objectId,
        row: this._d
      }).then(data => {
        resolve(self);
      }).catch(err => {
        reject(err);
      });
    });
  }

  remove() {
    if (this.objectId == undefined) {
      throw new Error('save error no objectid');
    }
    this._d.updateAt = _lodash2.default.now();
    let self = this;

    return new _promise2.default((resolve, reject) => {
      self._client.send('common.remove', {
        table: this._t,
        id: this.objectId
      }).then(data => {
        resolve(this.objectId);
      }).catch(err => {
        reject(err);
      });
    });
  }

  create(d) {

    if (this.objectId != undefined) {
      throw new Error('create error too many objectid');
    }
    if (d) {
      this._d = d;
    }

    this._d.updateAt = this._d.createAt = _lodash2.default.now();
    let self = this;

    return new _promise2.default((resolve, reject) => {
      self._client.send('common.create', {
        table: this._t,
        row: this._d
      }).then(data => {
        self.objectId = data.insertId;
        self._d.id = self.objectId;
        resolve(self);
      }).catch(err => {
        reject(err);
      });
    });
  }

}

class Batch {
  constructor(t) {
    if (!_lodash2.default.isString(t)) {
      throw new Error('Object Class should be String');
    }
    this._client = new _client2.default();
    this._t = t;
  }

  insert(l) {
    const _now = _lodash2.default.now();
    l = _lodash2.default.map(l, item => {
      item.updateAt = item.createAt = _now;
      return item;
    });

    let self = this;
    return new _promise2.default((resolve, reject) => {
      self._client.send('common.create', {
        table: this._t,
        row: l
      }).then(data => {
        resolve(data);
      }).catch(err => {
        reject(err);
      });
    });
  }

}
exports.Obj = Obj;
exports.Batch = Batch;