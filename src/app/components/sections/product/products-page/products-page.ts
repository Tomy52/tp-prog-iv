import {ChangeDetectionStrategy, Component, inject, signal, WritableSignal} from '@angular/core';
import {PageButtons} from '../../../reusable/page-buttons/page-buttons';
import {SearchBar} from '../../../reusable/search-bar/search-bar';
import {ProductService} from '../../../../services/product-service';
import {ProductsPageResponse} from '../../../../interfaces/other/products-page-response';
import {ProductList} from '../../../reusable/product-list/product-list';

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

  pageData: WritableSignal<ProductsPageResponse | null >;
  errMsg:string = '';

  searchTerm:string = '';

  constructor() {
    this.pageSize = this.pageSizeOptions[0];
    this.pageData = signal(null);
    this.getProducts('');
  }

  getProducts(query: string = this.searchTerm) {
    this.productService.getFilteredAndMakeFilteredPage(this.page(), this.pageSize, query).subscribe({
      next: (x) => {
        console.log(x);
        this.pageData.set(x);
      },
      error: (e) => {
        this.pageData.set(e.error);
        console.log(e);
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
    this.resetPageCount();
    this.getProducts();
  }

}
