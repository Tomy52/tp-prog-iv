import {ChangeDetectionStrategy, Component, inject, OnInit, signal} from '@angular/core';
import {DollarService} from '../../../services/dollar-service';
import {DollarResponse} from '../../../interfaces/other/dollar-response';
import {TooltipDirective} from '../../../directives/app-tooltip';

@Component({
  selector: 'app-dollar-text',
  imports: [
    TooltipDirective
  ],
  templateUrl: './dollar-text.html',
  styleUrl: './dollar-text.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DollarText implements OnInit {
  dollarService = inject(DollarService);
  dollarInfo = signal<DollarResponse | undefined>(undefined);
  lastUpdate = signal<Date|undefined>(undefined);

  ngOnInit() {
    this.getDollarPrice();
  }

  getDollarPrice() {
    this.dollarService.getDollarPrice().subscribe((dollarObj) => {
      this.dollarInfo.set(dollarObj);
      this.lastUpdate.set(new Date(this.dollarInfo()!.ultima_actualizacion));
    });
  }

  displayDollarInfo() {
    const lastUpdate = new Date(this.dollarInfo()!.ultima_actualizacion);
    alert(`
    moneda: ${this.dollarInfo()?.moneda}
    cotizacion: ${this.dollarInfo()?.nombre}
    casa: ${this.dollarInfo()?.casa}
    venta: ${this.dollarInfo()?.venta}
    compra: ${this.dollarInfo()?.compra}
    ultima actualizacion: ${lastUpdate.toLocaleString()}
    `);
  }
}
