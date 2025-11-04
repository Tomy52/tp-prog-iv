import {ChangeDetectionStrategy, Component, inject, signal, WritableSignal} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ProductService} from '../../services/product-service';
import {Subscription} from 'rxjs';
import {ProductStatus} from '../../interfaces/productStatus';

@Component({
  selector: 'app-add-product-form-component',
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './add-product-form-component.html',
  styleUrl: './add-product-form-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddProductFormComponent {
  success: WritableSignal<boolean|null> = signal<boolean|null>(null);
  formBuilder: FormBuilder = inject(FormBuilder);
  productService: ProductService = inject(ProductService);

  addProductForm = this.formBuilder.group(
    {
      name: this.formBuilder.nonNullable.control('',
        [Validators.required, Validators.minLength(3), Validators.maxLength(50)])
    }
  );

  submit(): Subscription {
    const formInfo = this.addProductForm.value;
    const product = {
      name: formInfo.name,
      status: ProductStatus.Enabled
    };

    return this.productService.addProduct(product).subscribe(
      {
        next: () => {
          this.success.set(true);
          this.addProductForm.markAsPristine();
          this.addProductForm.reset();
        },
        error: (err) => {
          this.success.set(false);
          alert("No se pudo completar la carga del producto");
          console.error(`Hubo un error en la carga: ${err.error}`);
        }
      }
    );
  }


}
