import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject, OnInit,
  signal,
  ViewChild,
  viewChild
} from '@angular/core';
import {NavigationEnd, Router, RouterLink} from '@angular/router';
import {SidebarComponent} from '../sidebar-component/sidebar-component';
import {ClickOutside} from '../../directives/click-outside';
import {filter} from 'rxjs';
import {AuthService} from '../../services/auth-service';

@Component({
  selector: 'app-header-component',
  imports: [
    RouterLink,
    SidebarComponent,
    ClickOutside
  ],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  router = inject(Router);
  isSidenavOpen = signal<boolean>(false);
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


  openSidebar(): void {
    this.isSidenavOpen.set(true);

  }

  closeSidebar(){
    this.isSidenavOpen.set(false);
  }


}
