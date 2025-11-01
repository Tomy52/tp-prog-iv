import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {AddProductFormComponent} from '../add-product-form-component/add-product-form-component';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {UpdateProductFormComponent} from '../update-product-form-component/update-product-form-component';
import {DeleteProductFormComponent} from '../delete-product-form-component/delete-product-form-component';

@Component({
  selector: 'app-product-area-component',
  imports: [
    AddProductFormComponent,
    ReactiveFormsModule,
    UpdateProductFormComponent,
    DeleteProductFormComponent
  ],
  templateUrl: './product-area-component.html',
  styleUrl: './product-area-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductAreaComponent {
  formBuilder = inject(FormBuilder);

  choiceForm = this.formBuilder.group(
    {
      choice: this.formBuilder.control('')
    }
  );
}
