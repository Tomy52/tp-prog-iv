import {ChangeDetectionStrategy, Component, inject, input, model, OnInit, output, signal} from '@angular/core';
import { CustomerProductInfo } from '../../../../interfaces/product/customer-product-info';
import {ShoppingCartService} from '../../../../services/shopping-cart-service';
import { Subject } from 'rxjs';

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
  taken_stock = model<number>(0);
  returnedStock = output<CustomerProductInfo[]>()

  ngOnInit(): void { // this makes a race condition
    this.updateCardsStockByCart()

    this.shoppingCartService.checkIfIChanged.subscribe(() => {
      const log = this.shoppingCartService.getQuantity(this.productInfo().idProduct);
      this.taken_stock.set(log)
    })
  }

  getImageUrl()
  {
    return this.productInfo().image_url != null ? this.productInfo().image_url : "/images/missing.png"
  }

  selectProduct(productId:number){
  this.shoppingCartService.addToCart(productId);
    // this.productInfo().stock -= 1;
    this.taken_stock.update((x) => x + 1);
  }

  unselectProduct(productId:number){
    this.shoppingCartService.removeFromCart(productId);
    // this.productInfo().stock += 1;
    this.taken_stock.update((x) => x - 1);
  }

  updateCardsStockByCart()
  {
    const cart_stock = this.shoppingCartService.getQuantity(this.productInfo().idProduct);

    if(cart_stock >= 1) this.isClicked.set(true)

    this.taken_stock.set(cart_stock)

    /*
    if (this.productInfo().stock - cart_stock < 0){
      this.productInfo().stock = 0;
    } else {
      this.productInfo().stock = this.productInfo().stock - cart_stock;
    }*/

  }

  calculateStockRemainingStock()
  {
    return this.productInfo().stock - this.taken_stock()
  }


}
