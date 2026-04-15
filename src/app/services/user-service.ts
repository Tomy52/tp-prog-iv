import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserInfo} from '../interfaces/user/user-info';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);
  base_url = "api/users";

  public getUsers(): Observable<UserInfo[]> {
    return this.http.get<UserInfo[]>(`${this.base_url}/list`);
  }

  public getUserById(id: string): Observable<UserInfo> {
    return this.http.get<UserInfo>(`${this.base_url}/${id}`);
  }
}
