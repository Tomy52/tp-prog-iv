import {inject, Injectable, signal} from '@angular/core';
import {Product} from '../interfaces/product';
import {ProductService} from './product-service';
import {CartItem} from '../interfaces/cart-item';
import { EncryptionService } from './encryption-service';
import { CustomerProductInfo } from '../interfaces/product/customer-product-info';

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
    localStorage.setItem("cart", JSON.stringify(this.cartItems())) // delete when it works
    // this.encryption_service.setItem("cart",JSON.stringify(this.cartItems())) uncomment when it works
  }

  loadCartState()
  {
    // const cart_string = this.encryption_service.getItem("cart"); uncomment when it works
    const cart_string = localStorage.getItem("cart"); // delete when it works
    if(!cart_string) return

    const json = JSON.parse(cart_string)

    if(json.length == 0) return
    
    this.cartItems.set(json);
    this.checkCartValidity()
  }


  checkCartValidity()
  {
    const id_list = this.cartItems().map((x) => x.product.idProduct);
    console.log(this.cartItems())


     this.productService.checkItemsInCart(id_list).subscribe({
      next: (items) => {
        const new_cart: CartItem[] = []
        const response_array: CustomerProductInfo[] = items
        const deleted_products: CartItem[] = [];
        const non_ok_stock: CartItem[] = [];
        const modifiedProducts: CartItem[] = [];


        for(let i = this.cartItems().length - 1; i >= 0; i--)
        {
          const cart_item = this.cartItems()[i]
          const response_item = response_array.find((item) => item.idProduct === cart_item.product.idProduct);

          console.log(response_item)
          if(!response_item)
          {
            this.cartItems().splice(i,1);
            deleted_products.push(cart_item);
            continue
          }

          const is_stock_not_ok = this.checkStockAvailability(response_item, cart_item)
          const is_price_lower = this.checkIfPriceShouldBeLower(response_item, cart_item)

          if(is_stock_not_ok)
          {
            cart_item.quantity = cart_item.quantity - Math.abs(response_item.stock - cart_item.quantity)
            console.log(cart_item.quantity) 
            non_ok_stock.push(cart_item);
          }

          if(is_price_lower)
          {
            cart_item.product.price = response_item.price
            modifiedProducts.push(cart_item)
          }

          new_cart.push(cart_item);
        }
        

        console.log({
          current_cart: this.cartItems(),
          non_ok_stock: non_ok_stock,
          modifiedProducts: modifiedProducts
        })

        this.cartItems.set(new_cart)
      }
    })

  }


  private checkStockAvailability(response_product:CustomerProductInfo, cart_item:CartItem)
  {
    return (response_product.stock < cart_item.quantity)
  }

  private checkIfPriceShouldBeLower(response_product:CustomerProductInfo, cart_item:CartItem)
  {
    return (response_product.price < cart_item.product.price)
  }

}
