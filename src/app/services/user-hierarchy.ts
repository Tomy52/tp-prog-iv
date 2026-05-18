import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root',
})
export class UserHierarchy {
  auth_service = inject(AuthService);
  roles = ["ROLE_CUSTOMER","ROLE_EMPLOYEE","ROLE_MANAGER","ROLE_ADMIN"]

  getHierarchyRoles()
  {
    const user_role = this.auth_service.getRole();
    const user_role_index = this.roles.indexOf(user_role)

    // this will give you the users role types according to the user's role
    const transformed_list = this.roles.slice(0,user_role_index + 1)

    return transformed_list;
  }

}
