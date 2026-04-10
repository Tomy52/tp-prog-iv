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

  getCategoryById(id:String)
  {
    return this.http.get<Category>(`${this.url}/${Number(id)}`)
  }

  addCategory(category: Partial<Category>)
  {
    return this.http.post<Category>(this.url,category);
  }

  removeCategory(id: Number)
  {
    return this.http.delete(`${this.url}/${id}`)
  }
}
