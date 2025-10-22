import { Routes } from '@angular/router';
import { TestComponent } from './components/test/test-component/test-component';
import { MainMenuScreen } from './components/main-menu/main-menu-screen/main-menu-screen';


export const routes: Routes = [
    {
        path:"main-menu",component:MainMenuScreen
    },
    {
        path:"test",component:TestComponent // para remover despues
    },
    {
        path:"suppliers/add",component:SupplierUploadSection
    }
    ,{
        path:"**",pathMatch:"prefix",redirectTo:"main-menu"
    },{
        path:"",pathMatch:"prefix",redirectTo:"main-menu"
    }
];
