import _ from 'lodash'
import YFClient from './client'

class Query {
  constructor(t){
    if(!_.isString(t)){
        throw new Error('Class should be String')
    }
    this._client = new YFClient()
    this._t = t         //table
    this._s = 'id-'    //sort
    this._l = 100       //limit
    this._k = 0        //skip
    this._c = ' 1=1 '  //condition
    this._f = '*'      //fields
  }

  sort(s){
    this._s = s
    return this
  }

  page(p, l){
    this._l = l||100
    this._k = (p-1) * this._l
    return this
  }

  condition(c){
    this._c = c
    return this
  }

  and(a){
    this._c = this._c +' and ' + a
    return this
  }

  or(o){
    this._c = this._c +' or ' + o
    return this
  }

  select(f){
    //主动包含ID，createAt,updateAt
    if(_.isString(f)){
      f = f.split(',')
    }
    if(!_.has(f,'id')){
      f.push('id')
    }
    if(!_.has(f,'createAt')){
      f.push('createAt')
    }
    if(!_.has(f,'updateAt')){
      f.push('updateAt')
    }
    f = f.join(',')
    this._f = f
    return this
  }

  count(){
    return this._client.send('common.count',
            {
              table: this._t,
              condition: this._c,
            })
  }

  //TODO: check result
  first(){
    return this._client.send('common.first',
            {
              table: this._t,
              condition: this._c,
              sort: this._s,
              limit: this._l,
              skip: this._k,
              fields: this._f,
            })
  }

  find(){
    return this._client.send('common.find',
            {
              table: this._t,
              condition: this._c,
              sort: this._s,
              limit: this._l,
              skip: this._k,
              fields: this._f,
            })
  }

  findAndCount(){
    return this._client.send('common.findAndCount',
            {
              table: this._t,
              condition: this._c,
              sort: this._s,
              limit: this._l,
              skip: this._k,
              fields: this._f,
            })
  }

}
export default Query
