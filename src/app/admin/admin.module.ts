import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { routes } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ChartModule,
    TableModule,
    ButtonModule,
    CommonModule,
  ],
  exports: [RouterModule],
  declarations: [DashboardComponent, ProductDetailComponent, AdminComponent],
  providers: [],
})
export class AdminModule {}
