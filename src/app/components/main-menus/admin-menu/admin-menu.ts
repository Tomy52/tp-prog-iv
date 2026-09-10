import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DolarInfo } from "../../reusable/dolar-info/dolar-info";
import { MainMenuButton } from "../../main-menu/main-menu-button/main-menu-button";

@Component({
  selector: 'app-admin-menu',
  imports: [MainMenuButton, DolarInfo],
  templateUrl: './admin-menu.html',
  styleUrls: ['../main-menu-shared-styles/menu-styles.css','./admin-menu.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminMenu {

}
