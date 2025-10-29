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
  showSuccessMessage: WritableSignal<boolean> = signal<boolean>(false);
  showErrorMessage: WritableSignal<boolean> = signal<boolean>(false);
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
          this.showSuccessMessage.set(true);
          this.addProductForm.markAsPristine();
          this.addProductForm.reset();
        },
        error: () => {
          this.showErrorMessage.set(true);
          alert("No se pudo completar la carga del producto");
        }
      }
    );
  }
}
