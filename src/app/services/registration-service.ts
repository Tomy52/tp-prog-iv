import {inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {UserData} from '../interfaces/user/user-data';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  router = inject(Router);
  http = inject(HttpClient);
  base_url = "http://localhost:8080/users/register";

  sendData(data: Partial<UserData>) {
    return this.http.post<UserData>(this.base_url,data);
  }
}
