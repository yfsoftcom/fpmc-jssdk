import AbsEntity from './AbsEntity';

class DBObject extends AbsEntity {

  protected getTableField(): string {
    return 'table';
  }

  protected getFunctionNames(): { [index: string]: string } {
    return {
      create: 'common.create',
      first: 'common.first',
      get: 'common.get',
      update: 'common.update',
      remove: 'common.remove',
      clear: 'common.clear',
    }
  }
}

export default DBObject;
export {
  DBObject
};