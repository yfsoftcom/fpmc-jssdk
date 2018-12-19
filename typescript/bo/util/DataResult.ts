import ObjectId from "./ObjectId";

class DataResult {
  objectId: ObjectId;
  data: { [index: string]: any };

  constructor(objectId: ObjectId, data: { [index: string]: any }){
    this.objectId = objectId;
    this.data = data;
  }

  get():{ [index: string]: any }{
    return this.data;
  }
}

export default DataResult;
export {
  DataResult
};