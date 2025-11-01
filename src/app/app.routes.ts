import { Routes } from '@angular/router';
import {ProductAreaComponent} from './components/product-area-component/product-area-component';
import {Login} from './components/login/login';
import {MainMenuScreen} from './components/main-menu/main-menu-screen/main-menu-screen';
import {TestComponent} from './components/test/test-component/test-component';
import {AuthGuard} from './services/auth-guard';

export const routes: Routes = [
  {
    path: "login",
    component: Login,
    data: {
      showHeader: false,
      showFooter: false}
  },
  {
    path: "products",
    component: ProductAreaComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"main-menu",
    component:MainMenuScreen,
    canActivate: [AuthGuard]
  },
  {
    path:"test",
    component:TestComponent,
  },
  {
    path:"**",
    pathMatch:"prefix",
    redirectTo:"main-menu"
  },
  {
    path:"",
    pathMatch:"prefix",
    redirectTo:"main-menu"
  }
];
