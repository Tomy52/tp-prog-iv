import {Component, input} from '@angular/core';
import {Product} from '../../../interfaces/product';
import {ProductListCard} from '../product-list-card/product-list-card';

@Component({
  selector: 'app-product-list',
  imports: [
    ProductListCard
  ],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList {
  products = input.required<Product[]>();
}
