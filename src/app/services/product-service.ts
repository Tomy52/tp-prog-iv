import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Product} from '../interfaces/product';
import {PageResponse} from '../interfaces/other/page-response';
import {ProductStatus} from '../interfaces/productStatus';
import { ProductSearchBarData } from '../interfaces/component-logic/product-search-bar-data';

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

  getProductsPage(page?:number, size?:number, query?:ProductSearchBarData): Observable<PageResponse<Product>>
  {
    // var status = showAll ? undefined : ProductStatus.Enabled

    console.log(query)
    var query_string = '?'

    if(page)
    {
      query_string += `&page=${page}`
    }

    if(size)
    {
      query_string += `&size=${size}`
    }

    if(query?.search_query)
    {
      const name = query?.search_query
      query_string += `&page=${name}`
    }

    if(query?.category)
    {
      const category = query.category
      query_string += `&category=${category}`
    }

    if(query?.product_id)
    {
      const id = query.product_id
      query_string += `&id=${id}`
    }

    if(query?.state)
    {
      const state = query.state
      query_string += `&status=${state}`
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
