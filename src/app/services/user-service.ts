import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserInfo} from '../interfaces/user/user-info';
import { UserSearchBarData } from '../interfaces/component-logic/user-search-bar-data';
import { PageResponse } from '../interfaces/other/page-response';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);
  base_url = "api/users";

  public getUsers(query:UserSearchBarData, page?:number, size?:number): Observable<PageResponse<UserInfo>> {

    var query_string = "?"

    if(page)
    {
      query_string += `&page=${page}`
    }

    if(size)
    {
      query_string += `&size=${size}`
    }

    if(query.dni)
    {
      query_string += `&dni=${query.dni}`
    }

    if(query.role)
    {
      query_string += `&role=${query.role}`
    }

    if(query.status)
    {
      query_string += `&status=${query.status}`
    }

    return this.http.get<PageResponse<UserInfo>>(`${this.base_url}/page${query_string}`);
  }

  public getUserById(id: string): Observable<UserInfo> {
    return this.http.get<UserInfo>(`${this.base_url}/${id}`);
  }


  public modifyUser(user:Partial<UserInfo>, id:number)
  {
    return this.http.put<UserInfo>(`${this.base_url}/${id}`,user);
  }

  public changeUserState(state:object, id:string)
  {
    return this.http.patch(`${this.base_url}/${id}`, state)
  }

  public deleteUser(id:string, mode:string)
  {
    return this.http.delete(`${this.base_url}/${id}?deletionType=${mode}`)
  }

  public uploadUser(user:Partial<UserInfo>)
  {
    return this.http.post<UserInfo>(`${this.base_url}`,user)
  }
}
