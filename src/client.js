import _ from 'lodash'
import fetch from 'node-fetch'
import md5 from 'md5'

function sign(args){
  return md5(
      _.map(args, function(val, key){
        if(_.isObject(val)){
          val = JSON.stringify(val)
        }
        return key + '=' + encodeURIComponent(val)
      }).join('&')
    )
}

const defaultOptions = {
  v: '0.0.1',
  endpoint: 'http://api.yunplus.io/api',
  upload: 'http://api.yunplus.io/upload',
  fields: {
    createAt: { column: 'createAt', type: 'bigint', },
    updateAt: { column: 'updateAt', type: 'bigint', }
  }
}

class YFClient {

  constructor(){
    if(_.isEmpty(YFClient._options)){
      throw new Error('YFClient has not inited')
    }
  }

  static init(options){
    YFClient._options = _.assign(defaultOptions, options)
    YFClient._options.upload = YFClient._options.endpoint.replace(/(\/api|\/api\/)$/, '/upload')
    YFClient._options.ping = YFClient._options.endpoint.replace(/(\/api|\/api\/)$/, '/ping')
  }

  static ping(){
    return new Promise( (resolve, reject) => {
      fetch(YFClient._options.ping)
        .then((rsp) => {
          return rsp.json()
        })
        .then((json) => {
          resolve(json)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  upload(data){
    return new Promise( (resolve, reject) => {
      fetch(YFClient._options.upload, {
        method: 'POST',
        body: data
      })
        .then((rsp) => {
          return rsp.json()
        })
        .then((json) => {
          if(json.errno === 0){
            resolve(json.data)
          }else{
            reject(json)
          }
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  send(action, args){
    args = _.isEmpty(args)? '{}': args
    args = _.isString(args)? args: JSON.stringify(args)
    let inputData = {
      method: action,
      appkey: YFClient._options.appkey,
      masterKey: YFClient._options.masterKey,
      v: YFClient._options.v,
      timestamp: _.now(),
      param: args,
    }
    inputData.sign = sign(inputData)
    delete inputData.masterKey

    return new Promise( (resolve, reject) => {
      fetch(YFClient._options.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify (inputData)
      })
        .then((rsp) => {
          return rsp.json()
        })
        .then((json) => {
          if(json.errno === 0){
            resolve(json.data)
          }else{
            reject(json)
          }
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  toString(){
    return 'ops ~ hi there '
  }
}
export default YFClient
