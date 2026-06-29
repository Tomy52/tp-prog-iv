import { ChangeDetectionStrategy, Component, inject, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MainMenuButton } from "../../main-menu/main-menu-button/main-menu-button";

@Component({
  selector: 'app-customer-menu',
  imports: [MainMenuButton],
  templateUrl: './customer-menu.html',
  styleUrls: ['../main-menu-shared-styles/menu-styles.css','./customer-menu.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CustomerMenu implements OnInit, OnDestroy {

  currentSlide: number = 0;
  totalSlides: number = 4; 
  private intervalId: any;

  
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    
    this.iniciarAutoplay();
  }

  ngOnDestroy(): void {
    
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  slideSiguiente(): void {
    if (this.currentSlide < this.totalSlides - 1) {
      this.currentSlide++;
    } else {
      this.currentSlide = 0; 
    }
    this.reiniciarAutoplay();
  }

  slideAnterior(): void {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    } else {
      this.currentSlide = this.totalSlides - 1; 
    }
    this.reiniciarAutoplay();
  }

 
  irAlSlide(indice: number): void {
    this.currentSlide = indice;
    this.reiniciarAutoplay();
  }

premioAbierto: boolean = false;


private iniciarAutoplay(): void {
  this.intervalId = setInterval(() => {
  
    if (this.premioAbierto) return; 

    if (this.currentSlide < this.totalSlides - 1) {
      this.currentSlide++;
    } else {
      this.currentSlide = 0;
    }
    this.cdr.markForCheck(); 
  }, 5000); 
}


revelarPremio(): void {
  this.premioAbierto = true;
  this.cdr.markForCheck(); 
}


cerrarBox(event: Event): void {
  event.stopPropagation(); 
  this.premioAbierto = false;
  this.reiniciarAutoplay();
  this.cdr.markForCheck();
}

  private reiniciarAutoplay(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.iniciarAutoplay();
    }
  }
}
