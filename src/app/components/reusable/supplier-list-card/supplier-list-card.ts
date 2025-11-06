import {Component, inject, input} from '@angular/core';
import {Supplier} from '../../../interfaces/supplier/supplier';
import {SupplierService} from '../../../services/supplier-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-supplier-list-card',
  imports: [],
  templateUrl: './supplier-list-card.html',
  styleUrl: './supplier-list-card.css'
})
export class SupplierListCard {
  supplier_info = input.required<Supplier>();
  supplier_service = inject(SupplierService);
  router = inject(Router);


  delete_sup()
  {
    this.supplier_service.deleteSupplier(this.supplier_info().id).subscribe({
      next: () => window.location.reload(),
      error: () => console.error('Error borrando')
    });
  }

  update_sup()
  {
    this.router.navigate(['/form-suppliers',this.supplier_info().id]);
  }



}
