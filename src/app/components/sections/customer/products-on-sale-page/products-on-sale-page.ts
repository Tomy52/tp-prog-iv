import { Component, ChangeDetectionStrategy, inject, signal, WritableSignal } from "@angular/core";
import { ProductSearchBarData } from "../../../../interfaces/component-logic/product-search-bar-data";
import { PageResponse } from "../../../../interfaces/other/page-response";
import { CustomerProductInfo } from "../../../../interfaces/product/customer-product-info";
import { ProductService } from "../../../../services/product-service";
import { PageButtons } from "../../../reusable/page-buttons/page-buttons";
import { CustomerProductList } from "../customer-product-list/customer-product-list";
import { ClientProductSearchBar } from "../../../reusable/client-product-search-bar/client-product-search-bar";


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

  searchTerm:ProductSearchBarData = {

  };
  searching:boolean = false;
  

  constructor() {
    this.pageSize = Number(localStorage.getItem('pageSize')) || this.pageSizeOptions[0];
    this.pageData = signal(null);
    this.getProducts()
  }

  getProducts() {
    this.searching = true;
    
    this.productService.getProductsOnSale(this.page(),this.pageSize).subscribe({
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
    this.getProducts();
  }

  goBack() {
    this.page.update((number) => number - 1);
    this.getProducts();
  }

  resetPageCount() {
    this.page.set(0);
  }


  changePageSize(size: number) {
    this.pageSize = size;
    localStorage.setItem('pageSize',size.toString());
    this.resetPageCount();
    this.getProducts();
  }

  /*
  searchByTerms(terms:ProductSearchBarData)
  {
    this.searchTerm = terms
    this.resetPageCount();
    this.getProducts(terms)
  }*/

}
