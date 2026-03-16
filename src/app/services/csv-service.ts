import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CsvUpload } from '../interfaces/csv-update/csv-upload';

@Injectable({
  providedIn: 'root'
})
export class CsvService {
  http = inject(HttpClient)
  url = "api/productSupplier"


  updatePricesOfProductsByCsv(supplierId: number,file:File) {
    console.log(`${this.url}/upload`)
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('idSupplier', supplierId.toString())

    return this.http.post<String>(`${this.url}/upload`, formData)
  }
}
