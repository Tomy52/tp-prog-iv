import {ChangeDetectionStrategy, Component, inject, signal, WritableSignal} from '@angular/core';
import {PageButtons} from '../../../reusable/page-buttons/page-buttons';
import {SearchBar} from '../../../reusable/search-bar/search-bar';
import {ProductService} from '../../../../services/product-service';
import {ProductList} from '../../../reusable/product-list/product-list';
import {PageResponse} from '../../../../interfaces/other/page-response';
import {Product} from '../../../../interfaces/product';
import {AuthService} from '../../../../services/auth-service';
import {AllowViewUser} from '../../../../directives/allow-view-user';

@Component({
  selector: 'app-products-page',
  imports: [
    PageButtons,
    SearchBar,
    ProductList,
    AllowViewUser
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

  searchTerm:string = '';
  displayDisabledProducts = signal<boolean>(false);

  searching:boolean = false;

  constructor() {
    this.pageSize = Number(localStorage.getItem('pageSize')) || this.pageSizeOptions[0];
    this.pageData = signal(null);
    this.getProducts('', this.displayDisabledProducts());
  }

  getProducts(query: string = this.searchTerm, showAll: boolean) {
    this.searching = true;
    this.productService.getFilteredAndMakeFilteredPage(this.page(), this.pageSize, query, showAll).subscribe({
      next: (x) => {
        console.log(x);
        this.pageData.set(x);
      },
      error: (e) => {
        this.pageData.set(e.error);
        this.errMsg = `Error: ${e.status}, ${e.statusText}`;
      },
      complete: () => this.searching = false
    });
  }

  toggleDisabledProductsVisibility() {
    this.displayDisabledProducts.set(!this.displayDisabledProducts());
    this.resetPageCount();
    this.getProducts(this.searchTerm, this.displayDisabledProducts());
  }

  goForward() {
    this.page.update((number) => number + 1);
    this.getProducts(this.searchTerm, this.displayDisabledProducts());
  }

  goBack() {
    this.page.update((number) => number - 1);
    this.getProducts(this.searchTerm, this.displayDisabledProducts());
  }

  resetPageCount() {
    this.page.set(0);
  }

  searchByName(query: string) {
    this.resetPageCount();
    this.searchTerm = query;
    this.getProducts(query,this.displayDisabledProducts());
  }

  changePageSize(size: number) {
    this.pageSize = size;
    localStorage.setItem('pageSize',size.toString());
    this.resetPageCount();
    this.getProducts('',this.displayDisabledProducts());
  }

}
