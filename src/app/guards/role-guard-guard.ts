import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { inject } from '@angular/core';
import { UserHierarchy } from '../services/user-hierarchy';

export const roleGuardGuard: CanActivateFn = (route, state) => {
  let roles = route.data['allowedUsers'] as Array<string>;
  let applyHierarchy = route.data['applyHierarchy'] as boolean;

  if(applyHierarchy == undefined) applyHierarchy = true;

  const auth_service = inject(AuthService);
  const hierarchy_service = inject(UserHierarchy)
  const router = inject(Router);

  const role_string = auth_service.getRole();


  if(applyHierarchy && typeof(roles) == "string")
  {
    console.log("checking with function")
    const user_hierarchy = hierarchy_service.getHierarchyRoles()
    return user_hierarchy.includes(roles) ? true : new RedirectCommand(router.parseUrl('main-menu'))
  }

  console.log("checking without function")
  return roles.includes(role_string) ? true : new RedirectCommand(router.parseUrl('main-menu'));
};
