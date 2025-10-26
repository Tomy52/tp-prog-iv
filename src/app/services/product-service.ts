import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  http: HttpClient = inject(HttpClient);
  base_url: string = "api/products"

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.base_url}`);
  }

  addProduct(product: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(`${this.base_url}`,product);
  }

  modifyProduct(modifiedProduct: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${this.base_url}/${modifiedProduct.idProduct}`,modifiedProduct);
  }

  deleteProduct(product: Product): Observable<Object> {
    return this.http.delete(`${this.base_url}/${product.idProduct}`)
  }
}
