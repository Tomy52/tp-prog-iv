export interface PageResponse<T> {
  content: T[],
  number:number,
  totalElements:number,
  totalPages:number,
  first:boolean,
  last:boolean
}
