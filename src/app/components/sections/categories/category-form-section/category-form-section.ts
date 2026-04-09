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
export class CategoryFormSection implements OnInit {
  modal_service = inject(ModalService);
  category_service = inject(CategoryService)
  form_builder = inject(FormBuilder)

  id = input<string>();
  categoryObject?: Partial<Category>;

  form = this.form_builder.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]]
  })


  completeForm()
  {
    const formData = this.form.value

    const category: Partial<Category> = {
      name: formData.name!
    }

    if(this.id())
    {
      this.modifyCategory(category)
    } else {
      this.addCategory(category)
    }
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

  modifyCategory(category:Partial<Category>)
  {
    const ok_option = "Sí";
    const modal_promise = this.modal_service.showModal(ModalNotification, {
      title: "Quiere continuar?",
      options: [ok_option, 'No']
    })

    modal_promise?.subscribe((value) => {
      if(ok_option == value)
      {
        this.category_service.modifyCategory(Number(this.id()),category).subscribe({
          next: (result) => {
            this.modal_service.showModal(ModalNotification, {
              title: "Categoria modificada!"
            }, false)

            this.form.reset()
            this.form.markAsPristine()
          }
        })
      }
    })

  }

  isValid()
  {
    return this.form.valid
  }

  ngOnInit() {
    if (this.id()) {
      const id = this.id()!;
      this.category_service.getCategoryById(id).subscribe({
        next: (cat) => {
          this.categoryObject = cat
          this.form.setValue({
            name: this.categoryObject.name!
          })
        },
        error: () => console.error("El id no es válido")
      });
    }
  }


}
