import {Component, inject, input} from '@angular/core';
import {Supplier} from '../../../interfaces/supplier/supplier';
import {SupplierService} from '../../../services/supplier-service';
import {Router} from '@angular/router';
import { AllowViewUser } from '../../../directives/allow-view-user';

@Component({
  selector: 'app-supplier-list-card',
  imports: [AllowViewUser],
  templateUrl: './supplier-list-card.html',
  styleUrl: './supplier-list-card.css'
})
export class SupplierListCard {
  supplier_info = input.required<Supplier>();
  supplier_service = inject(SupplierService);
  router = inject(Router);


  delete_sup()
  {
    const ok = confirm(`¿Realmente quiere eliminar ${this.supplier_info().companyName}?`);

    if(ok)
    {
      this.supplier_service.deleteSupplier(this.supplier_info().id).subscribe({
        next: () => window.location.reload(),
        error: () => console.error('Error borrando')
      });
    }
  }

  update_sup()
  {
    this.router.navigate(['/form-suppliers',this.supplier_info().id]);
  }



}
