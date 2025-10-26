import {ChangeDetectionStrategy, Component, inject, signal, WritableSignal} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ProductService} from '../../services/product-service';
import {Subscription} from 'rxjs';
import {ProductStatus} from '../../interfaces/productStatus';
import {Product} from '../../interfaces/product';

@Component({
  selector: 'app-product-form-component',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './product-form-component.html',
  styleUrl: './product-form-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFormComponent {
  showSuccessMessage: WritableSignal<boolean> = signal<boolean>(false);
  showErrorMessage: WritableSignal<boolean> = signal<boolean>(false);
  formBuilder: FormBuilder = inject(FormBuilder);
  productService: ProductService = inject(ProductService);
  products: WritableSignal<Product[]> = signal<Product[]>([]);

  productForm = this.formBuilder.group(
    {
      name: this.formBuilder.nonNullable.control('',
        [Validators.required, Validators.minLength(3), Validators.maxLength(50)])
    }
  );

  constructor() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe((prodArr: Product[]) => this.products.set(prodArr));
  }

  submit(): Subscription {
    const formInfo = this.productForm.value;
    const product = {
      name: formInfo.name,
      status: ProductStatus.Enabled
    };

    return this.productService.addProduct(product).subscribe(
      {
        next: () => {
          this.showSuccessMessage.set(true);
          this.productForm.markAsPristine();
          this.productForm.reset();
        },
        error: () => {
          this.showErrorMessage.set(true);
          alert("No se pudo completar la carga del producto");
        }
      }
    );
  }
}
