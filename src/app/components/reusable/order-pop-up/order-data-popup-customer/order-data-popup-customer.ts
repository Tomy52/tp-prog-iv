import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { OrderData } from '../../../../interfaces/orders/order-data';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-order-data-popup-customer',
  imports: [],
  templateUrl: './order-data-popup-customer.html',
  styleUrls: ['../../modal-notification/modal-notification.css','./order-data-popup-customer.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderDataPopupCustomer {
  data = signal<OrderData|undefined>(undefined);
  dialog_data = inject(DIALOG_DATA)

  constructor()
  {
    this.data.set(this.dialog_data.data);
  }

  private dialogRef = inject(DialogRef, {optional: true})
  protected closeModal() {
    this.dialogRef?.close()
  }
}
