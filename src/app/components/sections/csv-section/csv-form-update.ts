import { ChangeDetectionStrategy, Component, inject, output, signal, WritableSignal } from '@angular/core';
import { SupplierDropdownSelect } from '../../reusable/supplier-dropdown-select/supplier-dropdown-select';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CsvUpdate } from '../../../interfaces/csv-update/csv-update';
import { Supplier } from '../../../interfaces/supplier/supplier';
import { CsvService } from '../../../services/csv-service';
import { SupplierService } from '../../../services/supplier-service';
import { FailedProductsResp } from '../../../interfaces/csv-update/failed-products-resp';
import { FailedProductsComponent } from '../../reusable/failed-products-component/failed-products-component';
import { SwitchWithText } from "../../reusable/switch-with-text/switch-with-text";
import { Dialog } from "@angular/cdk/dialog"
import { ModalService } from '../../../services/modal-service';
import { ModalNotification } from '../../reusable/modal-notification/modal-notification';

@Component({
  selector: 'app-csv-form-upload',
  imports: [SupplierDropdownSelect, ReactiveFormsModule, SwitchWithText],
  templateUrl: './csv-form-update.html',
  styleUrl: './csv-form-update.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CsvFormUpdate {
  csv_service = inject(CsvService);
  form_builder = inject(FormBuilder);
  dialog = inject(Dialog)
  modal_service = inject(ModalService)

  suppliers: WritableSignal<Supplier[]> = signal<Supplier[]>([]);
  supplier_service = inject(SupplierService);
  
  form = this.form_builder.group({
    id: [null as number | null, [Validators.required]],
    file: ['',[Validators.required]],
    csv_mode: [false as boolean,[]]
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
          this.suppliers.set([])
          throw err
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
      file: this.selectedFile!,
      mode: upload_values.csv_mode ? 'add' : 'modify' 
    }
    
    this.csv_service.changeProductsUsingCsv(values).subscribe(
      {
        next: (resp) => {
          const dialog_ref = this.dialog.open(FailedProductsComponent, {
            data: {resp: resp},
            disableClose: true
          })
        },
        error: (err) => {
          throw err
        }
      }
    )
  }

  
  isFormValid()
  {
    return this.form.valid;
  }
}
