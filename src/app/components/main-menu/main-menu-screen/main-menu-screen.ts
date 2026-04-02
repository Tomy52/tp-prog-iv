import { Component, inject } from '@angular/core';
import { MainMenuButton } from "../main-menu-button/main-menu-button";
import { ModalService } from '../../../services/modal-service';
import { ModalNotification } from '../../reusable/modal-notification/modal-notification';

@Component({
  selector: 'app-main-menu-screen',
  imports: [MainMenuButton],
  templateUrl: './main-menu-screen.html',
  styleUrl: './main-menu-screen.css'
})
export class MainMenuScreen {
  dialog_service = inject(ModalService)


  testSomething()
  {
    const promise = this.dialog_service.showModal(ModalNotification, {
      title: "Holaaa",
      description: "Funciona esto?",
      // options: ["Si", "No"]
    },
    true)

    promise?.subscribe((result) => {
      console.log(result)
    })
  }
}
