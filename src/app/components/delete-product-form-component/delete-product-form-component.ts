import {ChangeDetectionStrategy, Component, inject, signal, WritableSignal} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ProductService} from '../../services/product-service';
import {Product} from '../../interfaces/product';

@Component({
  selector: 'app-delete-product-form-component',
  imports: [],
  templateUrl: './delete-product-form-component.html',
  styleUrl: './delete-product-form-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteProductFormComponent {
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
