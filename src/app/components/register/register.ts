import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth-service';
import {Router, RouterLink} from '@angular/router';
import {RegistrationService} from '../../services/registration-service';
import {ProductStatus} from '../../interfaces/productStatus';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register.html',
  styleUrls: ['../login/login.css','./register.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Register implements OnInit {
  authService: AuthService = inject(AuthService);
  registrationService: RegistrationService = inject(RegistrationService);
  router: Router = inject(Router);
  formBuilder: FormBuilder = inject(FormBuilder);

  userRegForm = this.formBuilder.group({

    dni: this.formBuilder.nonNullable.control('', [Validators.required, Validators.minLength(7),Validators.maxLength(8)]),
    firstname: this.formBuilder.nonNullable.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    lastname: this.formBuilder.nonNullable.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    username: this.formBuilder.nonNullable.control('', [Validators.required,  Validators.minLength(3), Validators.maxLength(16)]),
    password: this.formBuilder.nonNullable.control('', [Validators.required,  Validators.minLength(8), Validators.maxLength(64)]),

  });

  register(): void {
    const formInfo = this.userRegForm.value;
    const credentials = {
      username: formInfo.username!,
      password: formInfo.password!
    };

    const userData = {
      firstname: formInfo.firstname!,
      lastname: formInfo.lastname!,
      dni: formInfo.dni!,
      credential: credentials!
    };

    this.registrationService.sendData(userData).subscribe(
      {
        next: () => {
          this.userRegForm.markAsPristine();
          this.userRegForm.reset();
        },
        error: (err) => {
          alert("No se pudo completar el registro: " + `${err.error}`);
        }
      }
    );
  }

  ngOnInit(): void {
    if (this.authService.isTokenExpired()) {
      this.authService.logOut();
    }

    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/main-menu']);
    }
  }
}
