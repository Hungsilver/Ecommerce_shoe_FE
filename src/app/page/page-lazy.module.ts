import { NgModule } from '@angular/core';
import { DetailComponent } from './detail/page/detail.component';
import { HomeComponent } from './home/home.component';
import { OrderComponent } from './order/order.component';
import { ProductComponent } from './product/page/product-home/product.component';
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
import { CheckboxModule } from 'primeng/checkbox';



@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        ToastModule,
        BadgeModule,
        DropdownModule,
        SliderModule,
        BreadcrumbModule,
        TableModule,
        CheckboxModule
    ],
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
})
export class PageLazyModule { }
