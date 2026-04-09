import { Category } from "./category"
import { ProductStatus } from "./productStatus"


export interface Product {
  idProduct: number
  name: string
  status: ProductStatus
  stock: Number
  profitMargin: Number
  category: Partial<Category> | null
}
