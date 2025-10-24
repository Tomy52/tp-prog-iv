import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';

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
    formBuilder = inject(FormBuilder);

    productForm = this.formBuilder.group(
      {
        name: this.formBuilder.control('',
          [Validators.required,Validators.minLength(3),Validators.maxLength(50)])
      }
    )
}
