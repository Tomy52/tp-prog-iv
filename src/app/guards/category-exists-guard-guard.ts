import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { CategoryService } from '../services/category-service';
import { catchError, map, of } from 'rxjs';

export const categoryExistsGuardGuard: CanActivateFn = (route, state) => {
  const product_supplier_service = inject(CategoryService);
  const router = inject(Router);
  const id = route.paramMap.get('id');



  return product_supplier_service.getCategoryById(id!).pipe(
    map(() => {
      return true;
    }),
    catchError(() => of(new RedirectCommand(router.parseUrl('main-menu'))))
  );
};
