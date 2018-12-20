import AbsQuery from './AbsQuery';
import { Query } from '../Query';

class MGQuery extends AbsQuery{

  private _db:string = 'foo';

  constructor(db:string, name: string){
    super(name);
    this._db = db;
  }

  protected getTableField(): string {
    return 'table';
  }

  protected getFunctionNames(): { [index: string]: string } {
    return {
      first: 'mongo.first',
      get: 'mongo.get',
      count: 'mongo.count',
      find: 'mongo.find',
      findAndCount: 'mongo.findAndCount',
    }
  }

  or(condition: { [index: string]: any; }): Query {
    throw new Error("Method not implemented.");
  }

}

export default MGQuery;
export {
  MGQuery
};