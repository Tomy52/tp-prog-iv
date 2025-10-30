import {Component, inject, input, OnInit} from '@angular/core';
import { SupplierService } from '../../../../services/supplier-service';
import { Supplier } from '../../../../interfaces/supplier/supplier';
import { SupplierFormComponent } from "../supplier-form-component/supplier-form-component";

@Component({
  selector: 'app-supplier-form-section',
  imports: [SupplierFormComponent],
  templateUrl: './supplier-form-section.html',
  styleUrl: './supplier-form-section.css'
})
export class SupplierFormSection implements OnInit {
  supplier_service = inject(SupplierService);

  id = input<string>();
  supplier_obj?: Supplier; // quiero esto para poder aplicarselo al form cuando modifica... estaria bueno...

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
      next: () => console.log("success!"),
      error: (e) => console.error("error :( \n" + JSON.stringify(e))
    });
  }

  update(event:Partial<Supplier>)
  {
    console.log("editing");

    this.supplier_service.updateSupplier(this.id()!,event).subscribe({
      next: () => console.log("success!"),
      error: (e) => console.error("Error :( \n" + e)
    });
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
