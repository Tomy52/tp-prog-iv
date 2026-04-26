import {ChangeDetectionStrategy, Component, inject, input} from '@angular/core';
import { CustomerProductInfo } from '../../../../interfaces/product/customer-product-info';
import {ShoppingCartService} from '../../../../services/shopping-cart-service';

@Component({
  selector: 'app-customer-product-list-card',
  imports: [],
  templateUrl: './customer-product-list-card.html',
  styleUrl: './customer-product-list-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerProductListCard {
  productInfo = input.required<CustomerProductInfo>()

  shoppingCart = inject(ShoppingCartService);

  getImageUrl()
  {
    return this.productInfo().image_url != null ? this.productInfo().image_url : "/public/images/missing.png"
  }

    selectProduct(productId:number){
    this.shoppingCart.addToCart(productId);
      this.productInfo().stock -= 1;
    }


}
