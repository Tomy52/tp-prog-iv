import {ChangeDetectionStrategy, Component, inject, signal, WritableSignal} from '@angular/core';
import {PageButtons} from '../../../reusable/page-buttons/page-buttons';
import {SearchBar} from '../../../reusable/search-bar/search-bar';
import {ProductService} from '../../../../services/product-service';
import {ProductList} from '../../../reusable/product-list/product-list';
import {PageResponse} from '../../../../interfaces/other/page-response';
import {Product} from '../../../../interfaces/product';

@Component({
  selector: 'app-products-page',
  imports: [
    PageButtons,
    SearchBar,
    ProductList
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

  constructor() {
    this.pageSize = Number(localStorage.getItem('pageSize')) || this.pageSizeOptions[0];
    this.pageData = signal(null);
    this.getProducts('');
  }

  getProducts(query: string = this.searchTerm) {
    this.productService.getFilteredAndMakeFilteredPage(this.page(), this.pageSize, query).subscribe({
      next: (x) => {
        this.pageData.set(x);
      },
      error: (e) => {
        this.pageData.set(e.error);
        this.errMsg = `Error: ${e.status}, ${e.statusText}`;
      }
    });

    /*
    this.search_method.subscribe((response) => { // intento humilde al patron strategy
      console.log(response);
      this.productList.set(response.content);
      this.updateButtonState(response.first,response.last);
      this.page_data.current_page = response.number + 1;
      this.page_data.max_page = response.totalPages;
      // aca se podria sacar los otros elementos necesarios
    });*/
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

  searchByName(query: string) {
    this.resetPageCount();
    this.searchTerm = query;
    this.getProducts(query);
  }

  changePageSize(size: number) {
    this.pageSize = size;
    localStorage.setItem('pageSize',size.toString());
    this.resetPageCount();
    this.getProducts();
  }

}
