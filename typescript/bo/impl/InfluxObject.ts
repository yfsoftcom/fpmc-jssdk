import AbsEntity from './AbsEntity';
import IArgument from '../IArgument';
import InfluxArgument from './InfluxArgument';


class InfluxObject extends AbsEntity {
  getArgument(): IArgument {
    return new InfluxArgument();
  }
}

export default InfluxObject;
export {
  InfluxObject
};