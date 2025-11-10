import {ChangeDetectionStrategy, Component, effect, inject, input, output, signal, WritableSignal} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ProductService} from '../../../../services/product-service';
import {ProductStatus} from '../../../../interfaces/productStatus';
import {Product} from '../../../../interfaces/product';

@Component({
  selector: 'app-product-form-component',
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './product-form-component.html',
  styleUrl: './product-form-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFormComponent {
  success: WritableSignal<boolean|null> = signal<boolean|null>(null);
  formBuilder: FormBuilder = inject(FormBuilder);
  productService: ProductService = inject(ProductService);

  dataSig = output<Partial<Product>>();
  modifiedProduct = input<Partial<Product>>();

  productForm = this.formBuilder.group({
    name: this.formBuilder.nonNullable.control('',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    status: this.formBuilder.nonNullable.control(ProductStatus.Enabled)
  });

  constructor() {
    effect(() => {
      if (this.modifiedProduct()) {
        this.productForm.get('name')?.patchValue(this.modifiedProduct()?.name ?? '');
        this.productForm.get('status')?.patchValue(this.modifiedProduct()?.status ?? ProductStatus.Enabled);
      }
    });
  }

  submit() {
    const ok = confirm(`¿Está seguro de que desea continuar?`);

    if (ok) {
      if (this.modifiedProduct() == undefined) {
        this.addProduct();
      } else {
        this.updateProduct();
      }
    }

  }

  addProduct() {
    const formInfo = this.productForm.value;
    const product = {
      name: formInfo.name,
      status: ProductStatus.Enabled
    };

    return this.productService.addProduct(product).subscribe(
        {
          next: () => {
            this.success.set(true);
            this.productForm.markAsPristine();
            this.productForm.reset();
          },
          error: (err) => {
            this.success.set(false);
            alert("No se pudo completar la carga del producto");
            console.error(`Hubo un error en la carga: ${err.error}`);
          }
        }
    );
  }

  updateProduct() {
    const formInfo = this.productForm.value;
    const product = this.modifiedProduct();

    const updatedProduct = {
      idProduct: product?.idProduct,
      name: formInfo.name,
      status: formInfo.status
    };

    console.log(updatedProduct.status);

    return this.productService.modifyProduct(updatedProduct).subscribe({
      next: () => {
        this.success.set(true);
      },
      error: (err) => {
        this.success.set(false);
        alert("No se pudo completar la modificación del producto");
        console.error(`Hubo un error en la modificación: ${err.error}`);
      }
    });
  }


  protected readonly productStatusEnum = ProductStatus;
}
