import { Dialog } from '@angular/cdk/dialog';
import { inject, Injectable, signal } from '@angular/core';
import { NotificationData } from '../interfaces/other/notification-data';
import { ShoppingCartFailResults } from '../interfaces/component-logic/shopping-cart-fail-results';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  dialog = inject(Dialog);
  showing = signal<boolean>(false)
  

  // Esto es Any asi puede tomar cualquier componente
  showModal(comp: any, data: NotificationData, disable_close: boolean = true)
  {
    if(this.showing()) return
   
    if(data.options == undefined) data.options = ["Ok"]
    

    return this.dialog.open(comp, {
      data: {data: data},
      disableClose: disable_close
    }).closed
  }


  showCartErrorModal(comp: any, data: NotificationData, shopping_cart_fail: ShoppingCartFailResults, disable_close: boolean = false)
  {
    if(data.options == undefined) data.options = ["Ok"]

    return this.dialog.open(comp, {
      data: {data: shopping_cart_fail,
        notification_data: data
      },
      disableClose: disable_close
    })
  }
}
