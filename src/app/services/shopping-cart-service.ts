import {inject, Injectable, signal} from '@angular/core';
import {Product} from '../interfaces/product';
import {ProductService} from './product-service';
import {CartItem} from '../interfaces/cart-item';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {

  productService = inject(ProductService);
  cartItems = signal<CartItem[]>([]);

  constructor() {
    this.loadCartState()
  }

  addToCart(productId: number) {
    this.productService.getProductByIdCustomer(productId).subscribe({
      next: (product) => {
        this.cartItems.update((items) => {
          const existingItem = items.find(i => i.product.idProduct === productId);

          if (existingItem) {
            return items.map(i =>
              i.product.idProduct === productId
                ? { ...i, quantity: i.quantity + 1 }
                : i
            );
          }
          return [...items, { product, quantity: 1 }];
        });
      },
      error: (err) => console.error(err)
    });
  }

  removeFromCart(productId: number) {
    this.cartItems.update((items) => {
      const existingItem = items.find(i => i.product.idProduct === productId);

      if (!existingItem) return items;

      if (existingItem.quantity > 1) {
        return items.map(item =>
          item.product.idProduct === productId
            ? {...item, quantity: item.quantity - 1}
            : item
        );
      } else {
        return items.filter(item => item.product.idProduct !== productId);
      }
    });
  }

  getQuantity(productId: number):number {
    const item = this.cartItems().find(i => i.product.idProduct === productId);
    return item ? item.quantity : 0;
  }

  saveCartState()
  {
    localStorage.setItem("cart",JSON.stringify(this.cartItems()))
  }

  loadCartState()
  {
    const cart_string = localStorage.getItem("cart")
    console.log(cart_string)
  }

}
