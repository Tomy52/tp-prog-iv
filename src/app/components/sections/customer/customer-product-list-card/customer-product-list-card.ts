import {ChangeDetectionStrategy, Component, inject, input, OnInit, signal} from '@angular/core';
import { CustomerProductInfo } from '../../../../interfaces/product/customer-product-info';
import {ShoppingCartService} from '../../../../services/shopping-cart-service';

@Component({
  selector: 'app-customer-product-list-card',
  imports: [],
  templateUrl: './customer-product-list-card.html',
  styleUrl: './customer-product-list-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerProductListCard implements OnInit {
  productInfo = input.required<CustomerProductInfo>()

  isClicked = signal<boolean>(false);
  shoppingCartService = inject(ShoppingCartService);

  ngOnInit(): void {
    this.updateCardsStockByCart()
  }

  getImageUrl()
  {
    return this.productInfo().image_url != null ? this.productInfo().image_url : "/public/images/missing.png"
  }

  selectProduct(productId:number){
  this.shoppingCartService.addToCart(productId);
    this.productInfo().stock -= 1;
    this.isClicked.set(true);
  }

  unselectProduct(productId:number){
    this.shoppingCartService.removeFromCart(productId);
    this.productInfo().stock += 1;
  }

  updateCardsStockByCart()
  {
    const current_stock = this.shoppingCartService.getQuantity(this.productInfo().idProduct);

    if(current_stock >= 1) this.isClicked.set(true)
      
    this.productInfo().stock -= current_stock;
  }

  

}
