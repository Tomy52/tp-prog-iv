import { Dialog } from '@angular/cdk/dialog';
import { inject, Injectable, signal } from '@angular/core';
import { NotificationData } from '../interfaces/other/notification-data';

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
}
