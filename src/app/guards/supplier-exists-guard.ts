import {CanActivateFn, RedirectCommand, Router} from '@angular/router';
import {inject} from '@angular/core';
import {SupplierService} from '../services/supplier-service';
import {catchError, map, of} from 'rxjs';

export const supplierExistsGuard: CanActivateFn = (route, state) => {
  const supplier_service = inject(SupplierService);
  const router = inject(Router);
  const id = Number(route.paramMap.get('id'));



  return supplier_service.getSupplier(id).pipe(
    map(() => {
      return true;
    }),
    catchError(() => of(new RedirectCommand(router.parseUrl('main-menu'))))
  );
};
