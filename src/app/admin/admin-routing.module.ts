import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ColorComponent } from './color/pages/color-home/color.component';
import { OriginComponent } from './origin/origin.component';
import { OrderComponent } from '../page/order/order.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'product-detail', component: ProductDetailComponent },
  { path: 'mau-sac', component: ColorComponent },
  { path: 'xuat-xu', component: OriginComponent },
  { path: 'Order', component: OrderComponent },
  { path: 'dashboard', component: DashboardComponent },
  // { path: 'new-coupon', component: CouponComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
