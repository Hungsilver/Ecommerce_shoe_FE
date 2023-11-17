import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './customer/login/login.component';
import { RegisterComponent } from './customer/register/register.component';
import { ForgotPassComponent } from './customer/forgot-pass/forgot-pass.component';
import { LoginAdminComponent } from './admin/login-admin/login-admin.component';
import { ForgotPassAdminComponent } from './admin/forgot-pass-admin/forgot-pass-admin.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-pass', component: ForgotPassComponent },
  { path: 'login-admin', component: LoginAdminComponent },
  // { path: 'register-admin', component: Regis },
  { path: 'forgot-pass-admin', component: ForgotPassAdminComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule { }
