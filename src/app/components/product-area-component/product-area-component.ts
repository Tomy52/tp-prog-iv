import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ProductFormComponent} from '../product-form-component/product-form-component';

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
