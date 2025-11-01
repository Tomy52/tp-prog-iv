import {ProductStatus} from './productStatus';

export interface Product {
  idProduct: number
  name: string
  status: ProductStatus;
}
