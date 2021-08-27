/**
 * the abstract class for interface query
 */
import Query from '../Query';
import DataResult from '../util/DataResult';
import { send } from '../../util/kit';
import Constant from '../../Constant';
import Exception from '../util/Exception';
import ObjectId from '../util/ObjectId';
import { IArgument } from '../IArgument';

abstract class AbsQuery implements Query{

  protected name: string;

  _argument: IArgument;

  private _sorter: string;

  protected _groupBy: string;

  private _limit: number = 100;

  private _skip: number = 0;

  private _condition:  { [index: string]: any; } = { };

  protected _fields: string = '*';

  // the mongodb might be 'collection'
  protected _fieldOfTable: string = 'table';

  protected _functionNames: {[index:string]: string};

  protected _send = send;

  constructor(name: string){
    this.name = name;
    this._argument = this.getArgument();
    this._fieldOfTable = this._argument.getTableField();
    this._functionNames = this._argument.getFunctionNames();
  }

  abstract getArgument(): IArgument;
  eqJoin( joinKey: string, joinTable: string, indexKey: string ): Query {
    return this;
  }

  sort(by: string): Query {
    this._sorter = by;
    return this;
  }

  page(page: number, limit ?: number ): Query {
    if( page < 1 )
      throw new Exception({ message: `page should > 0 !`});
    if( limit > 100 )
      throw new Exception( { message: `limit should <= 100 !` });
    this._limit = limit || 100;
    this._skip = ( page - 1 ) * this._limit;
    return this;
  }

  condition(condition: { [index: string]: any; }): Query {
    this._condition = condition;
    return this;
  }

  and(condition: { [index: string]: any; }): Query {
    this._condition = { ...this._condition, ...condition };
    return this;
  }

  select(fields: string): Query {
    this._fields = fields;
    // select all fields
    if(this._fields == '*')
      return this;
    // part of the fields;
    const fieldsArr = fields.split(',')
    if(fieldsArr.indexOf('updateAt') < 0){
      fieldsArr.push('updateAt');
    }
    if(fieldsArr.indexOf('createAt') < 0){
      fieldsArr.push('createAt');
    }
    if(fieldsArr.indexOf('id') < 0){
      fieldsArr.push('id');
    }
    this._fields = fieldsArr.join(',');
    return this;
  }

  async count(): Promise<number> {
    try {
      const input:{[index:string]: any} = {
        condition: this._condition
      };
      input[this._fieldOfTable] = this.name;
      this._argument.assignArguments(input);
      const count = await send( this._functionNames.count, input, Constant.getOptions());
      return Promise.resolve(count);
    } catch (error) {
      throw error;
    }
  }
  async first(): Promise<DataResult> {
    try {
      const input:{[index:string]: any} = {
        condition: this._condition,
        fields: this._fields,
        sort: this._sorter,
      };
      input[this._fieldOfTable] = this.name;
      this._argument.assignArguments(input);
      const data = await send( this._functionNames.first, input, Constant.getOptions());
      if(data == undefined){
        // nothing found
        throw new Exception({ errno: -3, message: 'nothing found!' })
      }
      const id = data.id || data.objectId || data._id || data.insertId;
      if(id == undefined){
        // nothing found
        throw new Exception({ errno: -3, message: 'nothing found!' })
      }
      return Promise.resolve(new DataResult(ObjectId.from(id), data));
    } catch (error) {
      throw error;
    }
  }
  async find(): Promise<[]>{
    try {
      const input:{[index:string]: any} = {
        condition: this._condition,
        fields: this._fields,
        sort: this._sorter,
        limit: this._limit,
        skip: this._skip,
      };
      input[this._fieldOfTable] = this.name;
      if(!!this._groupBy){
        input['groupBy'] = this._groupBy;
      }
      this._argument.assignArguments(input);
      const rows = await send( this._functionNames.find, input, Constant.getOptions());
      return Promise.resolve(rows);
    } catch (error) {
      throw error;
    }
  }

  async findAndCount(): Promise<{ [index: string]: any; }> {
    try {
      const input:{[index:string]: any} = {
        condition: this._condition,
        fields: this._fields,
        sort: this._sorter,
        limit: this._limit,
        skip: this._skip,
      };
      input[this._fieldOfTable] = this.name;
      this._argument.assignArguments(input);
      const data = await send( this._functionNames.findAndCount, input, Constant.getOptions());
      return Promise.resolve(data);
    } catch (error) {
      throw error;
    }
  }

  async query(query: string): Promise<[]>{
    try {
      const input:{[index:string]: any} = {
        query,
      };
      const rows = await send( this._functionNames.query, input, Constant.getOptions());
      return Promise.resolve(rows);
    } catch (error) {
      throw error;
    }
  }

}

export default AbsQuery;

export { AbsQuery };