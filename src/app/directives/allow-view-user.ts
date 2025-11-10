import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../services/auth-service';

@Directive({
  selector: '[appAllowViewUser]'
})
export class AllowViewUser {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService) {}

  @Input() set appAllowViewUser(role: string[]) {
    const userRoles = this.authService.getRole();
    if (role.includes(userRoles)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

}
