import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';
import { ProductSearchBarData } from '../../../../interfaces/component-logic/product-search-bar-data';
import { PageResponse } from '../../../../interfaces/other/page-response';
import { OrderData } from '../../../../interfaces/orders/order-data';
import { OrderService } from '../../../../services/order-service';
import { PageButtons } from "../../../reusable/page-buttons/page-buttons";
import { OrderList } from "../../../reusable/order-list/order-list";
import { CustomerOrderSearchBar } from "../../../reusable/customer-order-search-bar/customer-order-search-bar";

@Component({
  selector: 'app-customer-list',
  imports: [PageButtons, OrderList, CustomerOrderSearchBar],
  templateUrl: './customer-order-page.html',
  styleUrl: './customer-order-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerOrderList {
  orderService = inject(OrderService);

  page = signal<number>(0);

  pageSize:number;
  pageSizeOptions:number[] = [2,5,10];

  pageData: WritableSignal<PageResponse<OrderData> | null >;
  errMsg:string = '';

  searchTerm:ProductSearchBarData = {

  };
  searching:boolean = false;
  

  constructor() {
    this.pageSize = Number(localStorage.getItem('pageSize')) || this.pageSizeOptions[0];
    this.pageData = signal(null);
    this.getOrders(this.searchTerm);
  }

  getOrders(terms:ProductSearchBarData) {
    this.searching = true;
    
    this.orderService.getAllCustomerOrders(this.page(),this.pageSize).subscribe({
      next: (x) => {
        this.pageData.set(x)
        console.log(x)
      },
      error: (e) => {
        throw e;
      },
      complete: () => this.searching = false
    })
  }

  goForward() {
    this.page.update((number) => number + 1);
    this.getOrders(this.searchTerm);
  }

  goBack() {
    this.page.update((number) => number - 1);
    this.getOrders(this.searchTerm);
  }

  resetPageCount() {
    this.page.set(0);
  }


  changePageSize(size: number) {
    this.pageSize = size;
    localStorage.setItem('pageSize',size.toString());
    this.resetPageCount();
    this.getOrders(this.searchTerm);
  }

  searchByTerms(terms:ProductSearchBarData)
  {
    this.searchTerm = terms
    this.resetPageCount();
    this.getOrders(terms)
  }
}
