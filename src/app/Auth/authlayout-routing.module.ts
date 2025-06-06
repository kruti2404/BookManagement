import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthlayoutComponent } from './authlayout/authlayout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
   {
      path: "",
      component: AuthlayoutComponent,
      children: [
        {
          path: "Login",
          component: LoginComponent
        },
        { path: "", redirectTo: "Login", pathMatch: "full" },
        {
          path: "Register",
          component: RegisterComponent
        }
      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthlayoutRoutingModule { }
