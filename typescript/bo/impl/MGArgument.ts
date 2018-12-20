import IArgument from '../IArgument';

class MGArgument implements IArgument{

  _db:string = 'foo';

  extendArguments(): { [index: string]: any; } {
    return { dbname: this._db };
  }

  getTableField(): string {
    return 'collection';
  }

  getFunctionNames(): { [index: string]: string } {
    return {
      create: 'mongo.create',
      first: 'mongo.first',
      get: 'mongo.get',
      update: 'mongo.update',
      remove: 'mongo.remove',
      clear: 'mongo.clean',
      save: 'mongo.save',
      batch: 'mongo.batch',
      count: 'mongo.count',
      find: 'mongo.find',
      findAndCount: 'mongo.findAndCount',
    }
  }
  
  assignArguments(input:{[index:string]: any}) {
    const args = this.extendArguments();
    if(!args) 
      return;
    for (let key in args) {
      input[key] = args[key];
    }
  }


}

export default MGArgument;
export { MGArgument };