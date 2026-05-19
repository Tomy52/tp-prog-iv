import {Component, inject, input} from '@angular/core';
import {Supplier} from '../../../interfaces/supplier/supplier';
import {SupplierService} from '../../../services/supplier-service';
import {Router} from '@angular/router';
import { AllowViewUser } from '../../../directives/allow-view-user';
import { ModalService } from '../../../services/modal-service';
import { ModalNotification } from '../modal-notification/modal-notification';

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
  modal_service = inject(ModalService)

  delete_sup()
  {
    let ok_option = "Si"

    const modal = this.modal_service.showModal(ModalNotification, {
      title: `¿Realmente quiere eliminar ${this.supplier_info().companyName}?`,
      description: 'Tip: Esto eliminara todos los precios relacionados',
      options: [ok_option, "No"]
    })


    modal?.subscribe({
      next: (option) => 
        {
          if(ok_option == option)
          {
            this.supplier_service.deleteSupplier(this.supplier_info().id).subscribe({
              next: () => window.location.reload(),
              error: (err) => {throw err}
            })
          }
        }
    })
  }

  update_sup()
  {
    this.router.navigate(['/form-suppliers',this.supplier_info().id]);
  }



}
