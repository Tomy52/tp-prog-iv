import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { OrderData } from '../../../interfaces/orders/order-data';
import { OrderStatus } from '../../../interfaces/orders/order-status';
import { ModalService } from '../../../services/modal-service';
import { OrderDataPopupCustomer } from '../order-data-popup-customer/order-data-popup-customer';

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

  parseDate()
  {
    return Date.parse(this.orderData().createdAt)
  }

  showOrderDataPopUp()
  {
    this.modal_service.showOrderDataModal(OrderDataPopupCustomer,this.orderData(),false)
  }
}
