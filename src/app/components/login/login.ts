import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth-service';
import {AuthRequest} from '../../interfaces/user/auth-request';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  formBuilder= inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  authForm = this.formBuilder.group({

    username: ['', [Validators.required]],
    password: ['', [Validators.required]],

  });

  login(){

    const authRequest:AuthRequest = {
      username: this.authForm.get('username')?.value!,
      password: this.authForm.get('password')?.value!,
    }

    this.authService.login(authRequest).subscribe(
      {
        next: ()  => {
          this.router.navigate(['/main-menu']); // ruta tentativa, despues la cambiamos por la verdadera

        }
      }
    );
  }

}
