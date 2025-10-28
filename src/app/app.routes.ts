import { Routes } from '@angular/router';
import { TestComponent } from './components/test/test-component/test-component';
import { MainMenuScreen } from './components/main-menu/main-menu-screen/main-menu-screen';
import { SupplierFormSection } from './components/sections/supplier/supplier-form-section/supplier-form-section';
import {Login} from './components/login/login';
import {DeleteSupplier} from './components/sections/supplier/delete-supplier/delete-supplier';

export const routes: Routes = [
    {
        path:"login",component:Login
    },
    {
        path:"main-menu",component:MainMenuScreen
    },
    {
        path:"test",component:TestComponent // para remover despues
    },
    {
        path:"form-suppliers",component:SupplierFormSection
    },
    {
        path:"form-suppliers/:id",component:SupplierFormSection
    },
    {
        path:"delete-supplier",component:DeleteSupplier
    }
    ,{
        path:"**",pathMatch:"full",redirectTo:"login"
    },{
        path:"",pathMatch:"full",redirectTo:"login"
    }
];
