import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CreateProductSupplier} from '../interfaces/product-supplier/create-product-supplier';
import {Observable} from 'rxjs';
import {ResponseProductSupplier} from '../interfaces/product-supplier/response-product-supplier';
import {UpdateProductSupplier} from '../interfaces/product-supplier/update-product-supplier';
import {PriceBySupplierList} from '../interfaces/product-supplier/price-by-supplier-list';
import {PriceByProductList} from '../interfaces/product-supplier/price-by-product-list';

@Injectable({
  providedIn: 'root'
})
export class ProductSupplierService {

  http = inject(HttpClient);
  url = "api/productSupplier";

  createProductSupplier(data: CreateProductSupplier):Observable<ResponseProductSupplier>{
    return this.http.post<ResponseProductSupplier>(this.url, data);
  }

  getProductSupplierById(id: string){
    return this.http.get<ResponseProductSupplier>(`${this.url}/${id}`);
  }

  updateProductSupplier(id: number, productSupplier: UpdateProductSupplier){
    return this.http.patch<ResponseProductSupplier>(`${this.url}/${id}`, productSupplier);
  }

  deleteProductSupplier(id: number){
    return this.http.delete(`${this.url}/${id}`);
  }

  getAllProductBySupplier(id:number, page:number, size:number){
    return this.http.get<PriceBySupplierList>(`${this.url}/filter/${id}?page=${page}&size=${size}`);
  }

  getPricesByProduct(id:number, page:number, size:number){
    return this.http.get<PriceByProductList>(`${this.url}/filter-product/${id}?page=${page}&size=${size}`);
  }

}
