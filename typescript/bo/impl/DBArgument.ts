import IArgument from '../IArgument';

class DBArgument implements IArgument{

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
      count: 'common.count',
      find: 'common.find',
      findAndCount: 'common.findAndCount',
    }
  }
  
  assignArguments(input: { [index: string]: any; }): void {
    // do nothing.
  }


}

export default DBArgument;
export { DBArgument };