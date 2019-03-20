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

  or(condition: { [index: string]: any; }): Query {
    throw new Error("Method not implemented.");
  }

}

export default MGQuery;
export {
  MGQuery
};