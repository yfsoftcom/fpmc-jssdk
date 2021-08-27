import AbsQuery from './AbsQuery';
import { Query } from '../Query';
import { IArgument } from '../IArgument';
import DBArgument from './DBArgument';

class DBQuery extends AbsQuery{
  getArgument(): IArgument {
    return new DBArgument();
  }
}

export default DBQuery;
export {
  DBQuery
};