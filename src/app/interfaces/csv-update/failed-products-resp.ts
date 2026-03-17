import { FailedProduct } from "./failed-product-resp"

export interface FailedProductsResp {
    message: String
    nonAffectedProducts: [FailedProduct]
}