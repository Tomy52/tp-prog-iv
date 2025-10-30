import {Component, inject, signal, WritableSignal} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {SupplierService} from '../../../../services/supplier-service';
import {Supplier} from '../../../../interfaces/supplier/supplier';

@Component({
  selector: 'app-delete-supplier',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './delete-supplier.html',
  styleUrl: './delete-supplier.css'
})
export class DeleteSupplier {
  supplier_service = inject(SupplierService);
  form_builder = inject(FormBuilder);

  suppliers: WritableSignal<Supplier[]> = signal<Supplier[]>([]);

  constructor() {
    this.getSuppliers();
  }

  form = this.form_builder.group({
    id: [null, [Validators.required]]
  });

  submit()
  {
    const id = this.form.value.id!;

    this.supplier_service.deleteSupplier(id).subscribe({
      next: () => {
        this.getSuppliers();
        this.resetForm();
      },
      error: (e) => console.error("error :( \n" + JSON.stringify(e))
    });
  }

  getSuppliers(): void {
    this.supplier_service.getAllSuppliersAsList().subscribe(
      (arr) => this.suppliers.set(arr)
    );
  }

  isValid()
  {
    return this.form.valid;
  }

  resetForm()
  {
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }
}
