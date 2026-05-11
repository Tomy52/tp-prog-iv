import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderData } from '../interfaces/orders/order-data';
import { HttpClient } from '@angular/common/http';
import { PageResponse } from '../interfaces/other/page-response';
import { CustomerOrderSearchData } from '../interfaces/component-logic/customer-order-search-data';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  createOrderUrl = "api/sales/make-order"
  orderUrl = "api/orders"

  http: HttpClient = inject(HttpClient);

  getAllCustomerOrders(page:number, size:number, terms:CustomerOrderSearchData) : Observable<PageResponse<OrderData>>
  {
    let query_string = '?'

    if(page)
    {
      query_string += `&page=${page}`
    }

    if(size)
    {
      query_string += `&size=${size}`
    }

    if(terms.status)
    {
      query_string += `&status=${terms.status}`
    }

    return this.http.get<PageResponse<OrderData>>(`${this.orderUrl}/my-orders${query_string}`);
  }
}
