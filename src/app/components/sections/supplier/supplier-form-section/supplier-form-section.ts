import {Component, effect, inject, input, OnInit, signal, WritableSignal} from '@angular/core';
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

  form_ok:WritableSignal<boolean | null> = signal(null);
  error = signal<string>('');


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

  upload(event:Partial<Supplier>)
  {
    const ok = confirm("¿Está seguro de que desea continuar?");

    if (ok)
    {
      this.supplier_service.addSupplier(event).subscribe({
        next: () => {
          this.form_ok.set(true);
        },
        error: (e) =>{
          this.form_ok.set(false);
          this.error.set(e.error);
        }
      });
    }
  }

  update(event:Partial<Supplier>)
  {
    console.log("editing");

    this.supplier_service.updateSupplier(this.id()!,event).subscribe({
      next: () => this.form_ok.set(true),
      error: (e) => {
        this.form_ok.set(false);
        this.error.set(e.error);
      }
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
