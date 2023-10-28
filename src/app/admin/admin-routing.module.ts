import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ColorComponent } from './color/pages/color-home/color.component';
import { OriginComponent } from './origin/origin.component';
import { OrderComponent } from '../page/order/order.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductHomeComponent } from './product/pages/product-home/product-home.component';
import { NgModule } from '@angular/core';
import { MaterialComponent } from './material/pages/material-home/material.component';
import { MaterialSolesComponent } from './material-soles/pages/material-soles-home/material-soles.component';
import { SizeComponent } from './size/pages/size-home/size.component';
import { UploadFileComponent } from './upload-file/upload-file.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'product', component: ProductDetailComponent },
  { path: 'mau-sac', component: ColorComponent },
  { path: 'xuat-xu', component: OriginComponent },
  { path: 'Order', component: OrderComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'product/new', component: ProductHomeComponent },
  { path: 'product-detail', component: ProductDetailComponent },
  { path: 'chat-lieu-giay', component: MaterialComponent },
  { path: 'chat-lieu-de-giay', component: MaterialSolesComponent },
  { path: 'kich-co', component: SizeComponent },
  { path: 'upload-file', component: UploadFileComponent },
  // { path: 'new-coupon', component: CouponComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
