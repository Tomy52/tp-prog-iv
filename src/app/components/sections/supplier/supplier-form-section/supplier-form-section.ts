import {Component, inject, input, OnInit, signal, WritableSignal} from '@angular/core';
import { SupplierService } from '../../../../services/supplier-service';
import { Supplier } from '../../../../interfaces/supplier/supplier';
import { SupplierFormComponent } from "../supplier-form-component/supplier-form-component";
import {ModalService} from '../../../../services/modal-service';

@Component({
  selector: 'app-supplier-form-section',
  imports: [SupplierFormComponent],
  templateUrl: './supplier-form-section.html',
  styleUrl: './supplier-form-section.css'
})
export class SupplierFormSection implements OnInit {
  supplier_service = inject(SupplierService);
  modal_service = inject(ModalService);

  id = input<string>();

  form_ok:WritableSignal<boolean | null> = signal(null);


  supplier_obj?: Partial<Supplier>;/* = { para probar sin el back
    companyName: "Test",
    cuit: "23-11111111-2",
    email: "test@gmail.com",
    phoneNumber: "1111111111",
    address: {
      street: "Calle 12",
      number: "123",
      city: "Ciudad"
    }
  };*/

  finishForm(event:Partial<Supplier>)
  {
    if(this.id() == undefined)
    {
      this.upload(event);
    } else {
      this.update(event);
    }
  }

  upload(event:Partial<Supplier>)
  {
    console.log("uploading");

    console.log(event);
    this.supplier_service.addSupplier(event).subscribe({
      next: () => {
        console.log("success!");
        this.modal_service.open('success');
        this.form_ok.set(true);
      },
      error: (e) =>{
        this.form_ok.set(false);
        this.modal_service.open('success');
        console.log(JSON.stringify(e));
      }
    });
  }

  update(event:Partial<Supplier>)
  {
    console.log("editing");

    this.supplier_service.updateSupplier(this.id()!,event).subscribe({
      next: () => console.log('success'),
      error: (e) => console.error("Error :( \n" + e)
    });
  }



  ngOnInit() {
    if(this.id())
    {
      const id = Number(this.id()!);
      this.supplier_service.getSupplier(id).subscribe({
        next: (sup) => this.supplier_obj = sup,
        error: () => this.modal_service.open('error-redirect')
      });
    }
  }
}
