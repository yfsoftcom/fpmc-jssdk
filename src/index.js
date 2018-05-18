import Func from './function'
import Query from './query'
import File from './file'
import { Obj, Batch} from './object'
import YFClient from './client'

export default {
  init: function(options) {
    YFClient.init(options)
  },
  ping: YFClient.ping,
  Func: Func,
  Query: Query,
  Object: Obj,
  Batch: Batch,
  File: File

}
