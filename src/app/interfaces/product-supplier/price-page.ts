import {ResponsePrice} from './response-price';
import {PageInfo} from './page-info';

export interface PricePage {

    "content": ResponsePrice[],
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
