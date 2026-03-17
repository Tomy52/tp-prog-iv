import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CsvService {
  http = inject(HttpClient)
  url = "api/productSupplier"


  updatePricesOfProductsByCsv(supplierId: number,file:File) {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('idSupplier', supplierId.toString())

    return this.http.post<String>(`${this.url}/upload`, formData)
  }

  addPricesOfProductsByCsv(supplierId: number, file:File, profit_margin:number)
  {
    const formData: FormData = new FormData();
    formData.append('file', file)
    formData.append('bulkProfitMargin', profit_margin.toString())
    formData.append('idSupplier', supplierId.toString())

    return this.http.post<String>(`${this.url}/uploadNonRelatedProducts`,formData)
  }
}
