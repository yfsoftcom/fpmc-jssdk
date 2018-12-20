import AbsEntity from './AbsEntity';
import IArgument from '../IArgument';
import DBArgument from './DBArgument';


class DBObject extends AbsEntity {
  getArgument(): IArgument {
    return new DBArgument();
  }
}

export default DBObject;
export {
  DBObject
};