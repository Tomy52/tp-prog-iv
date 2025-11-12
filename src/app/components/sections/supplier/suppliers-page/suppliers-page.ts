import {ChangeDetectionStrategy, Component, inject, signal, WritableSignal} from '@angular/core';
import {SupplierService} from '../../../../services/supplier-service';
import {Supplier} from '../../../../interfaces/supplier/supplier';
import {PageButtons} from '../../../reusable/page-buttons/page-buttons';
import {SupplierList} from '../../../reusable/supplier-list/supplier-list';
import {SearchBar} from '../../../reusable/search-bar/search-bar';
import {PageResponse} from '../../../../interfaces/other/page-response';

@Component({
  selector: 'app-suppliers-page',
  imports: [
    PageButtons,
    SupplierList,
    SearchBar
  ],
  templateUrl: './suppliers-page.html',
  styleUrl: './suppliers-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SuppliersPage {
  supplier_service = inject(SupplierService);

  page = signal<number>(0);

  page_size:number;
  page_size_ops:number[] = [2,5,10];

  page_data: WritableSignal<PageResponse<Supplier> | null >;
  error_msg:string = '';

  search_term:string = '';

  searching:boolean = false;

  constructor() {
    this.page_size = Number(localStorage.getItem('pageSize')) || this.page_size_ops[0];
    this.page_data = signal(null);
    this.getSuppliers('');
  }

  getSuppliers(query:string = this.search_term)
  {
    this.searching = true; // lock up the buttons so the user doesn't click twice
    this.supplier_service.getFilteredAndMakeFilteredPage(this.page(),this.page_size,query).subscribe({
      next: (x) => {
        console.log(x);
        this.page_data.set(x);
      },
      error: (e) => {
        this.page_data.set(e.error);
        console.log(e);
        this.error_msg = `Error: ${e.status}, ${e.statusText}`;
      },
      complete: () => this.searching = false
    });
  }

  goNextPage() // se podria desactivar el boton del formulario en caso de que sea la ultima pagina
  {
    this.page.update((number) => number + 1);
    this.getSuppliers(this.search_term);
  }

  goPreviewsPage()// se podria desactivar el boton del formulario en caso de que sea la primer pagina
  {
    this.page.update((number) => number - 1);
    this.getSuppliers(this.search_term);
  }

  resetPageCount()
  {
    this.page.set(0);
  }

  searchByName(query:string)
  {
    this.resetPageCount();
    this.search_term = query;
    this.getSuppliers(query);
  }

  changePageSize(size:number)
  {
    this.page_size = size;
    localStorage.setItem('pageSize',size.toString());
    this.resetPageCount();
    this.getSuppliers();
  }

}
