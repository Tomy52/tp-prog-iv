import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FailedProductsResp } from '../interfaces/csv-update/failed-products-resp';
import { CsvUpdate } from '../interfaces/csv-update/csv-update';


@Injectable({
  providedIn: 'root'
})
export class CsvService {
  http = inject(HttpClient)
  url = "api/productSupplier"


  changeProductsUsingCsv(CsvUpdateReq : CsvUpdate) {
    const formData: FormData = new FormData();
    formData.append('file', CsvUpdateReq.file);
    formData.append('idSupplier', CsvUpdateReq.id.toString())
    formData.append('mode', CsvUpdateReq.mode)

    return this.http.post<FailedProductsResp>(`${this.url}/upload`, formData)
  }

  addPricesOfProductsByCsv(supplierId: number, file:File, profit_margin:number)
  {
    const formData: FormData = new FormData();
    formData.append('file', file)
    formData.append('bulkProfitMargin', profit_margin.toString())
    formData.append('idSupplier', supplierId.toString())

    return this.http.post<FailedProductsResp>(`${this.url}/uploadNonRelatedProducts`,formData)
  }
}
