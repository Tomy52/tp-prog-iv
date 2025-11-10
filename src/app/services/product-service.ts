import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Product} from '../interfaces/product';
import {ProductStatus} from '../interfaces/productStatus';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  http: HttpClient = inject(HttpClient);
  base_url: string = "api/products";

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.base_url}`);
  }

  getEnabledProducts() {
    return this.getProducts().pipe(
      map((products) => products.filter((product) => product.status === ProductStatus.Enabled)
      ));
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.base_url}/${id}`);
  }

  addProduct(product: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(`${this.base_url}`,product);
  }

  modifyProduct(modifiedProduct: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${this.base_url}/${modifiedProduct.idProduct}`,modifiedProduct);
  }

  deleteProduct(idProduct: number): Observable<Object> {
    return this.http.delete(`${this.base_url}/${idProduct}`);
  }
}
