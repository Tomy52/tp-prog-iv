import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MainMenuButton } from "../../main-menu/main-menu-button/main-menu-button";

@Component({
  selector: 'app-employee-menu',
  imports: [MainMenuButton],
  templateUrl: './employee-menu.html',
  styleUrls: ['../main-menu-shared-styles/menu-styles.css','./employee-menu.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeMenu {

}
