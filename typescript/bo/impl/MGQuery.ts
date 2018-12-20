import AbsQuery from './AbsQuery';
import { Query } from '../Query';
import { IArgument } from '../IArgument';
import MGArgument from './MGArgument';

class MGQuery extends AbsQuery{

  getArgument(): IArgument {
    const argument = new MGArgument();
    argument._db = this._db;
    return argument;
  }

  private _db:string = 'foo';

  constructor(db:string, name: string){
    super(name);
    this._db = db;
  }

  or(condition: { [index: string]: any; }): Query {
    throw new Error("Method not implemented.");
  }

}

export default MGQuery;
export {
  MGQuery
};