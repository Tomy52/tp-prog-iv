import { ChangeDetectionStrategy, Component, inject, output, Output, signal, WritableSignal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CategoryDropdownSelect } from "../category-dropdown-select/category-dropdown-select";
import { CategoryService } from '../../../services/category-service';
import { Category } from '../../../interfaces/category';
import { ClientProductSearchBarData } from '../../../interfaces/component-logic/client-product-search-bar-data';

@Component({
  selector: 'app-client-product-search-bar',
  imports: [CategoryDropdownSelect,ReactiveFormsModule],
  templateUrl: './client-product-search-bar.html',
  styleUrl: './client-product-search-bar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientProductSearchBar {
  form_builder = inject(FormBuilder)
  category_service = inject(CategoryService)

  categories: WritableSignal<Category[]> = signal([]);

  query_sig = output<Object>()

  constructor()
  {
    this.getAllData()
  }

  getAllData()
  {
    this.getCategories()
  }

  getCategories()
  {
    this.category_service.getAllCategoriesAsAList().subscribe({
      next: (resp) => {
        this.categories.set(resp);    
      },
      error: (err) => {
        this.categories.set([]);
      }
    })
  }


  form = this.form_builder.group({
    category_id: [null],
    tern: [''],
    include_oos: [false]
  })

  submit()
  {
    const values = this.form.value;

    const data:ClientProductSearchBarData = {
      name: values.tern!,
      categories: values.category_id!,
      include_oos: values.category_id!
    }

    this.query_sig.emit(data);
  }

  reset()
  {
    this.form.reset()
  }
}
