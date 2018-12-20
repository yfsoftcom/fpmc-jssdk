import AbsQuery from './AbsQuery';
import { Query } from '../Query';
import { IArgument } from '../IArgument';
import DBArgument from './DBArgument';

class DBQuery extends AbsQuery{
  getArgument(): IArgument {
    return new DBArgument();
  }

  or(condition: { [index: string]: any; }): Query {
    throw new Error("Method not implemented.");
  }

}

export default DBQuery;
export {
  DBQuery
};