import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  url:string = "api/categories"
  http = inject(HttpClient)

  getAllCategoriesAsAList()
  {
    return this.http.get<Category[]>(this.url)
  }

  addCategory(category: Partial<Category>)
  {
    return this.http.post<Category>(this.url,category);
  }

  removeCategory(id: Number)
  {
    return this.http.delete(`${this.url}/${id}`)
  }

  modifyCategory(id: Number, category: Partial<Category>)
  {
    return this.http.put(`${this.url}/${id}`,category)
  }
}
