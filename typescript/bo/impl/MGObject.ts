import AbsEntity from './AbsEntity';

class MGObject extends AbsEntity {

  private _db:string = 'foo';

  constructor(db:string, name: string, data ?: {[index:string]: any}){
    super(name, data);
    this._db = db;
  }

  protected extendArguments(): { [index: string]: any; } {
    return { 'dbname': this._db };
  }

  protected getTableField(): string {
    return 'collection';
  }

  protected getFunctionNames(): { [index: string]: string } {
    return {
      create: 'mongo.create',
      first: 'mongo.first',
      get: 'mongo.get',
      update: 'mongo.update',
      remove: 'mongo.remove',
      clear: 'mongo.clean',
      save: 'mongo.save',
      batch: 'mongo.batch',
    }
  }
}

export default MGObject;
export {
  MGObject
};