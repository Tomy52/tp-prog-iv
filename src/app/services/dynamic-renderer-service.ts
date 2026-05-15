import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth-service';
import { CustomerMenu } from '../components/main-menus/customer-menu/customer-menu';
import { EmployeeMenu } from '../components/main-menus/employee-menu/employee-menu';
import { ManagerMenu } from '../components/main-menus/manager-menu/manager-menu';
import { AdminMenu } from '../components/main-menus/admin-menu/admin-menu';

@Injectable({
  providedIn: 'root',
})
export class DynamicRendererService {

  auth_service = inject(AuthService);

  selectMainMenu()
  {
    const role = this.auth_service.getRole()
    
    switch (role)
    {
      case 'ROLE_CUSTOMER':
        return CustomerMenu
      case 'ROLE_EMPLOYEE':
        return EmployeeMenu
      case 'ROLE_MANAGER':
        return ManagerMenu
      case 'ROLE_ADMIN':
        return AdminMenu
      default:
        return null;
    }
  }
}
