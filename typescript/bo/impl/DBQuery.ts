import AbsQuery from './AbsQuery';
import { Query } from '../Query';

class DBQuery extends AbsQuery{

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
      count: 'common.count',
      find: 'common.find',
      findAndCount: 'common.findAndCount',
    }
  }

  or(condition: { [index: string]: any; }): Query {
    throw new Error("Method not implemented.");
  }

}

export default DBQuery;
export {
  DBQuery
};