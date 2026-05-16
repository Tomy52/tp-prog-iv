import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MainMenuButton } from "../../main-menu/main-menu-button/main-menu-button";

@Component({
  selector: 'app-manager-menu',
  imports: [MainMenuButton],
  templateUrl: './manager-menu.html',
  styleUrl: './manager-menu.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagerMenu {

}
