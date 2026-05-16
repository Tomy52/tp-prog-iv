import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderData } from '../interfaces/orders/order-data';
import { HttpClient } from '@angular/common/http';
import { PageResponse } from '../interfaces/other/page-response';
import { CustomerOrderSearchData } from '../interfaces/component-logic/customer-order-search-data';
import { EmployeeOrderSearchData } from '../interfaces/component-logic/employee-order-search-data';
import { CartItem } from '../interfaces/cart-item';
import { OrderItem } from '../interfaces/orders/order-item';
import { CreateOrderOrderItem } from '../interfaces/component-logic/create-order-order-item';

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

  getAllOrders(page:number, size:number, terms:EmployeeOrderSearchData)
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

    if(terms.dni)
    {
      query_string += `&dni=${terms.dni}`
    }

    if(terms.status)
    {
      query_string += `&status=${terms.status}`
    }

    return this.http.get<PageResponse<OrderData>>(`${this.orderUrl}${query_string}`)
  }

  changeStatus(id:number, statusChanged:object)
  {
    return this.http.patch(`${this.orderUrl}/${id}`,statusChanged)
  }

  createOrder(order_items:CartItem[])
  {
    let order_obj = order_items.map((item) => {
      let order_item:CreateOrderOrderItem = {
        itemId: item.product.idProduct,
        quantity: item.quantity
      }
      return order_item
    })

    let order = {
      items: order_obj
    }

    this.http.post(`${this.createOrderUrl}`,order);
  }
}
