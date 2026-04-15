import {ChangeDetectionStrategy, Component, effect, inject, input, signal} from '@angular/core';
import {UserService} from '../../../../services/user-service';
import {UserInfo} from '../../../../interfaces/user/user-info';

@Component({
  selector: 'app-users-detail',
  imports: [],
  templateUrl: './users-detail.html',
  styleUrl: './users-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersDetail {
  userService = inject(UserService);
  id = input.required<string>();
  user = signal<Partial<UserInfo >>({});

  constructor() {
    effect(() => {
      const userId = this.id();
      this.userService.getUserById(userId).subscribe((user) => this.user.set(user));
    });
  }
}
