import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { UserService } from '../services/user-service';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';

export const userExistsGuard: CanActivateFn = (route, state) => {
  const product_supplier_service = inject(UserService);
  const router = inject(Router);
  const id = route.paramMap.get('id');



  return product_supplier_service.getUserById(id!).pipe(
    map(() => {
      return true;
    }),
    catchError(() => of(new RedirectCommand(router.parseUrl('main-menu'))))
  );
};
