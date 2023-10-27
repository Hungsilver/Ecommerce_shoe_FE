import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ColorComponent } from './color/pages/color-home/color.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OriginComponent } from './origin/origin.component';
import { OriginDialogComponent } from './origin/origin-dialog/origin-dialog.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductHomeComponent } from './product/components/product-home/product-home.component';
import { MaterialComponent } from './material/pages/material-home/material.component';
import { MaterialDialogComponent } from './material/components/material-dialog/material-dialog.component';
import { MaterialSolesComponent } from './material-soles/pages/material-soles-home/material-soles.component';
import { MaterialSolesDialogComponent } from './material-soles/components/material-soles-dialog/material-soles-dialog.component';
import { SizeComponent } from './size/pages/size-home/size.component';
import { SizeDialogComponent } from './size/components/size-dialog/size-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ChartModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    RadioButtonModule,
    PaginatorModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatSelectModule,
    ToastModule,
  ],
  exports: [],
  declarations: [
    DashboardComponent,
    ProductDetailComponent,
    ColorComponent,
    OriginComponent,
    ProductHomeComponent,
    MaterialComponent,
    MaterialDialogComponent,
    MaterialSolesComponent,
    MaterialSolesDialogComponent,
    SizeComponent,
    SizeDialogComponent,
  ],
  providers: [],
})
export class AdminLazyModule { }
