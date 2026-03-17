import { ChangeDetectionStrategy, Component, input, Input, signal, WritableSignal } from '@angular/core';
import { FailedProduct } from '../../../interfaces/csv-update/failed-product-resp';
import { FailedProductsResp } from '../../../interfaces/csv-update/failed-products-resp';

@Component({
  selector: 'app-failed-products-component',
  imports: [],
  templateUrl: './failed-products-component.html',
  styleUrl: './failed-products-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FailedProductsComponent {
  failed_product_resp = input.required<FailedProductsResp|null>();
  showing = signal<boolean>(false);


  changeShowing()
  {
    this.showing.update(() => !this.showing())
  }
}
