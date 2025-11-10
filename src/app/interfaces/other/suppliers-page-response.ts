import {Supplier} from '../supplier/supplier';

export interface SuppliersPageResponse {
  content: Supplier[],
  number:number,
  totalElements:number,
  totalPages:number,
  first:boolean,
  last:boolean
}
