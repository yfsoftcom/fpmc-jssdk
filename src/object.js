import _ from 'lodash'
import YFClient from './client'

class Obj {
  constructor(t, d){
    if(!_.isString(t)){
        throw new Error('Object Class should be String');
    }
    this._client = new YFClient()
    this._t = t
    this._d = d || {}
    this.objectId = this._d.id || undefined
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

  getById(id){
    let self = this
    return new Promise((resolve, reject) => {
      self._client.send('common.get', {
        table: this._t,
        id: id
      }).then((data) => {
        self._d = data
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
      this._d = d
    }
    this._d.updateAt = _.now()
    let self = this

    return new Promise((resolve, reject) => {
      self._client.send('common.update', {
        table: this._t,
        condition: ' id = ' + this.objectId,
        row: this._d,
      }).then((data) => {
        resolve(self)
      }).catch((err)=>{
        reject(err)
      })
    })

  }

  remove(){
    if(this.objectId == undefined){
      throw new Error('save error no objectid')
    }
    this._d.updateAt = _.now()
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
    this._d.updateAt = this._d.createAt = _.now()
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
    const _now = _.now()
    l = _.map(l, (item)=>{
      item.updateAt = item.createAt = _now
      return item
    })

    let self = this
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
