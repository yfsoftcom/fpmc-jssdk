import AbsQuery from './AbsQuery';

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
    }
  }

  or(condition: { [index: string]: any; }): import("/Users/yfsoft/Product/yf-fpm-client-nodejs/typescript/bo/Query").Query {
    throw new Error("Method not implemented.");
  }

}

export default DBQuery;
export {
  DBQuery
};