import {ChangeDetectionStrategy, Component, inject, signal, WritableSignal} from '@angular/core';
import {Product} from '../../interfaces/product';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ProductService} from '../../services/product-service';
import {ProductStatus} from '../../interfaces/productStatus';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-update-product-form-component',
  imports: [ReactiveFormsModule],
  templateUrl: './update-product-form-component.html',
  styleUrl: './update-product-form-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateProductFormComponent {
  formBuilder: FormBuilder = inject(FormBuilder);
  productService: ProductService = inject(ProductService);
  products: WritableSignal<Product[]> = signal<Product[]>([]);
  success: WritableSignal<boolean|null> = signal<boolean|null>(null);
  productStatusEnum = ProductStatus;

  constructor() {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe((prodArr: Product[]) => this.products.set(prodArr));
  }

  updateProductForm = this.formBuilder.group({
    product: this.formBuilder.control<Product | null>(null),
    name: this.formBuilder.nonNullable.control({value: '', disabled: true},
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    status: this.formBuilder.nonNullable.control({value: ProductStatus.Enabled, disabled: true})
  });

  // para desbloquear los campos cuando se selecciona un producto
  onProductSelect(): void {
    const selectedProduct = this.updateProductForm.get('product')?.value;

    if (selectedProduct) {
      this.updateProductForm.get('name')?.enable();
      this.updateProductForm.get('status')?.enable();
      this.updateProductForm.get('name')?.patchValue(selectedProduct.name);
      this.updateProductForm.get('status')?.patchValue(selectedProduct.status);
    } else {
      this.updateProductForm.get('name')?.disable();
      this.updateProductForm.get('status')?.disable();
    }
  }

  submit(): Subscription | void {
    const formInfo = this.updateProductForm.value;
    const idProduct = formInfo.product?.idProduct;

    if (!idProduct) {
      return;
    }

    const updatedProduct = {
      idProduct: idProduct,
      name: formInfo.name,
      status: formInfo.status
    };

    return this.productService.modifyProduct(updatedProduct).subscribe({
      next: () => {
        this.success.set(true);
        this.updateProductForm.markAsPristine();
        this.updateProductForm.reset();
        //aca se bloquean de vuelta
        this.updateProductForm.get('name')?.disable();
        this.updateProductForm.get('status')?.disable();
        this.getProducts();
      },
      error: (err) => {
        this.success.set(false);
        alert("No se pudo completar la modificación del producto");
        console.error(`Hubo un error en la modificación: ${err.error}`);
      }
    });
  }

  formIsNull(): boolean {
    return this.updateProductForm.get('product')?.value === null;
  }
}
