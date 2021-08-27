import AbsQuery from './AbsQuery';
import { Query } from '../Query';
import { IArgument } from '../IArgument';
import DBArgument from './DBArgument';

class DBQuery extends AbsQuery{
  getArgument(): IArgument {
    return new DBArgument();
  }

  eqJoin( joinKey: string, joinTable: string, indexKey: string ): Query {
    return this;
  }
}

export default DBQuery;
export {
  DBQuery
};