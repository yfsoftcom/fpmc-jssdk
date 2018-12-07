/**
 * the ObjectId type
 */

class ObjectId {
  private _id: string;

  constructor(id: string){
    this._id = id;
  }

  static from( valueOfId: any){
    if( valueOfId === undefined ){
      return new ObjectId('void');
    }
    return new ObjectId(`${valueOfId}`);
  }

  static isNull( id: ObjectId): boolean{
    if( undefined === id )
      return true;
    if( id._id == undefined )
      return true;
    return false;
  }

  numberValue(): number{
    return parseInt(this._id);
  }

  stringValue(): string{
    return this._id;
  }

  toString(): string{
    if( undefined == this._id )
      return undefined;
    return `${this._id}`;
  }
}

export default ObjectId;
export { ObjectId };