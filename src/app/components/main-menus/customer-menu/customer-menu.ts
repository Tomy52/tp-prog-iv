import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MainMenuButton } from "../../main-menu/main-menu-button/main-menu-button";

@Component({
  selector: 'app-customer-menu',
  imports: [MainMenuButton],
  templateUrl: './customer-menu.html',
  styleUrl: './customer-menu.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerMenu {

}
