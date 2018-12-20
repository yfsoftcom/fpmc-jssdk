/**
 * the condition 
 */
import Exception from './Exception';

class Condition{

  private _condition: any;

  private _type: string = 'json';

  constructor(condition: any, type?: string | 'json'){
    this._condition = condition;
    if(type != 'json' && type != 'string')
      throw new Exception({ message: 'the condition type can be only json or string!' });
    this._type = type;
  }

  static from( condition: any ): Condition{
    if( typeof(condition) == 'string' )
      return new Condition(condition, 'string')
    return new Condition(condition, 'json');
  }

  static fromJson( condition: {[index:string]: any} ): Condition{
    return new Condition(condition);
  }

  static fromString( condition: string ): Condition{
    return new Condition(condition, 'string');
  }

  format(): any{
    if(this._condition == undefined)
      return {};
    return this._condition;
  }

  toString(): string{
    if(this._type == 'string')
      return this._condition;
    throw new Exception({ message: 'the condition type is json, should call the toJson() to get the condition' });
  }

  toJson(): {[index:string]: any}{
    if(this._type == 'json')
      return this._condition;
    throw new Exception({ message: 'the condition type is string, should call the toString() to get the condition' });
  }
}

export default Condition;
export { Condition };
