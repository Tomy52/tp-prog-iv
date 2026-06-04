import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import {Register} from './components/register/register';
import { MainMenuScreen } from './components/main-menu/main-menu-screen/main-menu-screen';
import { AuthGuard } from './guards/auth-guard';
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
import {supplierExistsGuard} from './guards/supplier-exists-guard';
import {priceExistsGuard} from './guards/price-exists-guard';
import {productExistsGuard} from './guards/product-exists-guard';
import { CsvFormUpdate } from './components/sections/csv-section/csv-form-update';
import {UsersPage} from './components/sections/user/users-page/users-page';
import {UsersDetail} from './components/sections/user/users-detail/users-detail';
import { CategoryFormSection } from './components/sections/categories/category-form-section/category-form-section';
import { DeleteCategory } from './components/sections/categories/delete-category/delete-category';
import { ProductsOnSalePage } from './components/sections/customer/products-on-sale-page/products-on-sale-page';
import {ViewShoppingCart} from './components/sections/shopping-cart/view-shopping-cart';
import { UserFormComponent } from './components/sections/user/user-form-component/user-form-component';
import { CustomerOrderList } from './components/sections/orders/customer-order-list/customer-order-page';
import { EmployeeOrderPage } from './components/sections/orders/employee-order-page/employee-order-page';
import { roleGuardGuard } from './guards/role-guard-guard';
import { userExistsGuard } from './guards/user-exists-guard';

const employee_role_ABM = "ROLE_MANAGER"
const admin_role = "ROLE_ADMIN"
const employee_roles = ["ROLE_EMPLOYEE",employee_role_ABM,admin_role]
const customer_role = "ROLE_CUSTOMER"

export const routes: Routes = [
  {
    path: "login",
    component: Login,
    data: {
      showHeader: false,
      showFooter: false
    }
  },
  {
    path: "register",
    component: Register,
    data: {
      showHeader: false,
      showFooter: false
    }
  },
  {
    path:"main-menu",
    component:MainMenuScreen,
    canActivate: [AuthGuard]
  },
  {
    path: "form-products",
    component: ProductFormSection,
    canActivate: [AuthGuard,roleGuardGuard],
    data: {
      allowedUsers: employee_role_ABM
    }
  },
  {
    path:"form-products/:id",
    component: ProductFormSection,
    canActivate: [AuthGuard,productExistsGuard, roleGuardGuard],
    data: {
      allowedUsers: employee_role_ABM
    }
  },
  {
    path:"products",
    component:ProductsPage,
    canActivate: [AuthGuard,roleGuardGuard],
    data: {
      allowedUsers: employee_roles
    }
  },
  {
    path: "delete-product",
    component: DeleteProductFormComponent,
    canActivate: [AuthGuard,roleGuardGuard],
    data: {
      allowedUsers: employee_role_ABM
    }
  },
  {
    path:"form-suppliers",
    component:SupplierFormSection,
    canActivate: [AuthGuard,roleGuardGuard],
    data: {
      allowedUsers: employee_role_ABM
    }
  },
  {
    path:"form-suppliers/:id",
    component:SupplierFormSection,
    canActivate: [AuthGuard,roleGuardGuard,supplierExistsGuard],
    data: {
      allowedUsers: employee_role_ABM
    }
  },
  {
    path:"delete-supplier",
    component:DeleteSupplier,
    canActivate: [AuthGuard,roleGuardGuard],
    data: {
      allowedUsers: employee_role_ABM
    }
  },
  {
    path:"product-supplier",
    component: ProductSupplierFormSection,
    canActivate: [AuthGuard,roleGuardGuard],
    data: {
      allowedUsers: employee_role_ABM
    }
  },
  {
    path:"product-supplier/:id",
    component: ProductSupplierFormSection,
    canActivate: [AuthGuard, priceExistsGuard,roleGuardGuard],
    data: {
      allowedUsers: employee_role_ABM
    }
  },
  {
    path:"price-by-supplier",
    component: PriceBySupplierListComponent,
    canActivate: [AuthGuard,roleGuardGuard],
    data: {
      allowedUsers: employee_role_ABM
    }
  },
  {
    path:"price-by-product",
    component: PriceListByProductComponent,
    canActivate: [AuthGuard,roleGuardGuard],
    data: {
      allowedUsers: employee_role_ABM
    }
  },
  {
    path:"users",
    component: UsersPage,
    canActivate: [AuthGuard,roleGuardGuard],
    data: {
      allowedUsers: admin_role
    }
  },
  {
    path:"users/:id",
    component: UsersDetail,
    canActivate: [AuthGuard,roleGuardGuard,userExistsGuard],
    data: {
      allowedUsers: admin_role
    }
  },
  {
    path:"users-add",
    component: UserFormComponent,
    canActivate: [AuthGuard,roleGuardGuard],
    data: {
      allowedUsers: admin_role
    }
  },
  {
    path:"users-add/:id",
    component: UserFormComponent,
    canActivate: [AuthGuard,roleGuardGuard,userExistsGuard],
    data: {
      allowedUsers: admin_role
    }
  },
  {
    path:"csv-prices",
    component: CsvFormUpdate,
    canActivate: [AuthGuard,roleGuardGuard],
    data: {
      allowedUsers: employee_role_ABM
    }
  },
  {
    path:"categories",
    component: CategoryFormSection,
    canActivate: [AuthGuard,roleGuardGuard],
    data: {
      allowedUsers: employee_role_ABM
    }
  },
  {
    path:"delete-category",
    component: DeleteCategory,
    canActivate: [AuthGuard,roleGuardGuard],
    data: {
      allowedUsers: employee_role_ABM
    }
  },
  {
    path:"suppliers",
    component:SuppliersPage,
    canActivate: [AuthGuard,roleGuardGuard],
    data: {
      allowedUsers: employee_roles
    }
  },
  {
    path:"on-sale",
    component:ProductsOnSalePage,
    canActivate: [AuthGuard,roleGuardGuard],
    data: {
      allowedUsers: customer_role,
      applyHierarchy: false // checkout src/app/guards/role-guard-guard.ts to understand how it works
    }
  },
  {
    path:"shoppingCart",
    component:ViewShoppingCart,
    canActivate: [AuthGuard,roleGuardGuard],
    data: {
      allowedUsers: customer_role,
      applyHierarchy: false // checkout src/app/guards/role-guard-guard.ts to understand how it works
    }
  },
  {
    path:"my-orders",
    component:CustomerOrderList,
    canActivate: [AuthGuard,roleGuardGuard],
    data: {
      allowedUsers: customer_role,
      applyHierarchy: false
    }
  },
  {
    path:"all-orders",
    component:EmployeeOrderPage,
    canActivate: [AuthGuard,roleGuardGuard],
    data: {
      allowedUsers: employee_roles
    }
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
