import _ from 'lodash'
import YFClient from './client'

class File {
  constructor(){
    this._client = new YFClient()
  }
  upload(data){
    return this._client.upload(data)
  }
}

export default File