import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './detail/page/detail.component';
import { HomeComponent } from './home/home.component';
import { OrderComponent } from './order/order.component';
import { ProductComponent } from './product/page/product-home/product.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { authUserGuard } from 'src/libs/service/request/auth.guard';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'product', component: ProductComponent },
    { path: 'cart', component: CartComponent, canActivate: [authUserGuard] },
    { path: 'checkout', canActivate: [authUserGuard], component: CheckoutComponent },
    { path: 'product/:id', component: DetailComponent },
    { path: 'order', component: OrderComponent },

];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PageRoutingModule { }
