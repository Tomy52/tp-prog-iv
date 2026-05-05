import {ChangeDetectionStrategy, Component, inject, input, OnInit, output, signal} from '@angular/core';
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

  returnedStock = output<CustomerProductInfo[]>()


  ngOnInit(): void { // this makes a race condition
    this.updateCardsStockByCart()
    this.reloadStock()
  }

  getImageUrl()
  {
    return this.productInfo().image_url != null ? this.productInfo().image_url : "/images/missing.png"
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
    const cart_stock = this.shoppingCartService.getQuantity(this.productInfo().idProduct);

    if(cart_stock >= 1) this.isClicked.set(true)

    if (this.productInfo().stock - cart_stock < 0){
      this.productInfo().stock = 0;
    } else {
      this.productInfo().stock = this.productInfo().stock - cart_stock;
    }

  }

  // este metodo deberia agregar las unidades en sus respectivos productos...
  reloadStock(){

    const items = this.shoppingCartService.returnedStock();

    console.log(items);

    if (items.length !== 0) {

      this.returnedStock.emit(items);

    }


  }


}
