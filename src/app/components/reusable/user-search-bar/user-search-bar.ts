import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-user-search-bar',
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './user-search-bar.html',
  styleUrl: './user-search-bar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSearchBar {
  submit() {
    alert("I'm a happy bear ฅʕ•̫͡•ʔฅ");
  }
}
