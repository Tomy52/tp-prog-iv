import {ChangeDetectionStrategy, Component, inject, signal, WritableSignal} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ProductService} from '../../../../services/product-service';
import {Product} from '../../../../interfaces/product';
import {Subscription} from 'rxjs';
import {ProductDropdownSelect} from '../../../reusable/product-dropdown-select/product-dropdown-select';

@Component({
  selector: 'app-delete-product-form-component',
  imports: [
    ReactiveFormsModule,
    ProductDropdownSelect
  ],
  templateUrl: './delete-product-form-component.html',
  styleUrl: './delete-product-form-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteProductFormComponent {
  formBuilder: FormBuilder = inject(FormBuilder);
  productService: ProductService = inject(ProductService);
  products: WritableSignal<Product[]> = signal<Product[]>([]);
  success: WritableSignal<boolean|null> = signal<boolean|null>(null);

  constructor() {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getEnabledProducts().subscribe(
      {
        next: (prodArr: Product[]) => this.products.set(prodArr),
        error: (err) => {
          this.products.set([]);
          alert(`${err.error}`);
        }
      }
    );
  }

  deleteProductForm = this.formBuilder.group(
    {
      product: this.formBuilder.control<number | null>(null)
    }
  );


  deleteProduct(): Subscription | void {
    const formInfo = this.deleteProductForm.value;
    const idProduct = formInfo.product;

    // para que no se queje
    if (!idProduct) {
      return;
    }

    const ok = confirm(`¿Está seguro de eliminar el producto?`);

    if (ok) {
      return this.productService.deleteProduct(idProduct).subscribe(
        {
          next: () => {
            this.success.set(true);
            this.deleteProductForm.markAsPristine();
            this.deleteProductForm.reset();
            this.getProducts();
          },
          error: (err) => {
            this.success.set(false);
            alert("No se pudo completar la baja del producto");
            console.error(`Hubo un error en el borrado: ${err.error}`);
          }
        }
      );
    }
  }

  formIsInvalid(): boolean {
    const product = this.deleteProductForm.value.product!;
    return product === null || isNaN(product);
  }
}
