import { BasicProductInfo } from "./basic-product-info"

export interface OrderItem {
    productInfo: BasicProductInfo
    priceAtOrder: number,
    quantity: number
}