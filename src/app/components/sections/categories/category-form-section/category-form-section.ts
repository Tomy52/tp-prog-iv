import { ChangeDetectionStrategy, Component, inject, input, OnInit } from '@angular/core';
import { ModalService } from '../../../../services/modal-service';
import { CategoryService } from '../../../../services/category-service';
import { Category } from '../../../../interfaces/category';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FieldErrorBorder } from "../../../../directives/field-error-border";
import { FieldError } from "../../../../directives/field-error";
import { ModalNotification } from '../../../reusable/modal-notification/modal-notification';
@Component({
  selector: 'app-category-form-section',
  imports: [ReactiveFormsModule, FieldErrorBorder, FieldError],
  templateUrl: './category-form-section.html',
  styleUrl: './category-form-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryFormSection {
  modal_service = inject(ModalService);
  category_service = inject(CategoryService)
  form_builder = inject(FormBuilder)


  form = this.form_builder.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]]
  })


  completeForm()
  {
    const formData = this.form.value

    const category: Partial<Category> = {
      name: formData.name!
    }

    this.addCategory(category)
  }


  addCategory(category:Partial<Category>)
  {
    this.category_service.addCategory(category).subscribe({
      next: (suc) => {
        this.modal_service.showModal(ModalNotification, {
          title: "Categoria cargada!"
        }, false)

        this.form.reset()
        this.form.markAsPristine()
      },
      error: (err) => {
        throw err
      }
    })
  }


  isValid()
  {
    return this.form.valid
  }


}
