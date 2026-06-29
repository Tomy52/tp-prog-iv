import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {UserInfo} from '../../../../interfaces/user/user-info';
import { UsersTableRow } from "../users-table-row/users-table-row";

@Component({
  selector: 'app-users-table',
  imports: [
    UsersTableRow
],
  templateUrl: './users-table.html',
  styleUrl: './users-table.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersTable {
  users = input<UserInfo[]>();
}
