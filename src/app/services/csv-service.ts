import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CsvUpload } from '../interfaces/csv-update/csv-upload';

@Injectable({
  providedIn: 'root'
})
export class CsvService {
  http = inject(HttpClient)
  url = "api/productSupplier"


  updatePricesOfProductsByCsv(update:CsvUpload) {
    return this.http.post<String>(`${this.url}/upload`, update)
  }
}
