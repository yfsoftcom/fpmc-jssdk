import _ from 'lodash'
import axios from 'axios'
import { md5 } from './kit'

const sign = (args) =>{
  let ks = _.keys(args)
  ks = ks.sort()
  const content = _.map(ks, k => {
    let val = args[k]
    if(_.isObject(val)){
      val = JSON.stringify(val)
    }
    return k + '=' + encodeURIComponent(val)
  }).join('&')
  return md5(content)
}

const defaultOptions = {
  v: '0.0.1',
  domain: 'http://localhost:9999', // an domain url or ip:port ex: http://localhost:9999
}

class YFClient {

  constructor(){
    if(_.isEmpty(YFClient._options)){
      throw new Error('YFClient has not inited')
    }
  }

  static init(options){
    YFClient._options = _.assign(defaultOptions, options)
    YFClient._options.endpoint = YFClient._options.domain + '/api'
    YFClient._options.ping = YFClient._options.domain + '/ping'
  }

  static ping(){
    return new Promise( (resolve, reject) => {
      axios.get(YFClient._options.ping)
        .then((rsp) => {
          return rsp.data
        })
        .then((json) => {
          resolve(json)
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
      axios.post(YFClient._options.endpoint, inputData)
        .then((rsp) => {
          return rsp.data
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
