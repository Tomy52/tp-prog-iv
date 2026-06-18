import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DolarInfo } from "../../reusable/dolar-info/dolar-info";

@Component({
  selector: 'app-admin-menu',
  imports: [DolarInfo],
  templateUrl: './admin-menu.html',
  styleUrl: './admin-menu.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminMenu {

}
