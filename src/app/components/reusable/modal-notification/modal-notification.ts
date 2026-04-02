import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NotificationData } from '../../../interfaces/other/notification-data';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-modal-notification',
  imports: [],
  templateUrl: './modal-notification.html',
  styleUrl: './modal-notification.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalNotification {
  data = signal<NotificationData|undefined>(undefined);
  dialog_data = inject(DIALOG_DATA)

  constructor()
  {
    this.data.set(this.dialog_data.data);
  }

  private dialogRef = inject(DialogRef, {optional: true})
  protected closeModal(item:String) {
    this.dialogRef?.close(item)
  }
}
