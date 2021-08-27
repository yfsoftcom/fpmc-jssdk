import DataResult from './util/DataResult';

interface Query{

  // sort by fields
  sort(by: string): Query;

  page(page: number, limit ?: number): Query;

  condition( condition: {[index:string]: any} ): Query;

  select( fields: string ): Query;

  and( condition: {[index:string]: any} ): Query;

  eqJoin( joinKey: string, joinTable: string, indexKey: string ): Query;

  count(): Promise<number>;

  first(): Promise<DataResult>;

  find(): Promise<[]>;

  findAndCount(): Promise<{[index:string]: any}>;
}

export default Query;

export { Query };