import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { OrderData } from '../../../../interfaces/orders/order-data';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { OrderService } from '../../../../services/order-service';
import { ModalService } from '../../../../services/modal-service';
import { ModalNotification } from '../../modal-notification/modal-notification';
import { EnumMappingService } from '../../../../services/enum-mapping-service';
import { OrderStatus } from '../../../../interfaces/orders/order-status';

@Component({
  selector: 'app-order-data-popup-customer',
  imports: [],
  templateUrl: './order-data-popup-customer.html',
  styleUrls: ['../../modal-notification/modal-notification.css','./order-data-popup-customer.css','../../styles/select-style.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderDataPopupCustomer {
  data = signal<OrderData|undefined>(undefined);
  dialog_data = inject(DIALOG_DATA)
  order_service = inject(OrderService)
  modal_service = inject(ModalService)

  current_status = signal<String>('');

  enum_mapper = inject(EnumMappingService)

  constructor()
  {
    this.data.set(this.dialog_data.data);
    this.current_status.set(this.enum_mapper.searchEnumValue(OrderStatus,this.data()?.status!))
  }

  private dialogRef = inject(DialogRef, {optional: true})
  protected closeModal(status?:string) {
    this.dialogRef?.close(status)
  }

  goBack() {
    this.closeModal();
  }

  changeStatus()
  {
    let ok_option = "Si"

    const modal = this.modal_service.showModal(ModalNotification,{
      title: "Realmente quiere hacer esto?",
      description: "No se puede deshacer esta acción.",
      options: [ok_option,"No"]
    })

    modal?.subscribe({
      next: (response) => {
        if(response == ok_option)
        {
          this.executeChange()
        }
      }
    })
  }

  executeChange()
  {
    const change_status = {
      status: "CANCELLED"
    }

    this.order_service.changeStatus(this.data()?.orderId!,change_status).subscribe({
      next: () => {
        this.closeModal(change_status.status)
      },error: (err) => {
        throw err
      }
    })
  }

  checkIfControlsShouldBeEnabled()
  {
    return !(this.data()?.status == "CANCELLED" || this.data()?.status == "COMPLETED")
  }
}
