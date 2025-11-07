import {Component, inject, signal, WritableSignal} from '@angular/core';
import {SupplierService} from '../../../../services/supplier-service';
import {Supplier} from '../../../../interfaces/supplier/supplier';
import {PageButtons} from '../../../reusable/page-buttons/page-buttons';
import {PageInfo} from '../../../../interfaces/other/page-info';
import {SupplierList} from '../../../reusable/supplier-list/supplier-list';
import {SearchBar} from '../../../reusable/search-bar/search-bar';
import {SuppliersPageResponse} from '../../../../interfaces/other/suppliers-page-response';
import {Observable, of} from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-suppliers-page',
  imports: [
    PageButtons,
    SupplierList,
    SearchBar
  ],
  templateUrl: './suppliers-page.html',
  styleUrl: './suppliers-page.css'
})
export class SuppliersPage {
  supplier_service = inject(SupplierService);

  page = signal<number>(0);
  page_size:number = 2;

  page_data: WritableSignal<SuppliersPageResponse | null >;
  error_msg:string = '';

  search_term:string = '';

  constructor() {
    this.page_data = signal(null);
    this.getSuppliers('');
  }

  getSuppliers(query:string)
  {
    this.supplier_service.getFilteredAndMakeFilteredPage(this.page(),this.page_size,query).subscribe({
      next: (x) => {
        console.log(x);
        this.page_data.set(x);
      },
      error: (e) => {
        this.page_data.set(e.error);
        console.log(e);
        this.error_msg = `Error: ${e.status}, ${e.statusText}`;
      }
    });

    /*
    this.search_method.subscribe((response) => { // intento humilde al patron strategy
      console.log(response);
      this.suppliersList.set(response.content);
      this.updateButtonState(response.first,response.last);
      this.page_data.current_page = response.number + 1;
      this.page_data.max_page = response.totalPages;
      // aca se podria sacar los otros elementos necesarios
    });*/
  }

  goNextPage() // se podria desactivar el boton del formulario en caso de que sea la ultima pagina
  {
    this.page.update((number) => number + 1);
    this.getSuppliers(this.search_term);
    //this.updateSearchMethod(this.search_method); // intento humilde al patron strategy
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

}
