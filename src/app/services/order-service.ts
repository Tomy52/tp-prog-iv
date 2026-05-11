import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderData } from '../interfaces/orders/order-data';
import { HttpClient } from '@angular/common/http';
import { PageResponse } from '../interfaces/other/page-response';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  createOrderUrl = "api/sales/make-order"
  orderUrl = "api/orders"

  http: HttpClient = inject(HttpClient);

  getAllCustomerOrders(page:number, size:number, status?:string) : Observable<PageResponse<OrderData>>
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

    if(status)
    {
      query_string += `&status=${status}`
    }

    console.log(query_string)
    return this.http.get<PageResponse<OrderData>>(`${this.orderUrl}/my-orders${query_string}`);
  }
}
