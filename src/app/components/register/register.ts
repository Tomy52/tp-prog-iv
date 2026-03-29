import {ChangeDetectionStrategy, Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
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
  success: WritableSignal<boolean|null> = signal<boolean|null>(null);
  err = signal<string|null>(null);
  authService: AuthService = inject(AuthService);
  registrationService: RegistrationService = inject(RegistrationService);
  router: Router = inject(Router);
  formBuilder: FormBuilder = inject(FormBuilder);

  userRegForm = this.formBuilder.group({

    dni: this.formBuilder.nonNullable.control('', [Validators.required, Validators.minLength(7),Validators.maxLength(8)]),
    firstname: this.formBuilder.nonNullable.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+( [A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$')]),
    lastname: this.formBuilder.nonNullable.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+( [A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$')]),
    username: this.formBuilder.nonNullable.control('', [Validators.required,  Validators.minLength(3), Validators.maxLength(16), Validators.pattern('^[a-zA-Z0-9_]+$')]),
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
          this.success.set(true);
          this.userRegForm.markAsPristine();
          this.userRegForm.reset();
          this.err.set('¡Registro exitoso! Ahora puede iniciar sesión con su usuario y clave. Será enviado a la pantalla de inicio en 5 segundos.');
          setTimeout(() => {
            this.router.navigate(['/main-menu']);
            },5000);
        },
        error: (err) => {
          this.success.set(false);
          alert("Registro fallido: " + `${err.error}`);
          this.err.set(`${err.error}`);
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
