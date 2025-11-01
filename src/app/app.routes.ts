import { Routes } from '@angular/router';
import {ProductAreaComponent} from './components/product-area-component/product-area-component';
import {Login} from './components/login/login';

export const routes: Routes = [
  {
    path: "products",
    component: ProductAreaComponent
  },
  {
    path: "login",
    component: Login
  }
];
