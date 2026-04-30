import {ChangeDetectionStrategy, Component, effect, inject, input, signal} from '@angular/core';
import {UserService} from '../../../../services/user-service';
import {UserInfo} from '../../../../interfaces/user/user-info';
import {UserDetailCard} from '../../../reusable/user-detail-card/user-detail-card';
import { ModalService } from '../../../../services/modal-service';
import { ModalNotification } from '../../../reusable/modal-notification/modal-notification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-detail',
  imports: [
    UserDetailCard
  ],
  templateUrl: './users-detail.html',
  styleUrl: './users-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersDetail {
  userService = inject(UserService);
  modal_service = inject(ModalService)
  router = inject(Router)
  id = input.required<string>();
  user = signal<Partial<UserInfo >>({});

  constructor() {
    effect(() => {
      const userId = this.id();
      this.userService.getUserById(userId).subscribe((user) => this.user.set(user));
    });
  }

  getCurrentOpositeState()
  {
    return this.user().status === 'DISABLED' ? 'ENABLED' : 'DISABLED'
  }

  changeUserState(state:string)
  {
    const user_data = JSON.parse(JSON.stringify(this.user()))

    // copy so its not by reference
    user_data.status = state;
    this.userService.modifyUser(user_data, user_data.id).subscribe({
      next: (new_info) => {
        this.user.set(new_info)
      }, error: (err) => {
        throw err
      }
    })
  }

  deleteUser()
  {
    let ok_value = "Si"

    const modal_promise = this.modal_service.showModal(ModalNotification,{
      title: "Esta seguro?",
      description: "Esta acción no se puede revertir.",
      options: [ok_value, "No"]
    })

    modal_promise?.subscribe({
      next: (result) => {
        if(result == ok_value)
        {
          this.userService.deleteUser(this.id(), "hard").subscribe({
            next: () => {
              this.router.navigate(["/users"])
            }, error: (err) => {
              throw err
            }
          })
        }
      }
    })
  }

  redirectToEdit()
  {
    this.router.navigate([`users-add/${this.id()}`])
  }

}
