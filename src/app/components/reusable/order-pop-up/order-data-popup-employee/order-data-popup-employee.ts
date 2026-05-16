import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { OrderData } from '../../../../interfaces/orders/order-data';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { EnumMappingService } from '../../../../services/enum-mapping-service';
import { OrderStatus } from '../../../../interfaces/orders/order-status';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { EnumMap } from '../../../../interfaces/component-logic/enum-map';
import { OrderService } from '../../../../services/order-service';
import { Router, RouterModule } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { routes } from '../../../../app.routes';

@Component({
  selector: 'app-order-data-popup-employee',
  imports: [ReactiveFormsModule],
  templateUrl: './order-data-popup-employee.html',
  styleUrls: ['../../modal-notification/modal-notification.css','./order-data-popup-employee.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderDataPopupEmployee {
  data = signal<OrderData|undefined>(undefined);
  dialog_data = inject(DIALOG_DATA)
  enum_mapper = inject(EnumMappingService)
  enum_list = signal<EnumMap[]>([]);
  
  order_service = inject(OrderService);
  form_builder = inject(FormBuilder)

  form = this.form_builder.group({
    status: ['']
  })

  constructor()
  {
    this.data.set(this.dialog_data.data);
    this.enum_list.set(this.enum_mapper.createList(OrderStatus))
    this.form.setValue({status: this.data()?.status!})
  }


  checkIfControlsShouldBeEnabled()
  {
    return !(this.data()?.status == "CANCELLED" || this.data()?.status == "COMPLETED")
  }


  private dialogRef = inject(DialogRef, {optional: true})
  protected closeModal(change_status:string) {
    this.dialogRef?.close(change_status)
  }

  updateStatus()
  {
    const change_status = {
      status: this.form.value.status!
    }

    this.order_service.changeStatus(this.data()?.orderId!,change_status).subscribe({
      next: () => {
        this.closeModal(change_status.status!)
      },error: (err) => {
        throw err
      }
    })
  }
}
