import _ from 'lodash'
import YFClient from './client'

class Func {
  constructor(funcName){
    this._funcName = funcName
    this._client = new YFClient()
  }

  invoke(argument){
    return this._client.send(this._funcName, argument)
  }

}
export default Func
