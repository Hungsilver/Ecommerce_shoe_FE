import { RouterModule, Routes } from "@angular/router";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { ColorComponent } from "./color/pages/color-home/color.component";
import { OriginComponent } from "./origin/origin.component";
import { EditProductComponent } from "./product/edit-product/edit-product.component";
import { NewProductComponent } from "./product/new-product/new-product.component";
import { OrderComponent } from "../page/order/order.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { NgModule } from "@angular/core";

export const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'product-detail', component: ProductDetailComponent },
    { path: 'mau-sac', component: ColorComponent },
    { path: 'xuat-xu', component: OriginComponent },
    { path: 'edit-product', component: EditProductComponent },
    { path: 'new-product', component: NewProductComponent },
    { path: 'Order', component: OrderComponent },
    // { path: 'new-coupon', component: CouponComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]

})
export class AdminRoutingModule { }
