import { NgModule } from '@angular/core';
import { DetailComponent } from './detail/page/detail.component';
import { HomeComponent } from './home/home.component';
import { OrderComponent } from './order/order.component';
import { ProductComponent } from './product/page/product-home/product.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BadgeModule } from 'primeng/badge';
import { DropdownModule } from 'primeng/dropdown';
import { SliderModule } from 'primeng/slider';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CartComponent } from './cart/page/cart.component';
import { TableModule } from 'primeng/table';
import { CheckoutComponent } from './checkout/checkout.component';
import { CheckboxModule } from 'primeng/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { BlogHomeComponent } from './blog/bloghome-component';
import { blogdetail } from './blogDetail/blogDetail-component';
import { VoucherHomeComponent } from '../admin/voucher/pages/voucher-home.component';

import { InputTextModule } from 'primeng/inputtext';
import { CarouselModule } from 'primeng/carousel';



@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        BadgeModule,
        DropdownModule,
        SliderModule,
        BreadcrumbModule,
        TableModule,
        CheckboxModule,
        MatButtonModule,
        MatSnackBarModule,
        MatIconModule,
        InputTextModule,
        CarouselModule
    ],
    declarations: [
        DetailComponent,
        HomeComponent,
        OrderComponent,
        ProductComponent,
        CartComponent,
        CheckoutComponent,
        BlogHomeComponent,
        blogdetail,
      
    ],
})
export class PageLazyModule { }
