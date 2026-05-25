import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DolarPrice } from '../interfaces/component-logic/dolar-price';

@Injectable({
  providedIn: 'root',
})
export class DolarService {
  http = inject(HttpClient)
  url = "api/misc/dollar"

  getDolarInfoFromBackend(exchange_rate?:string)
  {
    if(!exchange_rate) exchange_rate = "oficial"
    return this.http.get<DolarPrice>(`${this.url}?exchange_rate=${exchange_rate}`)
  }
}
