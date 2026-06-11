import { ChangeDetectionStrategy, Component, inject, input, model } from '@angular/core';
import { OrderData } from '../../../interfaces/orders/order-data';
import { OrderStatus } from '../../../interfaces/orders/order-status';
import { ModalService } from '../../../services/modal-service';
import { OrderDataPopupCustomer } from '../order-pop-up/order-data-popup-customer/order-data-popup-customer';
import { OrderPopupType } from '../../../interfaces/component-logic/order-popup-type';
import { EnumMappingService } from '../../../services/enum-mapping-service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-order-card',
  imports: [
    DatePipe
  ],
  templateUrl: './order-card.html',
  styleUrl: './order-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderCard {
  orderData = model<OrderData>();
  modal_service = inject(ModalService);
  popup_component = input.required<OrderPopupType>();
  enum_mapping_service = inject(EnumMappingService)

  showOrderDataPopUp()
  {
    const popup = this.modal_service.showOrderDataModal(this.popup_component(),this.orderData()!,false)

    if(!popup) return

    popup.subscribe({
      next: (value) => {
        this.handleStatusChange(value);
      }
    })
  }

  getEnumValue()
  {
    return this.enum_mapping_service.searchEnumValue(OrderStatus,this.orderData()?.status!);
  }


  handleStatusChange(status:string)
  {
    if(!status) return

    this.orderData.update((data) => ({...data, status: status}))
  }
}
