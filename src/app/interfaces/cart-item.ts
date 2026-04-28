import {Product} from './product';
import { CustomerProductInfo } from './product/customer-product-info';

export interface CartItem {

  product: CustomerProductInfo;
  quantity: number;

}
