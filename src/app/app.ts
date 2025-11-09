import {Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {HeaderComponent} from './components/header-component/header-component';
import {FooterComponent} from './components/footer-component/footer-component';
import {ModalAlert} from './components/reusable/modal-alert/modal-alert';
import {ModalService} from './services/modal-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ModalAlert],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  router: Router = inject(Router);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  showHeader: boolean = false;
  showFooter: boolean = false;

  protected readonly title = signal('tp-prog-iv');
  modal_service = inject(ModalService);


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
