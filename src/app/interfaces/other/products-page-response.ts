import {Product} from '../product';

export interface ProductsPageResponse {
  content: Product[],
  number:number,
  totalElements:number,
  totalPages:number,
  first:boolean,
  last:boolean
}
