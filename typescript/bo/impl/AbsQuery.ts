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

  // join fields
  protected _join: { [index: string]: string; } = { };

  protected _hasJoin: boolean = false;

  constructor(name: string){
    this.name = name;
    this._argument = this.getArgument();
    this._fieldOfTable = this._argument.getTableField();
    this._functionNames = this._argument.getFunctionNames();
  }

  abstract getArgument(): IArgument;

  eqJoin( joinKey: string, joinTable: string, indexKey: string, fields: string ): Query {
    this._join.key = joinKey;
    this._join.table = joinTable;
    this._join.index = indexKey;
    this._join.fields = fields;
    this._hasJoin = true;
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

  formatTable(): string {
    if (!this._hasJoin)
      return this.name;
    return `${this.name}, (select ${this._join.fields} from ${this._join.table} where delflag = 0) as r`;
  }

  formatCondition(): any {
    if (!this._hasJoin)
      return this._condition;
    if (typeof(this._condition) === 'string') {
      return this._condition + ' and ' + `${this.name}.${this._join.key} = r.${this._join.index}`;
    } else {
      return {
        ...this._condition,
        [this.name + '.' + this._join.key]: 'r.' + this._join.index,
      };
    }
  }

  select(fields: string): Query {
    this._fields = fields;
    // select all fields
    if(this._fields == '*') {
      if (this._hasJoin){
        this._fields = this.name + '.*';
      }
      return this;
    }
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
    if (this._hasJoin) {
      this._join.fields.split(',').forEach((x: string) => fieldsArr.push('r.' + x));
    }
    this._fields = fieldsArr.join(',');
    return this;
  }

  async count(): Promise<number> {
    try {
      const input:{[index:string]: any} = {
        condition: this.formatCondition(),
      };
      input[this._fieldOfTable] = this.formatTable();
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
        condition: this.formatCondition(),
        fields: this._fields,
        sort: this._sorter,
      };
      input[this._fieldOfTable] = this.formatTable();
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
        condition: this.formatCondition(),
        fields: this._fields,
        sort: this._sorter,
        limit: this._limit,
        skip: this._skip,
      };
      input[this._fieldOfTable] = this.formatTable();
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
        condition: this.formatCondition(),
        fields: this._fields,
        sort: this._sorter,
        limit: this._limit,
        skip: this._skip,
      };
      input[this._fieldOfTable] = this.formatTable();
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