import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Supplier } from '../interfaces/supplier/supplier';
import {Observable, tap} from 'rxjs';
import {SuppliersPageResponse} from '../interfaces/other/suppliers-page-response';

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
  
  getFilteredAndMakeFilteredPage(page:number, size:number, name:string)
  {
    console.log("im working")

    /*this.http.get<Supplier[]>(this.url).pipe(
      tap((result) => resu),
      tap(() => console.log(result_count))
    )*/
  }

  getSuppliersPage(page:number, size:number) // works badly when trying to search by name, keep as backup
  {
    return this.http.get<SuppliersPageResponse>(`${this.url}/page?page=${page}&size=${size}`);
  }

  getSuppliersByName(page:number, size:number, name:string) // works badly when trying to search by name, keep as backup
  {
    return this.http.get<SuppliersPageResponse>(`${this.url}/name/${name}?page=${page}&size=${size}`);
  }

  updateSupplier(id:string, supplier:Partial<Supplier>) {
    return this.http.put<Supplier>(this.url + `/${Number(id)}`,supplier);
  }

  deleteSupplier(id:number) {
    return this.http.delete(this.url + `/${Number(id)}`);
  }
}
