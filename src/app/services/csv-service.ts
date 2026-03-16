import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CsvUpdate } from '../interfaces/csv-update/csv-update';

@Injectable({
  providedIn: 'root'
})
export class CsvService {
  http = inject(HttpClient)
  url = "api/productSupplier"


  updatePricesOfProductsByCsv(update:CsvUpdate) {
    return this.http.post<String>(`${this.url}/upload`, update)
  }
}
