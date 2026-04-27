import {ChangeDetectionStrategy, Component, computed, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {ShoppingCartService} from '../../../services/shopping-cart-service';

@Component({
  selector: 'app-shopping-cart',
  imports: [
    RouterLink
  ],
  templateUrl: './view-shopping-cart.html',
  styleUrl: './view-shopping-cart.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewShoppingCart {

  shoppingCartService = inject(ShoppingCartService);
  cartItems = computed(()=> this.shoppingCartService.cartItems());

  constructor() {
    console.log(this.cartItems())
  }

}
