import {ChangeDetectionStrategy, Component, computed, inject} from '@angular/core';
import {ShoppingCartService} from '../../../services/shopping-cart-service';
import {Tooltip} from '../../../directives/tooltip';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  imports: [
    Tooltip,
    RouterLink
  ],
  templateUrl: './shopping-cart.html',
  styleUrl: './shopping-cart.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingCart {

  shoppingCartService = inject(ShoppingCartService);

  items =  computed(
    () => this.shoppingCartService.cartItems().reduce(
      (acc, item) => acc + item.quantity, 0));





}
