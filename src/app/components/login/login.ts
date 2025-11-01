import {Component, inject, OnInit, signal} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth-service';
import {AuthRequest} from '../../interfaces/user/auth-request';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
 ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {

  formBuilder: FormBuilder = inject(FormBuilder);
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);

  authForm = this.formBuilder.group({

    username: this.formBuilder.nonNullable.control('', [Validators.required]),
    password: this.formBuilder.nonNullable.control('', [Validators.required]),

  });

  // no se si da para un guard
  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/main-menu']);
    }
  }

  login(){

    const authRequest:AuthRequest = {
      username: this.authForm.get('username')?.value!,
      password: this.authForm.get('password')?.value!,
    };

    this.authService.login(authRequest).subscribe(
      {
        next: ()  => {
          this.router.navigate(['/main-menu']);
        }
      }
    );
  }

}
