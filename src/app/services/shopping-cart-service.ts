import {inject, Injectable, signal} from '@angular/core';
import {Product} from '../interfaces/product';
import {ProductService} from './product-service';
import {CartItem} from '../interfaces/cart-item';
import { EncryptionService } from './encryption-service';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {

  productService = inject(ProductService);
  encryption_service = inject(EncryptionService);
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

        this.saveCartState()
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
    this.saveCartState()
  }

  getQuantity(productId: number):number {
    const item = this.cartItems().find(i => i.product.idProduct === productId);
    return item ? item.quantity : 0;
  }

  saveCartState()
  {
    this.encryption_service.setItem("cart",JSON.stringify(this.cartItems()))
  }

  loadCartState()
  {
    const cart_string = this.encryption_service.getItem("cart");

    if(!cart_string) return
    
    this.cartItems.set(JSON.parse(cart_string));
  }

}
