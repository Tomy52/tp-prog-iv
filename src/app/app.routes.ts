import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { MainMenuScreen } from './components/main-menu/main-menu-screen/main-menu-screen';
import { AuthGuard } from './services/auth-guard';
import { SupplierFormSection } from './components/sections/supplier/supplier-form-section/supplier-form-section';
import { DeleteSupplier } from './components/sections/supplier/delete-supplier/delete-supplier';
import {ProductFormSection} from './components/sections/product/product-form-section/product-form-section';
import {
  DeleteProductFormComponent
} from './components/sections/product/delete-product-form-component/delete-product-form-component';
import {
  ProductSupplierSection
} from './components/sections/product-supplier/product-supplier-section/product-supplier-section';


export const routes: Routes = [
  {
    path: "login",
    component: Login,
    data: {
      showHeader: false,
      showFooter: false}
  },
  {
    path:"main-menu",
    component:MainMenuScreen,
    canActivate: [AuthGuard]
  },
  {
    path: "form-products",
    component: ProductFormSection,
    canActivate: [AuthGuard]
  },
  {
    path:"form-products/:id",
    component: ProductFormSection,
    canActivate: [AuthGuard]
  },
  {
    path: "delete-product",
    component: DeleteProductFormComponent,
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
    path:"create-product-supplier",
    component: ProductSupplierSection
  },
  {
    path:"create-product-supplier/:id",
    component: ProductSupplierSection
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
