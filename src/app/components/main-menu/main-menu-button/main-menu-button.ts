import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-menu-button',
  imports: [RouterLink],
  templateUrl: './main-menu-button.html',
  styleUrl: './main-menu-button.css'
})
export class MainMenuButton {
  texto = input.required<string>();
  router_link = input.required<string>();
}
