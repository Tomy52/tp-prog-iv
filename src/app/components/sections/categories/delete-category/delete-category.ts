import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalService } from '../../../../services/modal-service';
import { CategoryService } from '../../../../services/category-service';
import { ModalNotification } from '../../../reusable/modal-notification/modal-notification';
import { CategoryDropdownSelect } from "../../../reusable/category-dropdown-select/category-dropdown-select";
import { Category } from '../../../../interfaces/category';

@Component({
  selector: 'app-delete-category',
  imports: [ReactiveFormsModule, CategoryDropdownSelect],
  templateUrl: './delete-category.html',
  styleUrl: './delete-category.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteCategory {
  form_builder = inject(FormBuilder)
  modal_service = inject(ModalService)
  category_service = inject(CategoryService)

  categories: WritableSignal<Category[]> = signal<Category[]>([]);
  
  form = this.form_builder.group({
    category: [null, [Validators.required]]
  })

  constructor()
  {
    this.getCategories()
  }

  getCategories() {
    this.category_service.getAllCategoriesAsAList().subscribe({
      next: (cats) => {
        this.categories.set(cats);
      },

      error: (err) => {
        throw err
      }
    })
  }

  completeForm()
  {
    const ok_option = "Si"
    const category_id = this.form.value.category!
    console.log(category_id)

    const modal_promise = this.modal_service.showModal(ModalNotification, {
      title: "¿Realmente quiere eliminar esta categoria?",
      description: "Esta acción no se podrá deshacer.",
      options: [ok_option, "No"]
    })
    
    modal_promise?.subscribe((result) => {

      if(result == ok_option)
      {

        this.category_service.removeCategory(category_id).subscribe({
          next: (resp) => {
            this.modal_service.showModal(ModalNotification, {
              title: "Categoria eliminada exitosamente!"
            }, false)

            this.form.reset()
            this.getCategories()
          },

          error: (err) => {
            throw err
          }
        })
      }
    })
  }

  isValid()
  {
    return this.form.valid
  }
}
