import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { SizeComponent } from './size/size.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  { path: 'product-detail', component: ProductDetailComponent },
  { path: 'size', component: SizeComponent },
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ChartModule,
    TableModule,
    ButtonModule,
    CommonModule,
  ],
  exports: [RouterModule],
  declarations: [DashboardComponent, ProductDetailComponent, SizeComponent],
  providers: [],
})
export class AdminModule { }
