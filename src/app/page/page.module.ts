import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './detail/detail.component';
import { HomeComponent } from './home/home.component';
import { OrderComponent } from './order/order.component';
import { ProductComponent } from './product/product.component';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { FogetpassComponent } from './account/fogetpass/fogetpass.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { BadgeModule } from 'primeng/badge';

//
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'product', component: ProductComponent },
  { path: 'product/:id', component: DetailComponent },
  { path: 'order', component: OrderComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forget-pass', component: FogetpassComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    ToastModule,
    FormsModule,
    BadgeModule,
  ],
  exports: [],
  declarations: [
    DetailComponent,
    HomeComponent,
    OrderComponent,
    ProductComponent,
    LoginComponent,
    RegisterComponent,
    FogetpassComponent,
  ],
  providers: [],
})
export class PageModule {}
