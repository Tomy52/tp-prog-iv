import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { AuthService } from "../../../services/auth-service";


@Component({
  selector: 'app-customer-sidebar',
  imports: [RouterLink],
  templateUrl: './customer-sidebar.html',
  styleUrl: './customer-sidebar.css'
})
export class CustomerSidebar {
  authService = inject(AuthService);

  logOut(){
    this.authService.logOut();
  }
}
