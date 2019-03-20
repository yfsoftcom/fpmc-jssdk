import IArgument from '../IArgument';
import AbsEntity from './AbsEntity';
import MGArgument from './MGArgument';

class MGObject extends AbsEntity {

  // _db: string;
  _argument: MGArgument;

  constructor( db: string, name: string, data ?: {[index:string]: any} ){
    super(name, data);
    this._argument._db = db;
  }

  getArgument(): IArgument {
    this._argument = new MGArgument();
    return this._argument;
  }

}

export default MGObject;
export {
  MGObject
};