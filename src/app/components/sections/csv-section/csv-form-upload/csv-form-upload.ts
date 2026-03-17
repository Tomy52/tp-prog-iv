import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Supplier } from '../../../../interfaces/supplier/supplier';
import { CsvService } from '../../../../services/csv-service';
import { SupplierService } from '../../../../services/supplier-service';
import { SupplierDropdownSelect } from '../../../reusable/supplier-dropdown-select/supplier-dropdown-select';
import { CsvUpload } from '../../../../interfaces/csv-update/csv-upload';
import { FailedProduct } from '../../../../interfaces/csv-update/failed-product-resp';

@Component({
  selector: 'app-csv-form-upload',
  imports: [SupplierDropdownSelect, ReactiveFormsModule],
  templateUrl: './csv-form-upload.html',
  styleUrl: './csv-form-upload.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CsvFormUpload {
  supplier_service = inject(SupplierService);
  csv_service = inject(CsvService)
  form_builder = inject(FormBuilder);
  
  suppliers: WritableSignal<Supplier[]> = signal<Supplier[]>([]);
  

  failed_message: WritableSignal<String|null> = signal<String|null>(null);
  failed_products: WritableSignal<FailedProduct[]> = signal<FailedProduct[]>([]);


  form = this.form_builder.group({
    id: [null as number | null, [Validators.required]],
    file: ['',[Validators.required]],
    profit_margin: [0, [Validators.required]]
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

    const values : CsvUpload = {
      id: upload_values.id!,
      file: this.selectedFile!,
      profit_margin: upload_values.profit_margin!
    }
    this.csv_service.addPricesOfProductsByCsv(values.id,values.file, values.profit_margin).subscribe(
      {
        next: (resp) => {
          this.failed_message.set(resp.message)
          this.failed_products.set(resp.nonAffectedProducts)
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

  hideFailedProducts()
  {
    this.failed_message.set(null)
    this.failed_products.set([])

    console.log("help")
  }
}
