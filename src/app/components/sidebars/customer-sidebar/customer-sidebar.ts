import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-customer-sidebar',
  imports: [RouterLink],
  templateUrl: './customer-sidebar.html',
  styleUrls: ['./customer-sidebar.css',"../styles/sidebar-style.css"]
})
export class CustomerSidebar {
}
