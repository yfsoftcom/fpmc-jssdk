/**
 * the absctract class for interface query
 */
import Query from './Query';
import DataResult from './DataResult';
import { send } from '../util/kit';
import Constant from '../Constant';
import Exception from './Exception';
import ObjectId from './ObjectId';
import Condition from './Condition';

abstract class AbsQuery implements Query{

  private name: string;

  private _sorter: string;

  private _limit: number = 100;

  private _skip: number = 0;

  private _condtion:  { [index: string]: any; } = { };

  private _fields: string = '*';

  // the mongodb might be 'collection'
  protected _fieldOfTable: string = 'table';

  protected _functionNames: {[index:string]: string};

  constructor(name: string){
    this.name = name;
    this._fieldOfTable = this.getTableField();
    this._functionNames = this.getFunctionNames();
  }

  protected abstract getTableField(): string;

  protected abstract getFunctionNames(): {[index:string]: string};

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
    this._condtion = condition;
    return this;
  }

  and(condition: { [index: string]: any; }): Query {
    this._condtion = (<any>Object).assign(this._condtion, condition);
    return this;
  }

  abstract or(condition: { [index: string]: any; }): Query;

  select(fields: string): Query {
    this._fields = fields;
    return this;
  }

  async count(): Promise<number> {
    try {
      const input:{[index:string]: any} = {
        condition: this._condtion
      };
      input[this._fieldOfTable] = this.name;
      const { count } = await send( this._functionNames.count, input, Constant.getOptions());
      return Promise.resolve(count);
    } catch (error) {
      throw error;
    }
  }
  async first(): Promise<DataResult> {
    try {
      const input:{[index:string]: any} = {
        condition: this._condtion,
        fields: this._fields,
      };
      input[this._fieldOfTable] = this.name;
      const data = await send( this._functionNames.first, input, Constant.getOptions());
      const id = data.id || data.objectId || data.insertId;
      return Promise.resolve(new DataResult(ObjectId.from(id), data));
    } catch (error) {
      throw error;
    }
  }
  find(): Promise<[]>{
    return;
  }

  findAndCount(): Promise<{ [index: string]: any; }> {
    throw new Error("Method not implemented.");
  }



}

export default AbsQuery;

export { AbsQuery };