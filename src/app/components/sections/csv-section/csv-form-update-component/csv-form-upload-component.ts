import { ChangeDetectionStrategy, Component, inject, output, signal, WritableSignal } from '@angular/core';
import { SupplierDropdownSelect } from "../../../reusable/supplier-dropdown-select/supplier-dropdown-select";
import { Supplier } from '../../../../interfaces/supplier/supplier';
import { SupplierService } from '../../../../services/supplier-service';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CsvUpdate } from '../../../../interfaces/csv-update/csv-update';

@Component({
  selector: 'app-csv-form-upload-component',
  imports: [SupplierDropdownSelect, ReactiveFormsModule],
  templateUrl: './csv-form-upload-component.html',
  styleUrl: './csv-form-upload-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CsvFormUploadComponent {
  suppliers: WritableSignal<Supplier[]> = signal<Supplier[]>([]);
  supplier_service = inject(SupplierService);
  
  form_builder = inject(FormBuilder);
  data_sig = output<CsvUpdate>();


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

  completeForm()
  {
    console.log(this.form.value)
  }

  
  isFormValid()
  {
    return this.form.valid;
  }

}
