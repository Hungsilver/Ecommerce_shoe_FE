import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { routes } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [DashboardComponent, ProductDetailComponent, AdminComponent],
  providers: [],
})
export class AdminModule {}
