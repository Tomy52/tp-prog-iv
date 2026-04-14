import {Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {HeaderComponent} from './components/header-component/header-component';
import {FooterComponent} from './components/footer-component/footer-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  router: Router = inject(Router);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  showHeader: boolean = false;
  showFooter: boolean = false;

  protected readonly title = signal('tp-prog-iv');

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const childRoute = this.activatedRoute.firstChild;
          this.showHeader = childRoute!.snapshot.data['showHeader'] !== false;
          this.showFooter = childRoute!.snapshot.data['showFooter'] !== false;
      }
    });
  }
}
