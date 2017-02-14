import Func from './function'
import Query from './query'
import { Obj, Batch} from './object'
import YFClient from './client'

export default {
  init: function(options) {
    YFClient.init(options)
  },

  Func: Func,
  Query: Query,
  Object: Obj,
  Batch: Batch,

}
