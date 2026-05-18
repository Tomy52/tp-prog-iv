import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root',
})
export class UserHierarchy {
  auth_service = inject(AuthService);
  roles = ["ROLE_CUSTOMER","ROLE_EMPLOYEE","ROLE_MANAGER","ROLE_ADMIN"]



}
