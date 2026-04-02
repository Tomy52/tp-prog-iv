import {Component, effect, inject, input, OnInit, signal, WritableSignal} from '@angular/core';
import { SupplierService } from '../../../../services/supplier-service';
import { Supplier } from '../../../../interfaces/supplier/supplier';
import { SupplierFormComponent } from "../supplier-form-component/supplier-form-component";
import { ModalService } from '../../../../services/modal-service';
import { ModalNotification } from '../../../reusable/modal-notification/modal-notification';

@Component({
  selector: 'app-supplier-form-section',
  imports: [SupplierFormComponent],
  templateUrl: './supplier-form-section.html',
  styleUrl: './supplier-form-section.css'
})
export class SupplierFormSection implements OnInit {
  supplier_service = inject(SupplierService);
  modal_service = inject(ModalService)
  id = input<string>();


  supplier_obj?: Partial<Supplier>;

  finishForm(event:Partial<Supplier>)
  {
    if(this.id() == undefined)
    {
      this.upload(event);
    } else {
      this.update(event);
    }
  }

  upload(supplier:Partial<Supplier>)
  {
    let ok_option = 'Si'

    const modal_promise = this.modal_service.showModal(ModalNotification,{
      title: "¿Está seguro que desea continuar?",
      options: [ok_option,'No']
    })

    modal_promise?.subscribe((result) => {
      if(ok_option == result)
      {
        this.supplier_service.addSupplier(supplier).subscribe({
        next: () => {

          this.modal_service.showModal(ModalNotification, {
            title: "¡Proveedor cargado!"
          });

        },
        error: (e) =>{
          
          this.modal_service.showModal(ModalNotification, {
            title: "¡Error!"
          })

        }
      });
      }
    })
  }

  update(supplier:Partial<Supplier>)
  {
    let ok_option = 'Si'

    const modal_promise = this.modal_service.showModal(ModalNotification,{
      title: "¿Está seguro que desea continuar?",
      options: [ok_option,'No']
    })

    // TODO
    // Esto quedaria a modificar por el tema del error handler
    modal_promise?.subscribe((result) => {
      if(ok_option == result)
      {
        this.supplier_service.updateSupplier(this.id()!,supplier).subscribe({
        next: () => {

          this.modal_service.showModal(ModalNotification, {
            title: "¡Proveedor modificado!"
          });

        },
        error: (e) =>{
          
          this.modal_service.showModal(ModalNotification, {
            title: "¡Error!"
          })

        }
      });
      }
    })
  }



  ngOnInit() {
    if(this.id())
    {
      const id = Number(this.id()!);
      this.supplier_service.getSupplier(id).subscribe({
        next: (sup) => this.supplier_obj = sup,
        error: () => console.error("te deberia sacar de aca... (interceptor/guard?)")
      });
    }
  }
}
