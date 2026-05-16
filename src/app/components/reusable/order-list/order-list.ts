import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { OrderData } from '../../../interfaces/orders/order-data';
import { OrderCard } from "../order-card/order-card";
import { OrderPopupType } from '../../../interfaces/component-logic/order-popup-type';

@Component({
  selector: 'app-order-list',
  imports: [OrderCard],
  templateUrl: './order-list.html',
  styleUrl: './order-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderList {
  orderData = input.required<OrderData[]>();
  componentType = input.required<OrderPopupType>();
}
