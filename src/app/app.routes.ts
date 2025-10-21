import { Routes } from '@angular/router';
import {Login} from './components/login/login';
import {MainMenuScreen} from './components/main-menu/main-menu-screen/main-menu-screen';
import {TestComponent} from './components/test/test-component/test-component';

export const routes: Routes = [
  {path: "login", component: Login},
  {
    path:"main-menu",component:MainMenuScreen
  },
  {
    path:"test",component:TestComponent
  },{
    path:"**",pathMatch:"prefix",redirectTo:"main-menu"
  },{
    path:"",pathMatch:"prefix",redirectTo:"main-menu"
  }
];
