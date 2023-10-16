import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './detail/detail.component';
import { HomeComponent } from './home/home.component';
import { OrderComponent } from './order/order.component';
import { ProductComponent } from './product/product.component';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { ForgotPassComponent } from './account/forgot-pass/forgot-pass.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { BadgeModule } from 'primeng/badge';
import { DropdownModule } from 'primeng/dropdown';
import { SliderModule } from 'primeng/slider';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CartComponent } from './cart/cart.component';
import { TableModule } from 'primeng/table';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'product', component: ProductComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'product/:id', component: DetailComponent },
  { path: 'order', component: OrderComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-pass', component: ForgotPassComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    ToastModule,
    FormsModule,
    BadgeModule,
    DropdownModule,
    SliderModule,
    BreadcrumbModule,
    TableModule
  ],
  exports: [],
  declarations: [
    DetailComponent,
    HomeComponent,
    OrderComponent,
    ProductComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPassComponent,
    CartComponent,
    CheckoutComponent,
  ],
  providers: [],
})
export class PageModule { }
