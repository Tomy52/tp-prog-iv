import {Component, inject} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {SupplierService} from '../../../../services/supplier-service';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-delete-supplier',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './delete-supplier.html',
  styleUrl: './delete-supplier.css'
})
export class DeleteSupplier {
  supplier_service = inject(SupplierService);
  form_builder = inject(FormBuilder);

  suppliers = toSignal(this.supplier_service.getAllSuppliersAsList());
  formulario = this.form_builder.group({
    id: [null, [Validators.required]]
  });

  submit()
  {
    const id = this.formulario.value.id!;

    this.supplier_service.deleteSupplier(id).subscribe({
      next: () => console.log(`${id} successfully deleted, how to update list?`),
      error: (e) => console.error("error :( \n" + JSON.stringify(e))
    });
  }

  isValid()
  {
    return this.formulario.valid;
  }
}
