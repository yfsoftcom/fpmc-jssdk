import Func from './function'
import Query from './query'
import { Obj, Batch } from './object'
import YFClient from './client'

const init = (options) => {
  YFClient.init(options)
}
const ping = YFClient.ping
export default {
  init: init,
  ping: ping,
  Func: Func,
  Query: Query,
  Object: Obj,
  Batch: Batch,
}

export { Obj as Object, Func, Batch, Query, ping, init }


