import AbsEntity from './AbsEntity';

class DBObject extends AbsEntity {
  protected extendArguments(): { [index: string]: any; } {
    return {};
  }

  protected getTableField(): string {
    return 'table';
  }

  protected getFunctionNames(): { [index: string]: string } {
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
}

export default DBObject;
export {
  DBObject
};