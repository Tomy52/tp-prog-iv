import {ResponsePriceSupplier} from './response-price-supplier';
import {PageInfo} from './page-info';
import {ResponsePriceProduct} from './response-price-product';

export interface PriceProductPage {

  "content": ResponsePriceProduct[],
  "pageable": PageInfo,
  "last": boolean,
  "totalElements": number,
  "totalPages": number,
  "size": number,
  "number": number,
  "first": boolean,
  "numberOfElements": number,
  "empty": boolean


}
