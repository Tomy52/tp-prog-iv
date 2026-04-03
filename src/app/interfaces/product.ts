import {ProductStatus} from './productStatus';

export interface Product {
  idProduct: number
  name: string
  status: ProductStatus
  stock: Number
  category: number | null
}
