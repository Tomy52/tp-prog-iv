import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MainMenuButton } from "../../main-menu/main-menu-button/main-menu-button";
import { DolarInfo } from "../../reusable/dolar-info/dolar-info";

@Component({
  selector: 'app-manager-menu',
  imports: [MainMenuButton, DolarInfo],
  templateUrl: './manager-menu.html',
  styleUrls: ['../main-menu-shared-styles/menu-styles.css','./manager-menu.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagerMenu {

}
