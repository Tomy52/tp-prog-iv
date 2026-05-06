import {inject, Injectable, signal} from '@angular/core';
import {ProductService} from './product-service';
import {CartItem} from '../interfaces/cart-item';
import { EncryptionService } from './encryption-service';
import { CustomerProductInfo } from '../interfaces/product/customer-product-info';
import { ShoppingCartFailResults } from '../interfaces/component-logic/shopping-cart-fail-results';
import { ModalService } from './modal-service';
import { FailedCartResults } from '../components/reusable/failed-cart-results/failed-cart-results';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {

  productService = inject(ProductService);
  encryption_service = inject(EncryptionService);
  modal_service = inject(ModalService)
  cartItems = signal<CartItem[]>([]);

  // product changed (this sucks, this would send 2n updates to cards just to check make a search to an array into the service)
  // however this is much better in terms of tidiness
  checkIfIChanged = new Subject<any>();

  constructor() {
    this.loadCartState()
  }

  addToCart(productId: number) {
    this.productService.getProductByIdCustomer(productId).subscribe({
      next: (product) => {
        this.cartItems.update((items) => {
          const existingItem = items.find(i => i.product.idProduct === productId);

          if(!this.checkIfRequestedProductStockIsOK(this.getQuantity(productId) + 1,product.stock))
          {
            console.log("this is very wrong")
          }

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

    const json = JSON.parse(cart_string)

    if(json.length == 0) return

    this.cartItems.set(json);
    this.checkCartValidity()
  }


  checkCartValidity()
  {
    const id_list = this.cartItems().map((x) => x.product.idProduct);

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
            non_ok_stock.push(cart_item);
          }

          if(is_price_lower)
          {
            cart_item.product.price = response_item.price
            modifiedProducts.push(cart_item)
          }

          new_cart.push(cart_item);
        }
        this.cartItems.set(new_cart)

        const new_notification: ShoppingCartFailResults = {
          removed_products: deleted_products,
          bad_stock: non_ok_stock,
          modified_product: modifiedProducts
        }
        this.checkIfIChanged.next(undefined)
        this.handleShowingNotification(new_notification)
      }
    })

  }


  private checkStockAvailability(response_product:CustomerProductInfo, cart_item:CartItem)
  {
    return (response_product.stock < cart_item.quantity)
  }

  private checkIfPriceShouldBeLower(response_product:CustomerProductInfo, cart_item:CartItem)
  {
    return (response_product.price != cart_item.product.price)
  }

  private handleShowingNotification(data:ShoppingCartFailResults)
  {
    if(data.bad_stock?.length || data.modified_product?.length || data.removed_products?.length)
    {
      const label = this.modal_service.showCartErrorModal(FailedCartResults,{
        title: "Aviso!",
        description: "Las siguientes cosas sucedieron:"
      },data,false)

      label.subscribe((result) => {
        if(result == "Remover")
        {
          const remove_ids = data.bad_stock?.map((cart_item) => cart_item.product.idProduct)

          this.cartItems.set(this.cartItems().filter((cart_item) => !remove_ids?.includes(cart_item.product.idProduct)))
          this.checkIfIChanged.next(undefined)
          this.saveCartState()
        }
      })
    }
  }


  calculateTotalPrice()
  {
    return this.cartItems().reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  }

  checkIfRequestedProductStockIsOK(request:number, recieved:number)
  {
    return recieved >= request
  }
}
