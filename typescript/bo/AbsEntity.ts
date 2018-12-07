/**
 * the abscract entity implement entity
 */
import ObjectId from './ObjectId';
import Condition from './Condition';
import Entity from './Entity';
import { send } from '../util/kit';
import Constant from '../Constant';

abstract class AbsEntity implements Entity{

  readonly name: string;
  objectId: ObjectId;

  // the mongodb might be 'collection'
  protected _fieldOfTable: string = 'table';

  protected _functionOfCreate: string = 'common.create';

  protected _functionOfRemove: string = 'common.remove';

  protected _functionOfSave: string = 'common.update';

  protected _functionOfGet: string = 'common.get';

  private _data: any = Object.create({});

  constructor( name: string, data ?: any | {} ){
    this.name = name;
    if( data != undefined ){
      this._data = data;
      this.objectId = ObjectId.from( data.id || data.objectId );
    }    
  }

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

  // create => entity with the objectId
  async create( data ?: Object | {}): Promise<Entity>{
    if(!ObjectId.isNull(this.objectId)){
      throw new Error('create error too many objectid')
    }
    
    const _now = new Date().getTime();
    this._data = (<any>Object).assign(this._data, data, {
      createAt: _now,
      updateAt: _now,
    });
    const self = this;
    try {
      const input = (<any>Object).create({});
      input.row = this._data;
      input[this._fieldOfTable] = this.name;
      const rsp = await send( this._functionOfCreate, input, Constant.getOptions());
      const id = rsp.insertId || rsp.id;
      if(id == undefined)
        throw new Error('create Error: no inserted Id return ');
      self.set('id', id);
      self.objectId = ObjectId.from( id );
      return Promise.resolve(self);
    } catch (error) {
      throw error;
    }
  }

  // save => entity with the new values
  save( data ?: Object): Promise<Entity>{
    return;
  }

  // get by condition
  getByCondition( condition: Condition ): Promise<Entity>{
    return;
  }

  // get by id
  getById( objectId : ObjectId): Promise<Entity>{
    return;
  }

  // remove => return ture/false
  remove( objectId ?: ObjectId ): Promise<boolean>{
    return;
  }

  // toString(json/object)
  toString(formater ?: string | 'json'): string{
    return;
  }
}

export default AbsEntity;
export { AbsEntity };