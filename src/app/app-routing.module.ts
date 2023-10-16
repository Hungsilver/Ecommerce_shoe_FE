import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutAdminComponent } from 'src/libs/component/layout/admin/layout-admin.component';
import { LayoutPageComponent } from 'src/libs/component/layout/page/layout-page.component';
import { Page404Component } from './page404/page404.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    loadChildren: () => import('./page/page.module').then((m) => m.PageModule),
  },
  {
    path: 'admin',
    component: LayoutAdminComponent, //load component layout
    //load router outlet
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'cart',
    component: LayoutPageComponent,
    //load router outlet
    loadChildren: () =>
      import('./page/page.module').then((m) => m.PageModule),
  },
  {
    path: 'checkout',
    component: LayoutPageComponent,
    //load router outlet
    loadChildren: () =>
      import('./page/page.module').then((m) => m.PageModule),
  },
  {
    path: '**', component: Page404Component,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
