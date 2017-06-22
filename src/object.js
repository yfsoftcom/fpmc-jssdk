import _ from 'lodash'
import YFClient from './client'
import moment from 'moment'

class Obj {
  constructor(t, d){
    if(!_.isString(t)){
        throw new Error('Object Class should be String');
    }
    this._client = new YFClient()
    this._t = t
    this._d = d || {}
    this.objectId = this._d.id || undefined
    this.fields = YFClient._options.fields
  }

  getNow(type){
    switch(type){
      case 'bigint':
        return _.now()
      case 'timestamp':
        return moment().format('YYYY-MM-DD HH:mm:ss')
    }
   
  }

  set(k, v){
    if(_.isObject(k)){
        this._d = _.assign(this._d,k)
    }else{
        this._d[k] = v
    }
    return this
  }

  get(k){
    if(k){
        return this._d[k]
    }
    return this._d
  }

  getByCondition(c){
    let self = this
    return new Promise((resolve, reject) => {
      self._client.send('common.first', {
        table: this._t,
        condition: c
      }).then((data) => {
        self._d = data
        self.objectId = data.id
        resolve(self)
      }).catch((err)=>{
        reject(err)
      })
    })
  }

  getById(id){
    let self = this
    return new Promise((resolve, reject) => {
      self._client.send('common.get', {
        table: this._t,
        id: id
      }).then((data) => {
        self._d = data
        self.objectId = data.id
        resolve(self)
      }).catch((err)=>{
        reject(err)
      })
    })
  }

  save(d){
    if(this.objectId == undefined){
      throw new Error('save error no objectid')
    }
    if(d){
      this._d = _.assign(this._d, d)
    }
    const _now = this.getNow(this.fields.updateAt.type)
    d[this.fields.updateAt.column] = this._d[this.fields.updateAt.column] = _now
    let self = this

    return new Promise((resolve, reject) => {
      self._client.send('common.update', {
        table: this._t,
        condition: ' id = ' + this.objectId,
        row: d,
      }).then((data) => {
        resolve(self)
      }).catch((err)=>{
        reject(err)
      })
    })

  }

  remove(id){
    this.objectId = id || this.objectId
    if(this.objectId == undefined){
      throw new Error('save error no objectid')
    }
    // DEAD Code
    // this._d.updateAt = _.now()
    let self = this

    return new Promise((resolve, reject) => {
      self._client.send('common.remove', {
        table: this._t,
        id: this.objectId,
      }).then((data) => {
        resolve(this.objectId)
      }).catch((err)=>{
        reject(err)
      })
    })
  }

  create(d){

    if(this.objectId != undefined){
      throw new Error('create error too many objectid')
    }
    if(d){
      this._d = d
    }
    //生成创建时间
    const _now = this.getNow(this.fields.createAt.type)
    this._d[this.fields.createAt.column] = this._d[this.fields.updateAt.column] = _now
    let self = this

    return new Promise((resolve, reject) => {
      self._client.send('common.create', {
        table: this._t,
        row: this._d,
      }).then((data) => {
        self.objectId = data.insertId;
        self._d.id = self.objectId;
        resolve(self)
      }).catch((err)=>{
        reject(err)
      })
    })
  }

}

class Batch {
  constructor(t){
    if(!_.isString(t)){
        throw new Error('Object Class should be String');
    }
    this._client = new YFClient()
    this._t = t
  }

  insert(l){
    const _now = this.getNow(this.fields.createAt.type)
    let self = this
    l = _.map(l, (item)=>{
      item[self.fields.createAt.column] = item[self.fields.updateAt.column] = _now
      return item
    })
    return new Promise((resolve, reject) => {
      self._client.send('common.create', {
        table: this._t,
        row: l,
      }).then((data) => {
        resolve(data)
      }).catch((err)=>{
        reject(err)
      })
    })
  }

}
export { Obj, Batch}
