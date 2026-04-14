import {ChangeDetectionStrategy, Component, inject, signal, WritableSignal} from '@angular/core';
import {PageButtons} from '../../../reusable/page-buttons/page-buttons';
import {SearchBar} from '../../../reusable/search-bar/search-bar';
import {ProductService} from '../../../../services/product-service';
import {ProductList} from '../../../reusable/product-list/product-list';
import {PageResponse} from '../../../../interfaces/other/page-response';
import {Product} from '../../../../interfaces/product';
import {AllowViewUser} from '../../../../directives/allow-view-user';
import { ProductSearchBar } from "../../../reusable/product-search-bar/product-search-bar";
import { ProductSearchBarData } from '../../../../interfaces/component-logic/product-search-bar-data';

@Component({
  selector: 'app-products-page',
  imports: [
    PageButtons,
    SearchBar,
    ProductList,
    AllowViewUser,
    ProductSearchBar
],
  templateUrl: './products-page.html',
  styleUrl: './products-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsPage {
  productService = inject(ProductService);

  page = signal<number>(0);

  pageSize:number;
  pageSizeOptions:number[] = [2,5,10];

  pageData: WritableSignal<PageResponse<Product> | null >;
  errMsg:string = '';

  searchTerm:ProductSearchBarData = {

  };
  searching:boolean = false;
  

  constructor() {
    this.pageSize = Number(localStorage.getItem('pageSize')) || this.pageSizeOptions[0];
    this.pageData = signal(null);
    this.getProducts(this.searchTerm);

    
  }

  getProducts(terms:ProductSearchBarData) {
    this.searching = true;
    
    this.productService.getProductsPage(this.page(),this.pageSize,terms).subscribe({
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

  searchByTerms(terms:ProductSearchBarData)
  {
    this.searchTerm = terms
    this.resetPageCount();
    this.getProducts(terms)
  }

}
