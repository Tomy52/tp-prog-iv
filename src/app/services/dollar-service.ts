import {inject, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DollarResponse} from '../interfaces/other/dollar-response';

@Injectable({
  providedIn: 'root'
})
export class DollarService {
  http = inject(HttpClient);
  baseUrl = "/api/misc/dollar";

  getDollarPrice(exchangeRate = 'oficial') {
    return this.http.get<DollarResponse>(this.baseUrl, {  params: {exchange_rate: exchangeRate},});
  }
}
