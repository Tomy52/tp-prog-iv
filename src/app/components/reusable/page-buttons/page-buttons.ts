import {Component, input, output} from '@angular/core';

@Component({
  selector: 'app-page-buttons',
  imports: [],
  templateUrl: './page-buttons.html',
  styleUrl: './page-buttons.css'
})

export class PageButtons {
  next_button_text = input<string>('Siguiente');
  back_button_text = input<string>('Atras');

  next_signal = output<void>();
  back_signal = output<void>();


  sendNextSignal()
  {
    this.next_signal.emit();
  }

  sendBackSignal()
  {
    this.back_signal.emit();
  }
}
