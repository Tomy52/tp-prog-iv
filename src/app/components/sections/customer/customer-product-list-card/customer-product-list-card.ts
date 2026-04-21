import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CustomerProductInfo } from '../../../../interfaces/product/customer-product-info';

@Component({
  selector: 'app-customer-product-list-card',
  imports: [],
  templateUrl: './customer-product-list-card.html',
  styleUrl: './customer-product-list-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerProductListCard {
  productInfo = input.required<CustomerProductInfo>()
  

  getImageUrl()
  {
    return this.productInfo().image_url != null ? this.productInfo().image_url : "/public/images/missing.png"
  }
}
