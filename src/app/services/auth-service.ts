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
          },
          error: (err) => {
            alert(err.status + " - " + err.error);
          } // must define and error handler
        }
      )
    );
  }

  logOut(): void {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }


  private _decodeToken() {
    const token = this.getToken();
    let decodedPayload;

    if (token) {
      const payload = token.split(".")[1];
      decodedPayload = JSON.parse(atob(payload));
    }

    return decodedPayload;
  }


  isTokenExpired(): boolean {
    const tokenData = this._decodeToken();
    let respose = false;

    if (tokenData) {
      const exp = tokenData.exp;
      const expirationTime = new Date(exp * 1000);
      const currentTime = new Date();

      respose = expirationTime <= currentTime;
    }

    return respose;
  }

  getRole(): string {
    const tokenData = this._decodeToken();
    let role = "";

    if (tokenData) {
      role = tokenData.roles[0].authority;
    }

    return role;
  }

}
