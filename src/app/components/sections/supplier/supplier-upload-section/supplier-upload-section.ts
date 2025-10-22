import { Component, inject } from '@angular/core';
import { SupplierFormComponent } from "../supplier-form-component/supplier-form-component";
import { Supplier } from '../../../../interfaces/supplier';
import { SupplierService } from '../../../../services/supplier-service';

@Component({
  selector: 'app-supplier-upload-section',
  imports: [SupplierFormComponent],
  templateUrl: './supplier-upload-section.html',
  styleUrl: './supplier-upload-section.css'
})
export class SupplierUploadSection {
  supplier_service = inject(SupplierService)

  uploadSupplier(event:Partial<Supplier>)
  {

    console.log(event)

    this.supplier_service.addSupplier(event).subscribe({
      next: (o) => console.log("success!"),
      error: (e) => console.error("error :( \n" + e)
    })
  }
}
