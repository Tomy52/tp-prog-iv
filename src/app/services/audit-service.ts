import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuditLog} from '../interfaces/audit/audit-log';
import {Observable} from 'rxjs';
import {PageResponse} from '../interfaces/other/page-response';
import {AuditDetailLog} from '../interfaces/audit/audit-detail-log';

@Injectable({
  providedIn: 'root',
})
export class AuditService {
  baseUrl:string = "api/audit";
  http = inject(HttpClient);

  getAuditLogs(page?:number, size?:number, sort?: string, category?: string, type?:string): Observable<PageResponse<AuditLog>> {
    let query_string = "?";

    if (page) {
      query_string += `&page=${page}`;
    }

    if (size) {
      query_string += `&size=${size}`;
    }

    if (sort) {
      query_string += `&sort=${sort}`;
    }

    if (category) {
      query_string += `&category=${category}`;
    }

    if (type !== undefined && type !== null && type !== '') {
      query_string += `&type=${type}`;
    }

    return this.http.get<PageResponse<AuditLog>>(`${this.baseUrl}/logs${query_string}`);
  }

  getAuditDetail(category: string, revId: string): Observable<AuditDetailLog> {
    return this.http.get<AuditDetailLog>(`${this.baseUrl}/detail/${category}/${revId}`);
  }
}
