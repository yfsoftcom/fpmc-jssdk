import _ from 'lodash'
import fetch from 'node-fetch'
import md5 from 'md5'

const sign = (args) => {
  let argStrArray = _.map(args, (val, key)=>{
    if(_.isObject(val)){
      val = JSON.stringify(val)
    }
    return key + '=' + encodeURIComponent(val)
  })
  const content = argStrArray.join('&')
  const d = md5(content)
  return d
}

const defaultOptions = {
  v: '0.0.1',
  endpoint: 'http://api.yunplus.io/api',
}

class YFClient {

  constructor(){
    console.log('new YFClient')
    if(_.isEmpty(YFClient._options)){
      throw new Error('YFClient has not inited')
    }
  }

  static init(options){
    YFClient._options = _.assign(defaultOptions, options)
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
      }).then((rsp) => {
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
