import {CanActivateFn, RedirectCommand, Router} from '@angular/router';
import {inject} from '@angular/core';
import {catchError, map, of} from 'rxjs';
import {ProductSupplierService} from '../services/product-supplier-service';

export const priceExistsGuard: CanActivateFn = (route, state) => {
  const product_supplier_service = inject(ProductSupplierService);
  const router = inject(Router);
  const id = route.paramMap.get('id');



  return product_supplier_service.getProductSupplierById(id!).pipe(
    map(() => {
      return true;
    }),
    catchError(() => of(new RedirectCommand(router.parseUrl('main-menu'))))
  );
};
