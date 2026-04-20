import { Component, ChangeDetectionStrategy, inject, signal, WritableSignal } from "@angular/core";
import { ProductSearchBarData } from "../../../../interfaces/component-logic/product-search-bar-data";
import { PageResponse } from "../../../../interfaces/other/page-response";
import { CustomerProductInfo } from "../../../../interfaces/product/customer-product-info";
import { ProductService } from "../../../../services/product-service";
import { PageButtons } from "../../../reusable/page-buttons/page-buttons";
import { CustomerProductList } from "../customer-product-list/customer-product-list";
import { ClientProductSearchBar } from "../../../reusable/client-product-search-bar/client-product-search-bar";
import { ClientProductSearchBarData } from "../../../../interfaces/component-logic/client-product-search-bar-data";


@Component({
  selector: 'app-products-page',
  imports: [
    PageButtons,
    CustomerProductList,
    ClientProductSearchBar
],
  templateUrl: './products-on-sale-page.html',
  styleUrl: './products-on-sale-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsOnSalePage {
  productService = inject(ProductService);

  page = signal<number>(0);

  pageSize:number;
  pageSizeOptions:number[] = [2,5,10];

  pageData: WritableSignal<PageResponse<CustomerProductInfo> | null >;
  errMsg:string = '';

  searchTerm:ClientProductSearchBarData = {

  };
  searching:boolean = false;
  

  constructor() {
    this.pageSize = Number(localStorage.getItem('pageSize')) || this.pageSizeOptions[0];
    this.pageData = signal(null);
    this.getProducts(this.searchTerm)
  }

  getProducts(query:ClientProductSearchBarData) {
    this.searching = true;
    
    this.productService.getProductsOnSale(this.page(),this.pageSize,query).subscribe({
      next: (x) => {
        this.pageData.set(x)
      },
      error: (e) => {
        throw e;
      },
      complete: () => this.searching = false
    })
  }

  goForward() {
    this.page.update((number) => number + 1);
    this.getProducts(this.searchTerm);
  }

  goBack() {
    this.page.update((number) => number - 1);
    this.getProducts(this.searchTerm);
  }

  resetPageCount() {
    this.page.set(0);
  }


  changePageSize(size: number) {
    this.pageSize = size;
    localStorage.setItem('pageSize',size.toString());
    this.resetPageCount();
    this.getProducts(this.searchTerm);
  }

  searchByTerms(terms:ClientProductSearchBarData)
  {
    this.searchTerm = terms
    this.resetPageCount();
    this.getProducts(this.searchTerm)
  }

}
