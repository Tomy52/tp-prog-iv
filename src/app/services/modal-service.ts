import { Dialog } from '@angular/cdk/dialog';
import { inject, Injectable, signal } from '@angular/core';
import { NotificationData } from '../interfaces/other/notification-data';
import { ShoppingCartFailResults } from '../interfaces/component-logic/shopping-cart-fail-results';
import { OrderData } from '../interfaces/orders/order-data';
import { OrderPopupType } from '../interfaces/component-logic/order-popup-type';
import { OrderDataPopupCustomer } from '../components/reusable/order-pop-up/order-data-popup-customer/order-data-popup-customer';
import { OrderDataPopupEmployee } from '../components/reusable/order-pop-up/order-data-popup-employee/order-data-popup-employee';

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

    if(shopping_cart_fail.bad_stock?.length)
    {
      data.options = ["Remover", "Dejar"]
    }

    return this.dialog.open(comp, {
      data: {data: shopping_cart_fail,
        notification_data: data
      },
      disableClose: disable_close
    }).closed
  }

  showOrderDataModal(comp_type:OrderPopupType, data:OrderData, disable_close:boolean = true)
  {

    let component_type;

    if(OrderPopupType.EMPLOYEE == comp_type)
    {
      component_type = OrderDataPopupEmployee
    }

    if(OrderPopupType.CUSTOMER == comp_type)
    {
      component_type = OrderDataPopupCustomer
    }

    if(!component_type) return

    return this.dialog.open<any>(component_type, {
      data: {data: data},
      disableClose: disable_close
    }).closed
  }
}
