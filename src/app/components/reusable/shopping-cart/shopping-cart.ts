import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {Product} from '../../../interfaces/product';
import {ShoppingCartService} from '../../../services/shopping-cart-service';

@Component({
  selector: 'app-shopping-cart',
  imports: [],
  templateUrl: './shopping-cart.html',
  styleUrl: './shopping-cart.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingCart {

  shoppingCartService = inject(ShoppingCartService);

  items =  this.shoppingCartService.cartItems;





}
