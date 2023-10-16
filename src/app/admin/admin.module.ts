import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ColorComponent } from './color/color.component';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  { path: 'product-detail', component: ProductDetailComponent },
  { path: 'color', component: ColorComponent },
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ChartModule,
    TableModule,
    ButtonModule,
    CommonModule,
    DialogModule,
    FormsModule,
    InputTextModule,
    RadioButtonModule
  ],
  exports: [RouterModule],
  declarations: [DashboardComponent, ProductDetailComponent, ColorComponent],
  providers: [],
})
export class AdminModule { }
