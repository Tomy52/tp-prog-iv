import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DolarService } from '../../../services/dolar-service';
import { DolarPrice } from '../../../interfaces/component-logic/dolar-price';

@Component({
  selector: 'app-dolar-info',
  imports: [],
  templateUrl: './dolar-info.html',
  styleUrl: './dolar-info.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DolarInfo {
  dolar_service = inject(DolarService)
  dolar_info = signal<DolarPrice|undefined>(undefined);
  searching = true;
  success = true;

  constructor()
  {
    this.dolar_service.getDolarInfoFromBackend().subscribe({
      next: (dolarPrice) => {
        this.dolar_info.set(dolarPrice)
      },
      error: () => {
        this.success = false;
      },
      complete: () => this.searching = false
    })
  }

}
