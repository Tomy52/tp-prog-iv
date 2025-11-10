import {ChangeDetectionStrategy, Component, computed, inject, input, signal} from '@angular/core';
import {SupplierDropdownSelect} from '../../../reusable/supplier-dropdown-select/supplier-dropdown-select';
import {Supplier} from '../../../../interfaces/supplier/supplier';
import {SupplierService} from '../../../../services/supplier-service';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {ProductSupplierService} from '../../../../services/product-supplier-service';
import {PriceBySupplierList} from '../../../../interfaces/product-supplier/price-by-supplier-list';
import {ProductSupplierRowComponent} from '../price-by-supplier-row-component/product-supplier-row-component';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-price-list-by-supplier-component',
  imports: [
    SupplierDropdownSelect,
    ReactiveFormsModule,
    ProductSupplierRowComponent
  ],
  templateUrl: './price-by-supplier-list-component.html',
  styleUrl: './price-by-supplier-list-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PriceBySupplierListComponent {

  supplierService = inject(SupplierService);
  productSupplierService = inject(ProductSupplierService);
  formBuilder = inject(FormBuilder);


  supplierList = signal<Supplier[]>([]);
  supplierProductList = signal<Partial<PriceBySupplierList>>({})


  priceList = computed(
      ()=> this.supplierProductList().productsList?.content)


  supplierForm = this.formBuilder.group({
    supplier: this.formBuilder.control<number | null>(null)
  })

  constructor() {
    this.getSuppliers();
  }

  getSuppliers() {
    this.supplierService.getAllSuppliersAsList().subscribe(suppliers => {
      this.supplierList.set(suppliers);

    })
  }


  getPricesBySupplier(){

    const id = this.supplierForm.get('supplier')?.value!;

    this.productSupplierService.getAllProductBySupplier(id).subscribe(
      (data) => {
        this.supplierProductList.set(data);
        console.log(this.supplierProductList());

      } );


  }

  handleRowDeletion(success: boolean) {
    if(success){
      console.log("Row deleted successfully");
      this.getPricesBySupplier();
    }
  }
}
