import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth-service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  const token = authService.getToken();
  const isExpired = authService.isTokenExpired();

  if (token && isExpired) {
    authService.logOut();
    alert("Sesion expirada");
  }

  return next(req);
};
