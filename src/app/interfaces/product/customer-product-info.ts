import { Category } from "../category";

export interface CustomerProductInfo {
    idProduct: number,
    name: string,
    description: string,
    price: number,
    stock: number,
    category: Partial<Category> | null
}
