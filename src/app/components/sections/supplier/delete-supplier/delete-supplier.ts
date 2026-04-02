import {Component, inject, signal, WritableSignal} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {SupplierService} from '../../../../services/supplier-service';
import {Supplier} from '../../../../interfaces/supplier/supplier';
import { SupplierDropdownSelect } from '../../../reusable/supplier-dropdown-select/supplier-dropdown-select';
import { ModalService } from '../../../../services/modal-service';
import { ModalNotification } from '../../../reusable/modal-notification/modal-notification';

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
  modal_service = inject(ModalService)


  constructor() {
    this.getSuppliers();
  }

  form = this.form_builder.group({
    id: [null as number | null, [Validators.required]]
  });

  submit()
  {
    const id = this.form.value.id!;

    let ok_option = "Si"

    const modal_promise = this.modal_service.showModal(ModalNotification, {
      title: "¿Realmente quiere hacer esto?",
      description: "Esta acción no se puede deshacer.",
      options: [ok_option, "No"]
    })


    modal_promise?.subscribe((result) => {
      if(result == ok_option)
      {
        this.supplier_service.deleteSupplier(id).subscribe({
          next: () => {

            this.modal_service.showModal(ModalNotification, {
              title: "¡Exito!",
              description: "Proveedor eliminado exitosamente."
            }, false)

            this.getSuppliers();
            this.resetForm();
          },
          error: (e) => {
            this.modal_service.showModal(ModalNotification, {
              title: "¡Error!"
            }, false)
          }
        });
      }
    })
  }

  getSuppliers(): void {
    this.supplier_service.getAllSuppliersAsList().subscribe(
      {
        next: (arr) => {
          this.suppliers.set(arr);
        },
        error: (err) => {
          // esto se podria implementar 
          this.modal_service.showModal(ModalNotification, {
            title: "No hay proveedores!"
          })

          this.suppliers.set([])
        }
      }
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
