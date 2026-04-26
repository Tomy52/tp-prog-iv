import {inject, Injectable, signal} from '@angular/core';
import {Product} from '../interfaces/product';
import {ProductService} from './product-service';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {

  productService = inject(ProductService);
  cartItems = signal<Product[]>([]);

  constructor() {
    if (localStorage.getItem('shoppingCart') !== null) {
      this.getSessionCart();
    }


  }


  addToCart(productId: number) {
  console.log(productId);

    this.productService.getProductById(productId).subscribe({
      next: data => {
        this.cartItems.update( items => [...items, data]);
      }, error: error => {
        throw new error(error);
      }, complete: () => {
        this.setSessionCart()
      }
    })

  }

  //todo -> todavia estos metodos no estan funcionales 100 por ciento.
  setSessionCart() {
    const productsIds: number[] = [];

    for (const item of this.cartItems()) {
      productsIds.push(item.idProduct);
    }

    localStorage.setItem('shoppingCart', JSON.stringify(productsIds!));

  }

  getSessionCart() {
    const storedIds = localStorage.getItem('shoppingCart');

    if (storedIds !== null) {

      this.cartItems.update(data => [...data, JSON.parse(storedIds!)]);

    }

  }


}
