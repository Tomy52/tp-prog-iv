import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CreateProductSupplier} from '../interfaces/product-supplier/create-product-supplier';
import {Observable} from 'rxjs';
import {ResponseProductSupplier} from '../interfaces/product-supplier/response-product-supplier';
import {UpdateProductSupplier} from '../interfaces/product-supplier/update-product-supplier';

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

  updateProductSupplier(id: string, productSupplier: UpdateProductSupplier){
    return this.http.patch<ResponseProductSupplier>(`${this.url}/${id}`, productSupplier);
  }


}
