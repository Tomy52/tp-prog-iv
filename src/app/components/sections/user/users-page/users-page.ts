import {ChangeDetectionStrategy, Component, inject, OnInit, signal} from '@angular/core';
import {UserService} from '../../../../services/user-service';
import {UserInfo} from '../../../../interfaces/user/user-info';
import {UsersTable} from '../users-table/users-table';

@Component({
  selector: 'app-users-page',
  imports: [
    UsersTable
  ],
  templateUrl: './users-page.html',
  styleUrl: './users-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersPage implements OnInit {
  userService = inject(UserService);
  users = signal<UserInfo[]>([]);

  ngOnInit() {
    this.userService.getUsers().subscribe(
      {
        next: (response) => this.users.set(response),
        error: (err) => {
          throw err;
        }
      }
    );
  }
}
