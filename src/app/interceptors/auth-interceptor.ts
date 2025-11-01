import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

    const authService: AuthService = inject(AuthService);
    const authToken: string | null = authService.getToken();

    if (authToken) {

      const authRequest = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + authToken),
      });


      return next(authRequest);
    }

  return next(req);
};

