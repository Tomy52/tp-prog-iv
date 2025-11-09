import {Component, ElementRef, inject, input, OnDestroy, OnInit} from '@angular/core';
import {ModalService} from '../../../services/modal-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-modal-alert',
  imports: [],
  templateUrl: './modal-alert.html',
  styleUrl: './modal-alert.css'
})
export class ModalAlert implements OnInit, OnDestroy{
  id = input.required<string>();
  isOpen = false;
  outside_clickable = input<boolean>(true);
  private element: any;

  constructor(private modalService: ModalService, private el: ElementRef) {
    this.element = el.nativeElement;
  }

  router = inject(Router);



  ngOnInit() {
    // add self (this modal instance) to the modal service so it can be opened from any component
    this.modalService.add(this);
    this.element.style.display = 'none';

    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    //document.body.appendChild(this.element);

    // close modal on background click
    this.element.addEventListener('click', (el: any) => {
      if (el.target.className === 'jw-modal' && this.outside_clickable()) {
        this.close();
      }
    });
  }

  ngOnDestroy() {
    // remove self from modal service
    this.modalService.remove(this);

    // remove modal element from html
    this.element.remove();
  }

  open() {
    this.element.style.display = 'block';
    document.body.classList.add('jw-modal-open');
    this.isOpen = true;
  }

  close() {
    this.element.style.display = 'none';
    document.body.classList.remove('jw-modal-open');
    this.isOpen = false;
  }

  redirect(path: any[])
  {
    if(path.length != 0)
    {
      this.close();
      this.router.navigate(path);
    } else {
      console.error('No redirect mentioned...');
    }
  }

}
