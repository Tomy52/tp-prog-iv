import {ChangeDetectionStrategy, Component, inject, signal, WritableSignal} from '@angular/core';
import {Product} from '../../interfaces/product';
import {FormBuilder} from '@angular/forms';
import {ProductService} from '../../services/product-service';

@Component({
  selector: 'app-update-product-form-component',
  imports: [],
  templateUrl: './update-product-form-component.html',
  styleUrl: './update-product-form-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateProductFormComponent {
  formBuilder: FormBuilder = inject(FormBuilder);
  productService: ProductService = inject(ProductService);
  products: WritableSignal<Product[]> = signal<Product[]>([]);

  constructor() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe((prodArr: Product[]) => this.products.set(prodArr));
  }
}
