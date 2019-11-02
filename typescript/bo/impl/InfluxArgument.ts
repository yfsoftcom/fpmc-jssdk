import IArgument from '../IArgument';

class InfluxArgument implements IArgument{

  extendArguments(): { [index: string]: any; } {
    return {};
  }

  getTableField(): string {
    return 'measurement';
  }

  getFunctionNames(): { [index: string]: string } {
    return {
      create: 'influx.create',
      first: 'influx.first',
      get: 'influx.get',
      update: 'influx.update',
      save: 'influx.update',
      remove: 'influx.remove',
      clear: 'influx.clear',
      batch: 'influx.create',
      count: 'influx.count',
      find: 'influx.find',
      findAndCount: 'influx.?',
      query: 'influx.query',
    }
  }
  
  assignArguments(input: { [index: string]: any; }): void {
    // do nothing.
  }


}

export default InfluxArgument;
export { InfluxArgument };