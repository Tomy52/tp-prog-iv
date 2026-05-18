import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { inject } from '@angular/core';

export const roleGuardGuard: CanActivateFn = (route, state) => {
  const roles = route.data['allowedUsers'] as Array<string>;
  const auth_service = inject(AuthService);
  const router = inject(Router);

  const role_string = auth_service.getRole();

  return roles.includes(role_string) ? true : new RedirectCommand(router.parseUrl('main-menu'));
};
