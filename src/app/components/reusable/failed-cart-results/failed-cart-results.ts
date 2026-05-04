import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ShoppingCartFailResults } from '../../../interfaces/component-logic/shopping-cart-fail-results';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { NotificationData } from '../../../interfaces/other/notification-data';

@Component({
  selector: 'app-failed-cart-results',
  imports: [],
  templateUrl: './failed-cart-results.html',
  styleUrl: './failed-cart-results.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FailedCartResults {
  data = signal<ShoppingCartFailResults|undefined>(undefined);
  notification_data = signal<NotificationData|undefined>(undefined);
  dialog_data = inject(DIALOG_DATA)
  
  constructor()
  {
    this.data.set(this.dialog_data.data)
    this.notification_data.set(this.dialog_data.notification_data)
  }


  private dialogRef = inject(DialogRef, {optional: true})
  protected closeModal(resp:String) {
    this.dialogRef?.close(resp)
  }
}
