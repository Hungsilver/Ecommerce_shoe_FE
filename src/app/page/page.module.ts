import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './page-routing.module';
import { DetailComponent } from './detail/detail.component';
import { HomeComponent } from './home/home.component';
import { OrderComponent } from './order/order.component';
import { ProductComponent } from './product/product.component';

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [
    DetailComponent,
    HomeComponent,
    OrderComponent,
    ProductComponent,
  ],
  providers: [],
})
export class PageModule {}
