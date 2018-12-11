class Exception extends Error{
  private _error: {[index:string]: any} = {};
  readonly message: string;
  readonly errno: number;
  constructor( error: {[index:string]: any}){
    super();
    const { errno, message } = error;
    this._error = error;
    this.errno = errno || -999;
    this.message = message || 'Undefined Exception Message';
  }

  toString(): string{
    return JSON.stringify(this._error);
  }

  print(): void{
    if(console.log){
      console.log(`Exception=> errno: ${ this.errno }, message: ${ this.message }`);
    }
  }
}
export default Exception;
export { Exception };