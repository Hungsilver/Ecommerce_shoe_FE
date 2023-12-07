import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutAdminComponent } from 'src/libs/component/layout/admin/layout-admin.component';
import { LayoutPageComponent } from 'src/libs/component/layout/page/layout-page.component';
import { Page404Component } from './page404/page404.component';
import { authAdminGuard, authUserGuard } from 'src/libs/service/request/auth.guard';
import { CartComponent } from './page/cart/cart.component';

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
    // canActivateChild: [authAdminGuard],
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  // {
  //   path: 'cart',
  //   canActivate: [authUserGuard],
  //   component: CartComponent,
  //   //load router outlet
  //   // children: [
  //   //   { path: '', component: CartComponent }
  //   // ]
  //   // loadChildren: () =>
  //   // import('./page/page.module').then((m) => m.PageModule),
  // },
  {
    path: 'auth',
    component: LayoutPageComponent,
    //load router outlet
    loadChildren: () =>
      import('../libs/component/account/account.module').then((m) => m.AccountModule),
  },
  // {
  //   path: 'checkout',
  //   // canActivateChild: [authUserGuard],
  //   component: LayoutPageComponent,
  //   //load router outlet
  //   loadChildren: () =>
  //     import('./page/page.module').then((m) => m.PageModule),
  // },
  {
    path: '**', component: Page404Component,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
