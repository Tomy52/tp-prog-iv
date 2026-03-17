import { ChangeDetectionStrategy, Component, inject, output, signal, WritableSignal } from '@angular/core';
import { SupplierDropdownSelect } from '../../../reusable/supplier-dropdown-select/supplier-dropdown-select';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CsvUpdate } from '../../../../interfaces/csv-update/csv-update';
import { Supplier } from '../../../../interfaces/supplier/supplier';
import { CsvService } from '../../../../services/csv-service';
import { SupplierService } from '../../../../services/supplier-service';
import { FailedProduct } from '../../../../interfaces/csv-update/failed-product-resp';
import { FailedProductsResp } from '../../../../interfaces/csv-update/failed-products-resp';
import { FailedProductsComponent } from '../../../reusable/failed-products-component/failed-products-component';

@Component({
  selector: 'app-csv-form-upload',
  imports: [SupplierDropdownSelect, ReactiveFormsModule,FailedProductsComponent],
  templateUrl: './csv-form-update.html',
  styleUrl: './csv-form-update.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CsvFormUpdate {
  csv_service = inject(CsvService);
  form_builder = inject(FormBuilder);

  suppliers: WritableSignal<Supplier[]> = signal<Supplier[]>([]);
  supplier_service = inject(SupplierService);
  
  failed_products_response: WritableSignal<FailedProductsResp|null> = signal<FailedProductsResp|null>(null);


  form = this.form_builder.group({
    id: [null as number | null, [Validators.required]],
    file: ['',[Validators.required]]
  })

  constructor() {
    this.getSuppliers();
  }


  getSuppliers(): void {
    this.supplier_service.getAllSuppliersAsList().subscribe(
      {
        next: (arr) => {
          this.suppliers.set(arr);
        },
        error: (err) => {
          console.log(err)
          alert(`${err.error}`);
          this.suppliers.set([])
        }
      }
    );
  }
  
  selectedFile: File | null = null;

  onFileSelected(event:any) {
    this.selectedFile = <File>event.target.files[0] 
  }

  completeForm()
  {
    const upload_values = this.form.value
    this.form.reset()
    
    const values : CsvUpdate = {
      id: upload_values.id!,
      file: this.selectedFile!
    }

    this.csv_service.updatePricesOfProductsByCsv(values.id,values.file).subscribe(
      {
        next: (resp) => {
          this.failed_products_response.set(resp)
        },
        error: (err) => {
          console.error(err)
        }
      }
    )
  }

  
  isFormValid()
  {
    return this.form.valid;
  }
}
