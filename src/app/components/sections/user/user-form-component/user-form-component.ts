import { ChangeDetectionStrategy, Component, effect, inject, input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FieldError } from "../../../../directives/field-error";
import { FieldErrorBorder } from "../../../../directives/field-error-border";
import { UserService } from '../../../../services/user-service';
import { UserData } from '../../../../interfaces/user/user-data';
import { UserInfo } from '../../../../interfaces/user/user-info';
import { CreateUser } from '../../../../interfaces/user/create-user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form-component',
  imports: [ReactiveFormsModule, FieldError, FieldErrorBorder],
  templateUrl: './user-form-component.html',
  styleUrl: './user-form-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent implements OnInit {
  form_builder = inject(FormBuilder)
  user_service = inject(UserService)
  router = inject(Router)

  id = input<string>();

  userObject?: Partial<UserInfo>;

  form = this.form_builder.group({
    dni: ['',[Validators.required, Validators.pattern(/^\d{7,8}$/)]],
    firstname: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+( [A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$')]],
    lastname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+( [A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$')]],
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(16), Validators.pattern('^[a-zA-Z0-9_]+$')]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]],
    role: ['EMPLOYEE', [Validators.required]]
  })

  register()
  {
    const form_data = this.form.value

    const status = this.userObject?.status != undefined ? this.userObject?.status : "ENABLED"

    const user_values: Partial<CreateUser> = {
      dni: form_data.dni!,
      firstname: form_data.firstname!,
      lastname: form_data.lastname!,
      status: status,
      credential: {
        username: form_data.username!,
        password: form_data.password!,
        role: form_data.role!
      }
    }

    if(this.id())
    {
      this.mofifyUser(user_values)
    } else {
      this.addUser(user_values)
    }
  }

  mofifyUser(userdata:Partial<CreateUser>)
  {
    this.user_service.modifyUser(userdata, Number(this.id())).subscribe({
      next: (user) => {
        this.router.navigate([`users/${user.idUser}`])
      },
      error: (err) => {
        throw err
      }
    })
  }

  addUser(userdata:Partial<CreateUser>)
  {
    this.user_service.uploadUser(userdata).subscribe({
      next: (user) => {
        this.router.navigate([`users/${user.idUser}`])
      },
      error: (err) => {
        throw err
      }
    })
  }

  ngOnInit() {
    if (this.id()) {
      console.log(this.id())
      this.user_service.getUserById(this.id()!).subscribe({
        next: (user) => {
          this.userObject = user
          this.setUpValues()
        },
        error: () => console.error("El id no es válido")
      });
    }
  }

  setUpValues()
  {
    if (this.userObject) {
      this.form.get('dni')?.patchValue(this.userObject.dni!);
      this.form.get('firstname')?.patchValue(this.userObject.firstname!);
      this.form.get('lastname')?.patchValue(this.userObject.lastname!)
      this.form.get('username')?.patchValue(this.userObject.credential?.username!)
      this.form.get('role')?.patchValue(this.userObject.credential?.role!)
      this.form.get('password')?.patchValue('')
    }
  }




}
