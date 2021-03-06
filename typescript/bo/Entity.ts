/**
 * The interface of Object/Document which contains `Create(), Save(), Remove()` and so on.
 */
import ObjectId from './util/ObjectId';
import DataResult from './util/DataResult';
import IArgument from './IArgument';

interface Entity {
  // the entity name, it should be set when contstract
  readonly name: string;

  // the id.
  objectId?: ObjectId;

  set( kv: any, val ?: any ): Entity;

  get( key?: string ): any;

  fields(fields: string): Entity;

  getArgument(): IArgument;

  // create => entity with the objectId
  create( data ?: {[index:string]: any}): Promise<DataResult>;

  // batch => the rows number of inserted successfully ;
  batch( datas: Array<{[index:string]: any}>): Promise<number>;

  // save => entity with the new values
  save( data ?: {[index:string]: any}): Promise<DataResult>;

  // get by condition
  getByCondition( condition: any ): Promise<DataResult>;

  // get by id
  getById( objectId : any): Promise<DataResult>;

  // remove => return ture/false
  remove( objectId ?: any ): Promise<boolean>;

  // remove rows by the condition;
  clear( condition: any ): Promise<number>;

  // toString(json/object)
  toString(formater ?: string | 'json'): string;

}

export default Entity;
export { Entity, DataResult };