import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { MainMenuScreen } from './components/main-menu/main-menu-screen/main-menu-screen';
import { AuthGuard } from './services/auth-guard';
import { SupplierFormSection } from './components/sections/supplier/supplier-form-section/supplier-form-section';
import { DeleteSupplier } from './components/sections/supplier/delete-supplier/delete-supplier';
import {SuppliersPage} from './components/sections/supplier/suppliers-page/suppliers-page';
import {ProductFormSection} from './components/sections/product/product-form-section/product-form-section';
import {
  DeleteProductFormComponent
} from './components/sections/product/delete-product-form-component/delete-product-form-component';
import {
  ProductSupplierFormSection
} from './components/sections/product-supplier/product-supplier-form-section/product-supplier-form-section';
import {
  PriceBySupplierListComponent
} from './components/sections/product-supplier/price-list-by-supplier-component/price-by-supplier-list-component';
import {
  PriceListByProductComponent
} from './components/sections/product-supplier/price-list-by-product-component/price-list-by-product-component';
import {ProductsPage} from './components/sections/product/products-page/products-page';


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
    path:"products",
    component:ProductsPage,
    canActivate: [AuthGuard]
  },
  {
    path: "delete-product",
    component: DeleteProductFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"form-suppliers",
    component:SupplierFormSection,
    canActivate: [AuthGuard]
  },
  {
    path:"form-suppliers/:id",
    component:SupplierFormSection,
    canActivate: [AuthGuard]
  },
  {
    path:"delete-supplier",
    component:DeleteSupplier,
    canActivate: [AuthGuard]
  },
  {
    path:"product-supplier",
    component: ProductSupplierFormSection,
    canActivate: [AuthGuard]
  },
  {
    path:"product-supplier/:id",
    component: ProductSupplierFormSection,
    canActivate: [AuthGuard]
  },
  {
    path:"price-by-supplier",
    component: PriceBySupplierListComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"price-by-product",
    component: PriceListByProductComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"suppliers",
    component:SuppliersPage,
    canActivate: [AuthGuard]
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
