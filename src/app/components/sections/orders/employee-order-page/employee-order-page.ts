import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';
import { CustomerOrderSearchBar } from "../../../reusable/customer-order-search-bar/customer-order-search-bar";
import { OrderList } from "../../../reusable/order-list/order-list";
import { PageButtons } from "../../../reusable/page-buttons/page-buttons";
import { CustomerOrderSearchData } from '../../../../interfaces/component-logic/customer-order-search-data';
import { OrderPopupType } from '../../../../interfaces/component-logic/order-popup-type';
import { OrderData } from '../../../../interfaces/orders/order-data';
import { PageResponse } from '../../../../interfaces/other/page-response';
import { OrderService } from '../../../../services/order-service';
import { EmployeeOrderSearchData } from '../../../../interfaces/component-logic/employee-order-search-data';
import { EmployeeOrderSearchBar } from "../../../reusable/employee-order-search-bar/employee-order-search-bar";

@Component({
  selector: 'app-employee-order-page',
  imports: [OrderList, PageButtons, EmployeeOrderSearchBar],
  templateUrl: './employee-order-page.html',
  styleUrl: './employee-order-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeOrderPage {
    orderService = inject(OrderService);

  page = signal<number>(0);

  pageSize:number;
  pageSizeOptions:number[] = [2,5,10];

  pageData: WritableSignal<PageResponse<OrderData> | null >;
  errMsg:string = '';

  searchTerm:EmployeeOrderSearchData = {

  };
  searching:boolean = false;
  

  constructor() {
    this.pageSize = Number(localStorage.getItem('pageSize')) || this.pageSizeOptions[0];
    this.pageData = signal(null);
    this.getOrders(this.searchTerm);
  }

  getOrders(terms:EmployeeOrderSearchData) {
    this.searching = true;
    
    this.orderService.getAllOrders(this.page(),this.pageSize, terms).subscribe({
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

  searchByTerms(terms:CustomerOrderSearchData)
  {
    this.searchTerm = terms
    this.resetPageCount();
    this.getOrders(terms)
  }

  getComponentType()
  {
    return OrderPopupType.EMPLOYEE
  }
}
