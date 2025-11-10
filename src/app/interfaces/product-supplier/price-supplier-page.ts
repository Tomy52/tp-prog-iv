import {ResponsePriceSupplier} from './response-price-supplier';
import {PageInfo} from './page-info';

export interface PriceSupplierPage {

    "content": ResponsePriceSupplier[],
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
