import {Component, inject, signal, WritableSignal} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {ProductService} from '../../services/product-service';
import {Product} from '../../interfaces/product';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-delete-product-form-component',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './delete-product-form-component.html',
  styleUrl: './delete-product-form-component.css'
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
    this.productService.getProducts().subscribe(
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
      // necesario para que tome el formato del producto y así poder sacar el valor del atributo idProduct
      product: this.formBuilder.control<Product | null>(null)
    }
  );


  deleteProduct(): Subscription | void {
    const formInfo = this.deleteProductForm.value;
    const idProduct = formInfo.product?.idProduct;

    // para que no se queje
    if (!idProduct) {
      return;
    }

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

  formIsNull(): boolean {
    return this.deleteProductForm.value.product === null;
  }
}
