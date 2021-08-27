import AbsQuery from './AbsQuery';
import { Query } from '../Query';
import { IArgument } from '../IArgument';
import MGArgument from './MGArgument';

class MGQuery extends AbsQuery{

  _argument: MGArgument;

  getArgument(): IArgument {
    this._argument = new MGArgument();
    return this._argument;
  }

  constructor(db:string, name: string){
    super(name);
    this._argument._db = db;
  }
}

export default MGQuery;
export {
  MGQuery
};