import IArgument from '../IArgument';

abstract class DBArgument implements IArgument{

  // the mongodb might be 'collection'
  protected _fieldOfTable: string = 'table';

  protected _functionNames: {[index:string]: string};

  constructor(){
    this._fieldOfTable = this.getTableField();
    this._functionNames = this.getFunctionNames();
  }
  extendArguments(): { [index: string]: any; } {
    return {};
  }

  getTableField(): string {
    return 'table';
  }

  getFunctionNames(): { [index: string]: string } {
    return {
      create: 'common.create',
      first: 'common.first',
      get: 'common.get',
      update: 'common.update',
      save: 'common.update',
      remove: 'common.remove',
      clear: 'common.clear',
      batch: 'common.create',
    }
  }
  
  assignArguments(input: { [index: string]: any; }): void {
    // do nothing.
  }


}

export default DBArgument;
export { DBArgument };