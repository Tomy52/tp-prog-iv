import {ChangeDetectionStrategy, Component, inject, signal, WritableSignal} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ProductService} from '../../services/product-service';
import {Subscription} from 'rxjs';
import {ProductStatus} from '../../interfaces/productStatus';

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
  formBuilder: FormBuilder = inject(FormBuilder);
  productService: ProductService = inject(ProductService);

  productForm = this.formBuilder.group(
    {
      name: this.formBuilder.nonNullable.control('',
        [Validators.required, Validators.minLength(3), Validators.maxLength(50)])
    }
  )

  submit(): Subscription {
    const formInfo = this.productForm.value;
    const product = {
      name: formInfo.name,
      status: ProductStatus.Enabled
    }

    return this.productService.addProduct(product).subscribe(() => alert("Producto agregado exitosamente!"));
  }
}
