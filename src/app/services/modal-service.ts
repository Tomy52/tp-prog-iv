import { Injectable } from '@angular/core';
import {ModalAlert} from '../components/reusable/modal-alert/modal-alert';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modals: ModalAlert[] = [];

  add(modal: ModalAlert) {
    // ensure component has a unique id attribute
    if (!(!modal.id || this.modals.find(x => x.id() === modal.id()))) {
      // add modal to array of active modals
      this.modals.push(modal);
      console.log(this.modals);
    }
  }

  remove(modal: ModalAlert) {
    // remove modal from array of active modals
    this.modals = this.modals.filter(x => x === modal);
  }

  open(id: string) {
    // open modal specified by id
    const modal = this.modals.find(x => x.id() === id);

    if (!modal) {
      console.error(`modal '${id}' not found`);
    } else {
      modal.open();
    }
  }

  close() {
    // close the modal that is currently open
    const modal = this.modals.find(x => x.isOpen);
    modal?.close();
  }

  redirect(redirect:any[]) {
    const modal = this.modals.find(x => x.isOpen);
    modal?.redirect(redirect);
  }
}
