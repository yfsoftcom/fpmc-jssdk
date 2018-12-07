/**
 * The interface of Object/Document which contains `Create(), Save(), Remove()` and so on.
 */
import ObjectId from './ObjectId';
import Condition from './Condition';

interface Entity {
  // the entity name, it should be set when contstract
  readonly name: string;

  // the id.
  objectId?: ObjectId;

  set( kv: any, val ?: any ): Entity;

  get( key?: string ): any;

  // create => entity with the objectId
  create( data ?: Object): Promise<Entity>;

  // save => entity with the new values
  save( data ?: Object): Promise<Entity>;

  // get by condition
  getByCondition( condition: Condition ): Promise<Entity>;

  // get by id
  getById( objectId : ObjectId): Promise<Entity>;

  // remove => return ture/false
  remove( objectId ?: ObjectId ): Promise<boolean>;

  // toString(json/object)
  toString(formater ?: string | 'json'): string;

}

export default Entity;
export { Entity };