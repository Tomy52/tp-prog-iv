import {ChangeDetectionStrategy, Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {UserService} from '../../../../services/user-service';
import {UserInfo} from '../../../../interfaces/user/user-info';
import {UsersTable} from '../users-table/users-table';
import {UserSearchBar} from '../../../reusable/user-search-bar/user-search-bar';
import { UserData } from '../../../../interfaces/user/user-data';
import { PageResponse } from '../../../../interfaces/other/page-response';
import { UserSearchBarData } from '../../../../interfaces/component-logic/user-search-bar-data';
import { PageButtons } from "../../../reusable/page-buttons/page-buttons";

@Component({
  selector: 'app-users-page',
  imports: [
    UsersTable,
    UserSearchBar,
    PageButtons
],
  templateUrl: './users-page.html',
  styleUrl: './users-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersPage {
  userService = inject(UserService);
  page = signal<number>(0);

  page_size:number;
  page_size_ops:number[] = [2,5,10];

  page_data: WritableSignal<PageResponse<UserInfo> | null>;
  error_msg:string = '';

  searching:boolean = false;

  query:UserSearchBarData = {

  }

  constructor() {
    this.page_size = Number(localStorage.getItem('pageSize')) || this.page_size_ops[0];
    this.page_data = signal(null);
    this.getUsers(this.query);
  }

  getUsers(query:UserSearchBarData)
  {
    this.searching = true;
    this.userService.getUsers(query,this.page(),this.page_size).subscribe(
      {
        next: (response) => {
          this.page_data.set(response)
        },
        error: (err) => {
          throw err;
        },
        complete: () => {
          this.searching = false
        }
      }
    );
  }

  goForward() {
    this.page.update((number) => number + 1);
    this.getUsers(this.query);
  }

  goBack() {
    this.page.update((number) => number - 1);
    this.getUsers(this.query);
  }

  resetPageCount() {
    this.page.set(0);
  }


  changePageSize(size: number) {
    this.page_size = size;
    localStorage.setItem('pageSize',size.toString());
    this.resetPageCount();
    this.getUsers(this.query);
  }

  searchByTerms(terms:UserSearchBarData)
  {
    this.query = terms
    this.resetPageCount();
    this.getUsers(terms)
  }
}
