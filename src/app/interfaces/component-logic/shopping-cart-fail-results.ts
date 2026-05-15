import { CartItem } from "../cart-item";

export interface ShoppingCartFailResults {
    removed_products?: CartItem[];
    bad_stock?: CartItem[];
    modified_product?: CartItem[];
}
