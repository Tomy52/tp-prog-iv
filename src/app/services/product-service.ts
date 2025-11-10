import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Product} from '../interfaces/product';
import {ProductStatus} from '../interfaces/productStatus';
import {PageResponse} from '../interfaces/other/page-response';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  http: HttpClient = inject(HttpClient);
  baseUrl: string = "api/products";

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}`);
  }

  getActiveProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/active-list`);
  }

  getEnabledProducts() {
    return this.getProducts().pipe(
      map((products) => products.filter((product) => product.status === ProductStatus.Enabled)
      ));
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  getFilteredAndMakeFilteredPage(page:number, size:number, name:string) : Observable<PageResponse<Product>>
  {
    const offset:number = page*size;

    return this.http.get<Product[]>(this.baseUrl).pipe(
      map((products) => products.filter((prod) => prod.name.toLowerCase().includes(name.toLowerCase()))),
      map((products) => {
        const element_count = products.length;
        const total_pages = Math.ceil(element_count / size);
        const number = page;
        const content = products.slice(offset,offset+size);
        const first = page == 0;
        const last = (total_pages - 1) == page;

        const page_info: PageResponse<Product> = {
          content:content,
          number:number + 1,
          totalElements:element_count,
          totalPages:total_pages,
          first:first,
          last:last
        };
        return page_info;
      })
    );
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
