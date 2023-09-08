import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutAdminComponent } from 'src/libs/component/layout/admin/layout-admin.component';
import { LayoutPageComponent } from 'src/libs/component/layout/page/layout-page.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
