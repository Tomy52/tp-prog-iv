import {Component, inject, signal, WritableSignal} from '@angular/core';
import {SupplierService} from '../../../../services/supplier-service';
import {Supplier} from '../../../../interfaces/supplier/supplier';
import {PageButtons} from '../../../reusable/page-buttons/page-buttons';
import {PageInfo} from '../../../../interfaces/other/page-info';
import {SupplierList} from '../../../reusable/supplier-list/supplier-list';
import {SearchBar} from '../../../reusable/search-bar/search-bar';
import {SuppliersPageResponse} from '../../../../interfaces/other/suppliers-page-response';
import {Observable} from 'rxjs';
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

  page = signal<number>(1);
  page_size:number = 2;

  button_state_obj = { // default state
    back_active: false,
    forward_active: true,
  };
  
  
  page_data = {
    current_page:0,
    max_page:0
  }

  search_method = this.supplier_service.getSuppliersPage(this.page(),this.page_size); // intento humilde al patron strategy


  suppliersList = signal<Supplier[]>([]);
  button_state = signal(this.button_state_obj);

  constructor() {
    this.supplier_service.getFilteredAndMakeFilteredPage(this.page(),this.page_size,'').subscribe({
      next: (x) => console.log(x)
    })
    //this.getSuppliers();
  }

  getSuppliers()
  {
    this.search_method.subscribe((response) => { // intento humilde al patron strategy
      console.log(response);
      this.suppliersList.set(response.content);
      this.updateButtonState(response.first,response.last);
      this.page_data.current_page = response.number + 1;
      this.page_data.max_page = response.totalPages;
      // aca se podria sacar los otros elementos necesarios
    });
  }

  goNextPage() // se podria desactivar el boton del formulario en caso de que sea la ultima pagina
  {
    this.page.update((number) => number + 1);
    console.log(this.page())
    this.updateSearchMethod(this.supplier_service.getSuppliersPage(this.page(),this.page_size));
    //this.updateSearchMethod(this.search_method); // intento humilde al patron strategy
  }

  goPreviewsPage()// se podria desactivar el boton del formulario en caso de que sea la primer pagina
  {
    this.page.update((number) => number - 1);
    this.updateSearchMethod(this.supplier_service.getSuppliersPage(this.page(),this.page_size)); // intento humilde al patron strategy
  }

  resetPageCount()
  {
    this.page.set(0);
  }

  updateButtonState(first:boolean, last:boolean)
  {
    this.button_state_obj.back_active = !first;
    this.button_state_obj.forward_active = !last;

    this.button_state.set(this.button_state_obj);

    console.log(this.button_state_obj);
  }


  searchByName(query:string)
  {
    if(query != '')
    {
      this.resetPageCount();
      this.updateSearchMethod(this.supplier_service.getSuppliersByName(this.page(),this.page_size,query));
    } else {
      this.resetPageCount();
      this.updateSearchMethod(this.supplier_service.getSuppliersPage(this.page(),this.page_size));
    }
  }

  updateSearchMethod(searchMethod:Observable<SuppliersPageResponse>) // intento humilde al patron strategy
  {
    this.search_method = searchMethod;
    this.getSuppliers();
  }

}
