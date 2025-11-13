import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core';
import {SupplierDropdownSelect} from '../../../reusable/supplier-dropdown-select/supplier-dropdown-select';
import {Supplier} from '../../../../interfaces/supplier/supplier';
import {SupplierService} from '../../../../services/supplier-service';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ProductSupplierService} from '../../../../services/product-supplier-service';
import {PriceBySupplierList} from '../../../../interfaces/product-supplier/price-by-supplier-list';
import {ProductSupplierRowComponent} from '../price-by-supplier-row-component/product-supplier-row-component';
import {PageButtons} from '../../../reusable/page-buttons/page-buttons';
import {AllowViewUser} from '../../../../directives/allow-view-user';

@Component({
  selector: 'app-price-list-by-supplier-component',
  imports: [
    SupplierDropdownSelect,
    ReactiveFormsModule,
    ProductSupplierRowComponent,
    PageButtons,
    AllowViewUser
  ],
  templateUrl: './price-by-supplier-list-component.html',
  styleUrl: './price-by-supplier-list-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PriceBySupplierListComponent {

  supplierService = inject(SupplierService);
  productSupplierService = inject(ProductSupplierService);
  formBuilder = inject(FormBuilder);

  page = signal<number>(0);
  pageSize:number;
  pageSizeOptions:number[] = [2,5,10];

  searching:boolean = false;

  supplierList = signal<Supplier[]>([]);
  supplierProductList = signal<Partial<PriceBySupplierList>>({});


  priceList = computed(
      ()=> this.supplierProductList().productsList?.content);

  supplierForm = this.formBuilder.group({
    supplier: [null as number | null, [Validators.required]]
  });

  constructor() {
    this.pageSize = Number(localStorage.getItem('pageSize')) || this.pageSizeOptions[0];
    this.getSuppliers();
  }

  getSuppliers() {
    this.supplierService.getAllSuppliersAsList().subscribe({
      next: suppliers => {
        this.supplierList.set(suppliers);
    }, error: error => {
        alert(error.error);
      }
    })
  }

  search() // for the button
  {
    this.resetPageCount();
    this.getPricesBySupplier();
  }

  getPricesBySupplier(){
    this.searching = true;
    const id = this.supplierForm.get('supplier')?.value!;

    this.productSupplierService.getAllProductBySupplier(id,this.page(),this.pageSize).subscribe({
      next: (data) => {
        this.supplierProductList.set(data);
        console.log(this.supplierProductList());
      },
      error: () => {
        console.error("error");
      },
      complete: () => {
        this.searching = false;
      }
    });
  };

  handleRowDeletion(success: boolean) {
    if(success){
      console.log("Row deleted successfully");
      this.getPricesBySupplier();
    }
  }

  goNextPage() // se podria desactivar el boton del formulario en caso de que sea la ultima pagina
  {
    this.page.update((number) => number + 1);
    this.getPricesBySupplier();
  }

  goPreviewsPage()// se podria desactivar el boton del formulario en caso de que sea la primer pagina
  {
    this.page.update((number) => number - 1);
    this.getPricesBySupplier();
  }

  resetPageCount()
  {
    this.page.set(0);
  }

  changePageSize(size: number) {
    this.pageSize = size;
    localStorage.setItem('pageSize',size.toString());
    this.resetPageCount();
    this.getPricesBySupplier();
  }
}
