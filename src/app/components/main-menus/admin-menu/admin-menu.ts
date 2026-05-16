import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MainMenuButton } from "../../main-menu/main-menu-button/main-menu-button";

@Component({
  selector: 'app-admin-menu',
  imports: [MainMenuButton],
  templateUrl: './admin-menu.html',
  styleUrl: './admin-menu.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminMenu {

}
