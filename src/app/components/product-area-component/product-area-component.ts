import {ChangeDetectionStrategy, Component, inject, signal, Signal, WritableSignal} from '@angular/core';
import {ProductFormComponent} from '../product-form-component/product-form-component';
import {ProductService} from '../../services/product-service';

@Component({
  selector: 'app-product-area-component',
  imports: [
    ProductFormComponent
  ],
  templateUrl: './product-area-component.html',
  styleUrl: './product-area-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductAreaComponent {
}
