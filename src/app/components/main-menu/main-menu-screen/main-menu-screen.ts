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
}
