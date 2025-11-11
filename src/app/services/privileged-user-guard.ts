import {CanActivateFn, RedirectCommand, Router} from '@angular/router';
import {AuthService} from './auth-service';
import {inject} from '@angular/core';

export const privilegedUserGuard: CanActivateFn = (route, state) => {
  const auth_service = inject(AuthService);
  const router = inject(Router);

  const role_string = auth_service.getRole();


  // this is really bad, but it's the only way we can tell.
  return role_string === 'ROLE_EMPLOYEE' ? new RedirectCommand(router.parseUrl('main-menu')) : true;
};
