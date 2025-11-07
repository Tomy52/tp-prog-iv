import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Supplier } from '../interfaces/supplier/supplier';
import {map, Observable, of, tap} from 'rxjs';
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
  
  getFilteredAndMakeFilteredPage(page:number, size:number, name:string) : Observable<SuppliersPageResponse>
  {
    let offset = page*size;

    return this.http.get<Supplier[]>(this.url).pipe(
      map((sups) => sups.filter((sup) => sup.companyName.includes(name))),
      map((sups) => {
        let element_count = sups.length;
        let total_pages = Math.ceil(element_count / size);
        let number = page;
        let content = sups.slice(offset,offset+size)
        let first = page == 0 ? true : false;
        let last = (total_pages -1) == page ? true : false;

        let page_info: SuppliersPageResponse = {
          content:content,
          number:number,
          totalElements:element_count,
          totalPages:total_pages,
          first:first,
          last:last  
        }
        return page_info;
      })
    )
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
