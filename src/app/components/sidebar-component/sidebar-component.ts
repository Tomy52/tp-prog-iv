import {Component, inject, input, signal} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {AuthService} from '../../services/auth-service';
import {AllowViewUser} from '../../directives/allow-view-user';

@Component({
  selector: 'app-sidebar-component',
  imports: [
    RouterLink,
    AllowViewUser,
  ],
  templateUrl: './sidebar-component.html',
  styleUrl: './sidebar-component.css'
})
export class SidebarComponent {

  authService = inject(AuthService);

  logOut(){
    this.authService.logOut();
  }



}
