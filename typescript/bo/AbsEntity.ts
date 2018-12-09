/**
 * the abscract entity implement entity
 */
import ObjectId from './ObjectId';
import Condition from './Condition';
import Entity, { DataResult } from './Entity';
import { send } from '../util/kit';
import Constant from '../Constant';
import Exception from './Exception';

abstract class AbsEntity implements Entity{

  readonly name: string;
  objectId: ObjectId;

  // the mongodb might be 'collection'
  protected _fieldOfTable: string = 'table';

  protected _functionNames: {[index:string]: string};

  private _data :{[index:string]: any} = {};

  private _fields : string = '*';

  constructor( name: string, data ?: {[index:string]: any} ){
    this.name = name;

    this._fieldOfTable = this.getTableField();
    this._functionNames = this.getFunctionNames();
    
    if( data != undefined ){
      this._data = data;
      this.objectId = ObjectId.from( data.id || data.objectId );
    }
  }

  protected abstract getTableField(): string;

  protected abstract getFunctionNames(): {[index:string]: string};

  set( kv: any, val ?: any ): Entity{
    if( typeof(kv) == 'object')
      this._data = (<any>Object).assign(this._data, kv);
    else
      this._data[kv] = val;
    return this;
  }

  get( key?: string ): any{
    if(key)
      return this._data[key];
    return this._data;
  }

  fields(fields: string): Entity{
    this._fields = fields;
    return this;
  }

  async batch( datas: Array<{[index:string]: any}>): Promise<number>{
    const _now = new Date().getTime();
    if( datas == undefined )
      throw new Exception({ message: 'datas should not be undefined' });
    const len = datas.length;
    if( len < 1 )
      throw new Exception({ message: ' datas length should more than 0' });
    for( let d of datas ){
      d.createAt = d.updateAt = _now;
    }
    try {
      const input:{[index:string]: any} = {
        row: datas,
      };
      input[this._fieldOfTable] = this.name;
      const rsp = await send( this._functionNames.create, input, Constant.getOptions());
      const { affectedRows, changedRows, n } = rsp;
      const rowsNumber = ( affectedRows || changedRows || n );
      if( len != rowsNumber )
        throw new Exception({ message: `Batch create error: the affectedRows ${ rowsNumber } not equal the datas.length ${ len }`});
      return Promise.resolve(len);
    } catch (error) {
      throw error;
    }
  }

  // create => entity with the objectId
  async create( data ?: {[index:string]: any} ): Promise<DataResult>{
    if(!ObjectId.isNull(this.objectId)){
      throw new Exception({ message: 'create error too many objectid' });
    }

    const _now = new Date().getTime();
    this._data = (<any>Object).assign(this._data, data, {
      createAt: _now,
      updateAt: _now,
    });
    try {
      const input:{[index:string]: any} = {
        row: this._data,
      };
      input[this._fieldOfTable] = this.name;
      const rsp = await send( this._functionNames.create, input, Constant.getOptions());
      const id = rsp.insertId || rsp.id || rsp.ObjectId;
      if(id == undefined)
        throw new Exception({ message: 'create Error: no inserted Id return ' });
      this.set('id', id);
      this.objectId = ObjectId.from( id );
      return Promise.resolve(new DataResult(this.objectId, this._data));
    } catch (error) {
      throw error;
    }
  }

  // save => entity with the new values
  async save( data ?: {[index:string]: any}): Promise<DataResult>{
    if(ObjectId.isNull(this.objectId))
      throw new Exception({ message: 'save error no objectid' });

    const row: {[index:string]: any} = data? data: this._data;

    row.updateAt = row.updateAt = new Date().getTime();
    // remove id
    delete row.id;
    try {
      const input:{[index:string]: any} = {
        row,
        condition: { id: this.objectId.stringValue() }
      };
      input[this._fieldOfTable] = this.name;
      // wait to update, and need not feedback data if no error
      await send( this._functionNames.update, input, Constant.getOptions());
      this._data = (<any>Object).assign(this._data, row);

      return Promise.resolve(new DataResult(this.objectId, this._data));
    } catch (error) {
      throw error;
    }

  }

  // get by condition
  async getByCondition( condition: any ): Promise<DataResult>{
    try {
      const input:{[index:string]: any} = {
        condition: Condition.from(condition).format(),
        fields: this._fields,
      };
      input[this._fieldOfTable] = this.name;
      const data = await send( this._functionNames.first, input, Constant.getOptions());
      this.set(data);
      const id = data.id || data.objectId || data.insertId;
      this.objectId = ObjectId.from(id);
      return Promise.resolve(new DataResult(this.objectId, this._data));
    } catch (error) {
      throw error;
    }
  }

  // get by id
  async getById( objectId : any): Promise<DataResult>{
    this.objectId = ObjectId.from(objectId);
    if(ObjectId.isNull(this.objectId))
      throw new Exception({ message: 'getById error no objectid' });
    try {
      const input:{[index:string]: any} = {
        id: this.objectId.stringValue(),
        fields: this._fields,
      };
      input[this._fieldOfTable] = this.name;
      const data = await send( this._functionNames.get, input, Constant.getOptions());
      this.set(data);
      return Promise.resolve(new DataResult(this.objectId, this._data));
    } catch (error) {
      throw error;
    }
  }

  // remove => return ture/false
  async remove( objectId ?: any ): Promise<boolean>{
    this.objectId = ObjectId.from(objectId) || this.objectId;
    if(ObjectId.isNull(this.objectId))
      throw new Exception({ message: 'remove error no objectid' });
    try {
      const input:{[index:string]: any} = {
        id: this.objectId.stringValue(),
      };
      input[this._fieldOfTable] = this.name;
      // wait to remove, and need not feedback data if no error
      const rsp = await send( this._functionNames.remove, input, Constant.getOptions());
      const { affectedRows, changedRows, n } = rsp;
      if(affectedRows == 1 || changedRows == 1 || n == 1)
        return Promise.resolve(true);
      throw new Exception({ message: 'nothing changed' });
    } catch (error) {
      throw error;
    }
  }

    // remove rows by the condition;
  async clear( condition: any ): Promise<number>{
    try {
      const input:{[index:string]: any} = {
        condition: Condition.from(condition).format(),
        fields: this._fields,
      };
      input[this._fieldOfTable] = this.name;
      const rsp = await send( this._functionNames.clear, input, Constant.getOptions());
      const { affectedRows, changedRows, n } = rsp;
      const rowsNumber = ( affectedRows || changedRows || n );
      return Promise.resolve(rowsNumber);
    } catch (error) {
      throw error;
    }
  }

  // toString(json/object)
  toString(formater ?: string | 'json'): string{
    if(this._data)
      return JSON.stringify(this._data);
    return;
  }
}

export default AbsEntity;
export { AbsEntity };