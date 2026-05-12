import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { OrderData } from '../../../interfaces/orders/order-data';
import { OrderStatus } from '../../../interfaces/orders/order-status';
import { ModalService } from '../../../services/modal-service';
import { OrderDataPopupCustomer } from '../order-data-popup-customer/order-data-popup-customer';
import { OrderPopupType } from '../../../interfaces/component-logic/order-popup-type';

@Component({
  selector: 'app-order-card',
  imports: [],
  templateUrl: './order-card.html',
  styleUrl: './order-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderCard {
  orderData = input.required<OrderData>();
  modal_service = inject(ModalService);
  popup_component = input.required<OrderPopupType>();

  
  showOrderDataPopUp()
  {
    console.log('help')
    this.modal_service.showOrderDataModal(this.popup_component(),this.orderData(),false)
  }
}
