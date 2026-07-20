import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject, OnInit,
  signal
} from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import {ClickOutside} from '../../directives/click-outside';
import {filter} from 'rxjs';
import {AuthService} from '../../services/auth-service';
import { CustomerSidebar } from '../sidebars/customer-sidebar/customer-sidebar';
import { SidebarComponent } from "../sidebars/sidebar-component/sidebar-component";
import {ShoppingCart} from '../reusable/shopping-cart/shopping-cart';
import { AdminSidebar } from "../sidebars/admin-sidebar/admin-sidebar";
import {AllowViewUser} from '../../directives/allow-view-user';
import {Tooltip} from '../../directives/tooltip';
import {ModalService} from '../../services/modal-service';
import {ModalNotification} from '../reusable/modal-notification/modal-notification';

@Component({
  selector: 'app-header-component',
  imports: [
    RouterLink,
    ClickOutside,
    CustomerSidebar,
    SidebarComponent,
    ShoppingCart,
    AdminSidebar,
    AllowViewUser,
    Tooltip
  ],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  router = inject(Router);
  modalService = inject(ModalService);
  isSidenavOpen = signal<boolean>(false);
  isUserPanelOpen = signal<boolean>(false);
  authService = inject(AuthService);
  username = signal<string>("");


  routerEffect = effect( () => {
    this.router.events.pipe(
      filter( (event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe( () => {
      if(this.isSidenavOpen()){
        this.closeSidebar();
      }
    });
  });

  ngOnInit() {
    this.getUsername();
  }

  getUsername() {
    this.username.set(this.authService.getUsername());
  }
  /*
  @ViewChild('sidebarArea', {read: ViewContainerRef}) sidebarArea!:ViewContainerRef*/
  openSidebar(): void {
    this.isSidenavOpen.set(true);
  }

  closeSidebar(){
    this.isSidenavOpen.set(false);
  }

  logout() {
    this.authService.logOut();
    window.location.reload();
  }

  openTipModal() {
    const ok_option = "Si";

    const modal = this.modalService.showModal(ModalNotification,{
      title: "Cerrar sesión",
      description: "¿Está seguro que desea cerrar la sesión?",
      options: [ok_option,"No"]
    });

    modal?.subscribe({
      next: (response) => {
        if(response == ok_option)
        {
          this.logout();
        }
      }
    });
  }


}
