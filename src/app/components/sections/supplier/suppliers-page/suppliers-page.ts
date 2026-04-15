import {ChangeDetectionStrategy, Component, inject, signal, WritableSignal} from '@angular/core';
import {SupplierService} from '../../../../services/supplier-service';
import {Supplier} from '../../../../interfaces/supplier/supplier';
import {PageButtons} from '../../../reusable/page-buttons/page-buttons';
import {SupplierList} from '../../../reusable/supplier-list/supplier-list';
import {PageResponse} from '../../../../interfaces/other/page-response';
import { SupplierSearchBar } from "../../../reusable/supplier-search-bar/supplier-search-bar";
import { SupplierSearchData } from '../../../../interfaces/component-logic/supplier-search-data';

@Component({
  selector: 'app-suppliers-page',
  imports: [
    PageButtons,
    SupplierList,
    SupplierSearchBar
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

  query:SupplierSearchData = {

  }
  searching:boolean = false;

  constructor() {
    this.page_size = Number(localStorage.getItem('pageSize')) || this.page_size_ops[0];
    this.page_data = signal(null);
    this.getSuppliers(this.query);
  }

  getSuppliers(query:SupplierSearchData)
  {
    this.searching = true; // lock up the buttons so the user doesn't click twice

    this.supplier_service.getSuppliersPage(this.page(),this.page_size,query).subscribe({
      next: (response) => {
        this.page_data.set(response);
      },

      complete: () => this.searching = false
    })
    
    /*
    this.supplier_service.getFilteredAndMakeFilteredPage(this.page(),this.page_size,query).subscribe({
      next: (response) => {
        console.log(response);
        this.page_data.set(response);
      },
      error: (e) => {
        this.page_data.set(e.error);
        this.error_msg = `Error: ${e.status}, ${e.statusText}`;
        throw e;
      },
      complete: () => this.searching = false
    });*/
  }

  goNextPage() // se podria desactivar el boton del formulario en caso de que sea la ultima pagina
  {
    this.page.update((number) => number + 1);
    this.getSuppliers(this.query);
  }

  goPreviewsPage()// se podria desactivar el boton del formulario en caso de que sea la primer pagina
  {
    this.page.update((number) => number - 1);
    this.getSuppliers(this.query);
  }

  resetPageCount()
  {
    this.page.set(0);
  }

  searchByTerms(event:SupplierSearchData)
  {
    this.resetPageCount()
    this.query = event
    this.getSuppliers(this.query)
  }

  changePageSize(size:number)
  {
    this.page_size = size;
    localStorage.setItem('pageSize',size.toString());
    this.resetPageCount();
    this.getSuppliers(this.query);
  }

}
