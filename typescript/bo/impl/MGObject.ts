import IArgument from '../IArgument';
import AbsEntity from './AbsEntity';
import MGArgument from './MGArgument';

class MGObject extends AbsEntity {

  _db: string;

  constructor( db: string, name: string, data ?: {[index:string]: any} ){
    super(name, data);
    this._db = db;
  }

  getArgument(): IArgument {
    const argument = new MGArgument();
    argument._db = this._db;
    return argument;
  }

}

export default MGObject;
export {
  MGObject
};