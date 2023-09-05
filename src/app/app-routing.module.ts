import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutAdminComponent } from 'src/libs/component/layout/admin/layout-admin.component';
import { LayoutPageComponent } from 'src/libs/component/layout/page/layout-page.component';
import { LoginComponent } from 'src/libs/component/login/login.component';
import { RegisterComponent } from 'src/libs/component/register/register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: LayoutPageComponent,
    loadChildren: () => import('./page/page.module').then((m) => m.PageModule),
  },
  {
    path: 'admin',
    component: LayoutAdminComponent,
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
