interface IArgument{
  getTableField(): string;

  getFunctionNames(): {[index:string]: string};

  extendArguments(): {[index:string]: any};

  assignArguments(input:{[index:string]: any}): void;
}
export default IArgument;
export { IArgument };