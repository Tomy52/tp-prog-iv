import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CustomerProductInfo } from '../../../../interfaces/product/customer-product-info';
import { CustomerProductListCard } from "../customer-product-list-card/customer-product-list-card";

@Component({
  selector: 'app-customer-product-list',
  imports: [CustomerProductListCard],
  templateUrl: './customer-product-list.html',
  styleUrl: './customer-product-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerProductList {
  products = input.required<CustomerProductInfo[]>();
}
