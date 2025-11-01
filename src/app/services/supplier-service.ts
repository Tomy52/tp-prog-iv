import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Supplier } from '../interfaces/supplier/supplier';

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

  getSuppliersPage() // should be expanded upon when the time comes
  {
    return this.http.get(`this.url/page`);
  }

  updateSupplier(id:string, supplier:Partial<Supplier>) {
    return this.http.put<Supplier>(this.url + `/${Number(id)}`,supplier);
  }

  deleteSupplier(id:number) {
    return this.http.delete(this.url + `/${Number(id)}`);
  }
}
