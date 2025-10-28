import {Component, inject, input} from '@angular/core';
import { SupplierService } from '../../../../services/supplier-service';
import { Supplier } from '../../../../interfaces/supplier/supplier';
import { SupplierFormComponent } from "../supplier-form-component/supplier-form-component";

@Component({
  selector: 'app-supplier-form-section',
  imports: [SupplierFormComponent],
  templateUrl: './supplier-form-section.html',
  styleUrl: './supplier-form-section.css'
})
export class SupplierFormSection /*implements OnInit*/ {
  supplier_service = inject(SupplierService);

  id = input<string>();

  //query_params!:Params;


  //constructor(private route: ActivatedRoute) {}

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

  /*ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.query_params = params;
      console.log(`Params: ${this.query_params['delete']}`);
    });
  }

  getQueryparam(name:string) {
    return this.query_params[name];
  }*/
}
