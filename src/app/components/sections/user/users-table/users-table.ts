import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {UserInfo} from '../../../../interfaces/user/user-info';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-users-table',
  imports: [
    RouterLink
  ],
  templateUrl: './users-table.html',
  styleUrl: './users-table.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersTable {
  users = input<UserInfo[]>();
}
