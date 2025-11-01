import {Component, inject, signal, WritableSignal} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {SupplierService} from '../../../../services/supplier-service';
import {Supplier} from '../../../../interfaces/supplier/supplier';
import { SupplierDropdownSelect } from '../../../reusable/supplier-dropdown-select/supplier-dropdown-select';

@Component({
  selector: 'app-delete-supplier',
  imports: [ReactiveFormsModule, FormsModule, SupplierDropdownSelect],
  templateUrl: './delete-supplier.html',
  styleUrl: './delete-supplier.css'
})
export class DeleteSupplier {
  supplier_service = inject(SupplierService);
  form_builder = inject(FormBuilder);

  suppliers: WritableSignal<Supplier[]> = signal<Supplier[]>([]);

  form_ok:WritableSignal<boolean | null> = signal(null);

  constructor() {
    this.getSuppliers();
  }

  form = this.form_builder.group({
    id: [null as number | null, [Validators.required]]
  });

  submit()
  {
    const id = this.form.value.id!;

    console.log(id);

    this.supplier_service.deleteSupplier(id).subscribe({
      next: () => {
        this.getSuppliers(); // doesn't show the deleted supplier
        this.resetForm();
        this.form_ok.set(true);
      },
      error: (e) => {
        console.error("error :( \n" + JSON.stringify(e));
        this.form_ok.set(false);
      }
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
