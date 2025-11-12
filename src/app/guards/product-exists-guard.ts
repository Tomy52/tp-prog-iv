import {CanActivateFn, RedirectCommand, Router} from '@angular/router';
import {inject} from '@angular/core';
import {catchError, map, of} from 'rxjs';
import {ProductService} from '../services/product-service';

export const productExistsGuard: CanActivateFn = (route, state) => {
  const product_service = inject(ProductService);
  const router = inject(Router);
  const id = Number(route.paramMap.get('id'));



  return product_service.getProductById(id).pipe(
    map(() => {
      return true;
    }),
    catchError(() => of(new RedirectCommand(router.parseUrl('main-menu'))))
  );
};
