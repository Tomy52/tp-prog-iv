import { ChangeDetectionStrategy, Component, inject, output, signal, WritableSignal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SearchBar } from "../search-bar/search-bar";
import { CategoryDropdownSelect } from "../category-dropdown-select/category-dropdown-select";
import { CategoryService } from '../../../services/category-service';
import { Category } from '../../../interfaces/category';
import { ProductStatus } from '../../../interfaces/productStatus';
import { ProductSearchBarData } from '../../../interfaces/component-logic/product-search-bar-data';

@Component({
  selector: 'app-product-search-bar',
  imports: [ReactiveFormsModule, SearchBar, CategoryDropdownSelect],
  templateUrl: './product-search-bar.html',
  styleUrl: './product-search-bar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductSearchBar {
  query_sig = output<Object>()
  form_builder = inject(FormBuilder)

  category_service = inject(CategoryService)
  categories: WritableSignal<Category[]> = signal<Category[]>([]);


  constructor()
  {
    this.getAllData()
  }

  getCategories()
  {
    this.category_service.getAllCategoriesAsAList().subscribe({
      next: (cats) => {
        this.categories.set(cats)
      }
    })
  }

  getAllData()
  {
    this.getCategories()
  }

  form = this.form_builder.group({
    search_term: [''],
    category_id: [null],
    product_id: [0],
    status: [null]
  })

  completeForm()
  {
    const form_value = this.form.value
    const values:ProductSearchBarData = {
      search_query: form_value.search_term!,
      category: form_value.category_id!,
      product_id: form_value.product_id!,
      state: form_value.status!
    }

    this.query_sig.emit(values)
  }

  reset()
  {
    this.form.reset();
    this.completeForm();
  }


  protected readonly productStatusEnum = ProductStatus;
}
