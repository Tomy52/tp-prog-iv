import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Supplier } from '../interfaces/supplier/supplier';
import {catchError, map, Observable, of, tap} from 'rxjs';
import {PageResponse} from '../interfaces/other/page-response';
import { SupplierSearchData } from '../interfaces/component-logic/supplier-search-data';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  http = inject(HttpClient);
  url = "api/suppliers";


  addSupplier(supplier:Partial<Supplier>) { // for adding...
    return this.http.post<Supplier>(this.url,supplier);
  }

  getSupplier(id:number) { // for modifying...
    return this.http.get<Supplier>(this.url + `/${id}`);
  }

  getAllSuppliersAsList()
  {
    return this.http.get<Supplier[]>(this.url);
  }



  getSuppliersPage(page?:number, size?:number, query?:SupplierSearchData) // works badly when trying to search by name, keep as backup
  {

    let query_string = '?'

    if(page)
    {
      query_string += `&page=${page}`
    }

    if(size)
    {
      query_string += `&size=${size}`
    }

    if(query?.name)
    {
      query_string += `&name=${query.name}`
    }

    return this.http.get<PageResponse<Supplier>>(`${this.url}/page${query_string}`);
  }

  updateSupplier(id:string, supplier:Partial<Supplier>) {
    return this.http.put<Supplier>(this.url + `/${Number(id)}`,supplier);
  }

  deleteSupplier(id:number) {
    return this.http.delete(this.url + `/${Number(id)}`);
  }
}
