import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './customer/login/login.component';
import { RegisterComponent } from './customer/register/register.component';
import { ForgotPassComponent } from './customer/forgot-pass/forgot-pass.component';
import { ForgotPassAdminComponent } from './admin/forgot-pass-admin/forgot-pass-admin.component';
import { LoginAdminComponent } from './admin/login-admin/login-admin.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotPassComponent,
    ForgotPassAdminComponent,
    LoginAdminComponent

  ]
})
export class AccountLazyModule { } 
