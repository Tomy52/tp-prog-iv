import {Component, inject, input, signal} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {AuthService} from '../../services/auth-service';

@Component({
  selector: 'app-sidebar-component',
  imports: [
    RouterLink,
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
