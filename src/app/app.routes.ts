import { Routes } from '@angular/router';
import {ProductAreaComponent} from './components/product-area-component/product-area-component';
import {Login} from './components/login/login';
import {AuthGuard} from './services/auth-guard';

export const routes: Routes = [
  {
    path: "products",
    component: ProductAreaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "login",
    component: Login
  }
];
