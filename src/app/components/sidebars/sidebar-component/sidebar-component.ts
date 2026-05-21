import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { AllowViewUser } from "../../../directives/allow-view-user";
import { AuthService } from "../../../services/auth-service";

@Component({
  selector: 'app-sidebar-component',
  imports: [
    RouterLink,
    AllowViewUser,
  ],
  templateUrl: './sidebar-component.html',
  styleUrls: ["./sidebar-component.css","../styles/sidebar-style.css"]
})
export class SidebarComponent {

  authService = inject(AuthService);

  logOut(){
    this.authService.logOut();
  }



}
