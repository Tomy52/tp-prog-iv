import { ChangeDetectionStrategy, Component, inject, input, OnInit } from '@angular/core';
import { ModalService } from '../../../../services/modal-service';
import { CategoryService } from '../../../../services/category-service';
import { Category } from '../../../../interfaces/category';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-category-form-section',
  imports: [],
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

  ngOnInit() {
    if (this.id()) {
      const id = this.id()!;
      this.category_service.getCategoryById(id).subscribe({
        next: (cat) => this.categoryObject = cat,
        error: () => console.error("El id no es válido")
      });
    }
  }


}
