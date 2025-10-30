import {Component, inject} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {SupplierService} from '../../../../services/supplier-service';
import {SupplierDropdownSelect} from '../../../reusable/supplier-dropdown-select/supplier-dropdown-select';

@Component({
  selector: 'app-delete-supplier',
  imports: [ReactiveFormsModule, SupplierDropdownSelect, FormsModule],
  templateUrl: './delete-supplier.html',
  styleUrl: './delete-supplier.css'
})
export class DeleteSupplier {
  supplier_service = inject(SupplierService);
  form_builder = inject(FormBuilder);

  formulario = this.form_builder.group({
    id: [0, [Validators.required]]
  });

  id?:number;

  submit()
  {
    console.log("uploading");
    console.log(this.formulario.value)
    /*
    this.supplier_service.deleteSupplier(this.id!).subscribe({
      next: () => console.log("success!"),
      error: (e) => console.error("error :( \n" + JSON.stringify(e))
    });*/
  }
}
