import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Supplier } from '../interfaces/supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  http = inject(HttpClient)
  url = "api/suppliers"


  addSupplier(supplier:Partial<Supplier>) { // for adding...
    return this.http.post(this.url,supplier)
  }

  getSupplier(id:number) { // for modifying...
    return this.http.get(this.url + `/${id}`)
  }

  updateSupplier(id:string, supplier:Partial<Supplier>) {
    return this.http.put(this.url + `/${Number(id)}`,supplier)
  }
}
