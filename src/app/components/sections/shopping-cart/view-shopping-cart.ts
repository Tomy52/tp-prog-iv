import {ChangeDetectionStrategy, Component, computed, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {ShoppingCartService} from '../../../services/shopping-cart-service';
import { CustomerProductListCard } from "../customer/customer-product-list-card/customer-product-list-card";
import { CustomerProductList } from "../customer/customer-product-list/customer-product-list";

@Component({
  selector: 'app-shopping-cart',
  imports: [
    RouterLink,
    CustomerProductListCard,
    CustomerProductList
],
  templateUrl: './view-shopping-cart.html',
  styleUrl: './view-shopping-cart.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewShoppingCart {

  shoppingCartService = inject(ShoppingCartService);
  cartItems = computed(()=> this.shoppingCartService.cartItems());
  finalPrice = computed(()=> this.shoppingCartService.calculateTotalPrice())

  constructor() {
    this.shoppingCartService.getCurrentCartItemsToCheckValidity()
  }

  generateOrder()
  {
    this.shoppingCartService.generateOrder()
  }

  enableButton()
  {
    return this.cartItems().length != 0
  }

}
