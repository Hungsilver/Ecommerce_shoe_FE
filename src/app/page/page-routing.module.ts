import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './detail/page/detail.component';
import { HomeComponent } from './home/home.component';
import { OrderComponent } from './order/page/order.component';
import { ProductComponent } from './product/page/product-home/product.component';
import { CartComponent } from './cart/page/cart.component';
import { CheckoutComponent } from './checkout/page/checkout.component';
import { authUserGuard } from 'src/libs/service/request/auth.guard';

import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { PaymentErrorComponent } from './payment-error/payment-error.component';


import { BlogHomeComponent } from './blog/bloghome-component';
import { blogdetail } from './blogDetail/blogDetail-component';
import { ChinhSachComponent } from './chinh-sach/chinh-sach.component';
import { VoucherComponent } from './voucher/voucher.component';
import { ProfileComponent } from 'src/app/page/profile/profile.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'product', component: ProductComponent },
  { path: 'cart', component: CartComponent },
  // { path: 'cart', component: CartComponent, canActivate: [authUserGuard] },
  { path: 'checkout', component: CheckoutComponent },
  // { path: 'checkout', canActivate: [authUserGuard], component: CheckoutComponent },
  { path: 'product/:id', component: DetailComponent },
  { path: 'order', component: OrderComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'chinh-sach', component: ChinhSachComponent },
  { path: 'voucher', component: VoucherComponent },
  { path: 'payment/success', component: PaymentSuccessComponent },
  { path: 'payment/error', component: PaymentErrorComponent },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageRoutingModule { }
