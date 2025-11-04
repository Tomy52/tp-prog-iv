import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  signal,
  ViewChild,
  viewChild
} from '@angular/core';
import {NavigationEnd, Router, RouterLink} from '@angular/router';
import {SidebarComponent} from '../sidebar-component/sidebar-component';
import {ClickOutside} from '../../directives/click-outside';
import {filter} from 'rxjs';

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
export class HeaderComponent {

  router = inject(Router)
  isSidenavOpen = signal<boolean>(false);


  routerEffect = effect( () => {
    this.router.events.pipe(
      filter( (event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe( () => {
      if(this.isSidenavOpen()){
        this.closeSidebar()
      }
    })
  })


  openSidebar(): void {
    this.isSidenavOpen.set(true);

  }

  closeSidebar(){
    this.isSidenavOpen.set(false);
  }


}
