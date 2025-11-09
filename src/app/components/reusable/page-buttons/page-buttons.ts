import {Component, input, OnInit, output} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-page-buttons',
  imports: [
    FormsModule
  ],
  templateUrl: './page-buttons.html',
  styleUrl: './page-buttons.css'
})

export class PageButtons implements OnInit {
  next_button_text = input<string>('Siguiente');
  back_button_text = input<string>('Atras');

  back_active = input.required<boolean>();
  forward_active = input.required<boolean>();

  next_signal = output<void>();
  back_signal = output<void>();

  current_page = input.required<number>();
  max_page = input.required<number>();


  page_size_ops = input<number[]>([3,5,10]);


  selected_page_size?:string;
  size_changed = output<number>();

  ngOnInit(): void {
    this.selected_page_size = this.page_size_ops()[0].toString();
  }

  sendNextSignal()
  {
    this.next_signal.emit();
  }

  sendBackSignal()
  {
    this.back_signal.emit();
  }

  changeSize()
  {
    this.size_changed.emit(Number(this.selected_page_size));
  }
}
