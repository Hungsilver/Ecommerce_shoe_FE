import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

import { SizeComponent } from './size/size.component';

import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ColorComponent } from './color/color.component';
import { PaginatorModule } from 'primeng/paginator';
import { OriginComponent } from './origin/origin.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { OriginDialogComponent } from './origin/origin-dialog/origin-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { ColorDialogComponent } from './color/color-dialog/color-dialog.component';
import { SizeDialogComponent } from './size/size-dialog/size-dialog.component';
import { MaterialComponent } from './material/material.component';
import { MaterialDialogComponent } from './material/material-dialog/material-dialog.component';
import { MaterialSolesComponent } from './material-soles/material-soles.component';
import { MaterialSolesDialogComponent } from './material-soles/material-soles-dialog/material-soles-dialog.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  { path: 'product-detail', component: ProductDetailComponent },
  { path: 'size', component: SizeComponent },
  { path: 'mau-sac', component: ColorComponent },
  { path: 'xuat-xu', component: OriginComponent },
  { path: 'chat-lieu-giay', component: MaterialComponent },
  { path: 'chat-lieu-de-giay', component: MaterialSolesComponent },
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
    RadioButtonModule,
    PaginatorModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatSelectModule
  ],
  exports: [RouterModule],

  declarations: [
    DashboardComponent,
    ProductDetailComponent,
    ColorComponent,
    OriginComponent,
    OriginDialogComponent,
    SizeComponent,
    ColorDialogComponent,
    SizeDialogComponent,
    MaterialComponent,
    MaterialDialogComponent,
    MaterialSolesComponent,
    MaterialSolesDialogComponent
  ],

  providers: [],
})
export class AdminModule { }
