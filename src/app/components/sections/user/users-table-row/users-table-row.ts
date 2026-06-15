import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { UserInfo } from '../../../../interfaces/user/user-info';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'tr[app-users-table-row]',
  imports: [RouterLink],
  templateUrl: './users-table-row.html',
  styleUrl: './users-table-row.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersTableRow {
  user = input.required<UserInfo>();
}
