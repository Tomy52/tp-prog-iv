import {Supplier} from '../supplier/supplier';

export interface SuppliersPageResponse {
  content: Supplier[],
  totalElements:number,
  totalPages:number,
  first:boolean,
  last:boolean
}
