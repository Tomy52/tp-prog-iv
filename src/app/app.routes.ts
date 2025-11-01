import { Routes } from '@angular/router';
import { ProductAreaComponent } from './components/product-area-component/product-area-component';
import { Login } from './components/login/login';
import { MainMenuScreen } from './components/main-menu/main-menu-screen/main-menu-screen';
import { TestComponent } from './components/test/test-component/test-component';
import { AuthGuard } from './services/auth-guard';
import { SupplierFormSection } from './components/sections/supplier/supplier-form-section/supplier-form-section';
import { DeleteSupplier } from './components/sections/supplier/delete-supplier/delete-supplier';


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
    path:"form-suppliers",
    component:SupplierFormSection
  },
  {
    path:"form-suppliers/:id",
    component:SupplierFormSection
  },  
  {
    path:"delete-supplier",
    component:DeleteSupplier
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
