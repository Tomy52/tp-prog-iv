import {Component, inject, signal} from '@angular/core';
import {SupplierService} from '../../../../services/supplier-service';
import {SupplierTableList} from '../supplier-table-list/supplier-table-list';
import {Observable} from 'rxjs';
import {Supplier} from '../../../../interfaces/supplier/supplier';
import {PageButtons} from '../../../reusable/page-buttons/page-buttons';
import {PageInfo} from '../../../../interfaces/other/page-info';
import {SuppliersPageResponse} from '../../../../interfaces/other/suppliers-page-response';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-suppliers-page',
  imports: [
    SupplierTableList,
    PageButtons
  ],
  templateUrl: './suppliers-page.html',
  styleUrl: './suppliers-page.css'
})
export class SuppliersPage {
  supplier_service = inject(SupplierService);

  page:number = 1;

  // estaria bueno tener este objeto para asi ya tenemos consolidado la logica para tener los datos de como es la pagina.

  page_info = signal<Partial<PageInfo>>({});

  suppliersList = signal<Supplier[]>([])

  constructor() {
    this.getSuppliers();
  }

  getSuppliers()
  {
    this.supplier_service.getSuppliersPage().subscribe(
      (response) => {

        this.suppliersList.set(response.content)

        // aca se podria sacar los otros elementos necesarios

        })
  }

  goNextPage() // se podria desactivar el boton del formulario en caso de que sea la ultima pagina
  {
    this.page = this.page + 1;
    this.getSuppliers();
  }

  goPreviewsPage()// se podria desactivar el boton del formulario en caso de que sea la primer pagina
  {
    this.page = this.page + 1;
    this.getSuppliers();
  }


}
