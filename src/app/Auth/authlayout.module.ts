import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthlayoutRoutingModule } from './authlayout-routing.module';
import { AuthlayoutComponent } from './authlayout/authlayout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AuthlayoutComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthlayoutRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AuthlayoutModule { }
