import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Product} from '../interfaces/product';
import {PageResponse} from '../interfaces/other/page-response';
import {ProductStatus} from '../interfaces/productStatus';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  http: HttpClient = inject(HttpClient);
  baseUrl: string = "api/products";

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}`);
  }

  getEnabledProducts(): Observable<Product[]> {
    return this.getProducts().pipe(
      map((products) => products.filter((product) => product.status === ProductStatus.Enabled)
      ));
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  getProductsPage(page?:number, size?:number, name?:string, showAll?:boolean, category?:number): Observable<PageResponse<Product>>
  {
    var status = showAll ? undefined : ProductStatus.Enabled

    var query_string = '?'

    if(page)
    {
      query_string += `&page=${page}`
    }

    if(size)
    {
      query_string += `&size=${size}`
    }

    if(name)
    {
      query_string += `&name=${name}`
    }

    if(category)
    {
      query_string += `&category=${category}`
    }

    if(status)
    {
      query_string += `&status=${status}`
    }

    console.log(query_string)

    return this.http.get<PageResponse<Product>>(`${this.baseUrl}/page${query_string}`)
  }


  addProduct(product: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}`,product);
  }

  modifyProduct(modifiedProduct: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${modifiedProduct.idProduct}`,modifiedProduct);
  }

  deleteProduct(idProduct: number): Observable<Object> {
    return this.http.delete(`${this.baseUrl}/${idProduct}`);
  }
}
