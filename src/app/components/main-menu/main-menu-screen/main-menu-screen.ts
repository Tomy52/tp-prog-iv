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
  notification = inject(ModalService)

  showSomething()
  {
    this.notification.showModal(ModalNotification,{
      title: "Algo hay algo",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    })
  }
}
