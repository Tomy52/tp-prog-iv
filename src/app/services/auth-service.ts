import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthRequest} from '../interfaces/user/auth-request';
import {Observable, tap} from 'rxjs';
import {AuthResponse} from '../interfaces/user/auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url:string = "http://localhost:8080/auth/";
  http = inject(HttpClient);

  login(request:AuthRequest):Observable<AuthResponse>{
    return this.http.post<AuthResponse>(this.url + "login", request).pipe(
      tap({
          next: response => {
            localStorage.setItem('token', response.token);
          } // must define and error handler
        }
      )
    );
  }

logOut(){
  localStorage.removeItem('token');
}

getToken():string | null {
  return localStorage.getItem('token');
}

isLoggedIn(){
  return this.getToken() !== null;
}

isTokenExpired(){
  const token = this.getToken();

  if (token){

    const payload= token.split(".")[1];
    const decodedPayload = JSON.parse( atob(payload));
    const exp = decodedPayload.exp;
    const expirationTime = new Date(exp * 1000);
    const currentTime = new Date();

    return expirationTime <= currentTime;

  } else {
    return new Error("Not logged in");
  }
}


}
