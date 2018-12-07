/**
 * the condition 
 */

class Condition{

  private _condition: any;

  private _type: string = 'json';

  constructor(condition: any, type?: string | 'json'){
    this._condition = condition;
    if(type != 'json' && type != 'string')
      throw Error('the condition type can be only json or string!');
    this._type = type;
  }

  static fromJson( condition: object ){
    return new Condition(condition);
  }

  static fromString( condition: object ){
    return new Condition(condition, 'string');
  }

  toString(): string{
    if(this._type == 'string')
      return this._condition;
    throw Error('the condition type is json, should call the toJson() to get the condition');
  }

  toJson(): object{
    if(this._type == 'json')
      return this._condition;
    throw Error('the condition type is string, should call the toString() to get the condition');
  }
}

export default Condition;
export { Condition };
