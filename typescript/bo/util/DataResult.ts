import ObjectId from "./ObjectId";

class DataResult {
  objectId: ObjectId;
  data: { [index: string]: any };

  constructor(objectId: ObjectId, data: { [index: string]: any }){
    this.objectId = objectId;
    this.data = data;
    this.data.createAt = this.data.createAt || ((time) => {
      if(!time) return 0;
      if(/\d{13,}/.test(time)){
        // 时间戳格式的数字
        return parseInt(`${time}`.substring(0,13));
      }
      return 0;
    })(this.data.time);
  }

  get():{ [index: string]: any }{
    return this.data;
  }
}

export default DataResult;
export {
  DataResult
};