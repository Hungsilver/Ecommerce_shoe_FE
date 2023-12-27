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
import { ColorComponent } from './color/pages/color-home/color.component';
import { ProductDetailComponent } from './product-detail/page/product-detail/product-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OriginComponent } from './origin/origin.component';
import { OriginDialogComponent } from './origin/origin-dialog/origin-dialog.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialComponent } from './material/pages/material-home/material.component';
import { MaterialDialogComponent } from './material/components/material-dialog/material-dialog.component';
import { MaterialSolesComponent } from './material-soles/pages/material-soles-home/material-soles.component';
import { MaterialSolesDialogComponent } from './material-soles/components/material-soles-dialog/material-soles-dialog.component';
import { SizeComponent } from './size/pages/size-home/size.component';
import { SizeDialogComponent } from './size/components/size-dialog/size-dialog.component';
import { ColorDialogComponent } from './color/components/color-dialog/color-dialog.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { BrandComponent } from './brand/pages/brand-home/brand.component';
import { BrandDialogComponent } from './brand/components/brand-dialog/brand-dialog.component';
import { CategoryHomeComponent } from './category/pages/category-home/category-home.component';
import { CategoryDialogComponent } from './category/components/category-dialog/category-dialog.component';
import { HomeProductComponent } from './admin-product/pages/home-product/home-product.component';
import { DialogProductComponent } from './admin-product/components/dialog-product/dialog-product.component';
import { CustomerHomeComponent } from './customer/pages/customer-home/customer-home.component';
import { CustomerDialogComponent } from './customer/components/customer-dialog/customer-dialog.component';
import { BlogHomeComponent } from './blog/pages/blog-home/blog-home.component';
import { BlogDialogComponent } from './blog/components/blog-dialog/blog-dialog.component';
import { AddressHomeComponent } from './address/pages/address-home/address-home.component';
import { AddressDialogComponent } from './address/components/address-dialog/address-dialog.component';
import { StaffHomeComponent } from './staff/pages/staff-home/staff-home.component';
import { StaffDialogComponent } from './staff/components/staff-dialog/staff-dialog.component';
import { NewProductDetailComponent } from './product-detail/page/new-product-detail/new-product-detail.component';
import { TestNewComponent } from './test-new/test-new.component';
import { NComponent } from './test-new/n/n.component';
import { SalesComponent } from './sales/sales.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { NgxScannerQrcodeModule, LOAD_WASM } from 'ngx-scanner-qrcode';

import { AngularFireModule } from '@angular/fire/compat'
import { AngularFireStorageModule } from '@angular/fire/compat/storage'
import { environment } from 'src/environment/environment';

import { VoucherHomeComponent } from './voucher/pages/voucher-home.component';
import { VoucherDialogComponent } from './voucher/components/voucher-Dialog.component';

LOAD_WASM().subscribe()

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
    MatGridListModule,
    MatTableModule,
    MatTabsModule,
    MatDividerModule,
    NgxScannerQrcodeModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,


  ],
  exports: [],
  declarations: [
    DashboardComponent,
    ProductDetailComponent,
    ColorComponent,
    ColorDialogComponent,
    OriginComponent,
    NewProductDetailComponent,
    MaterialComponent,
    MaterialDialogComponent,
    MaterialSolesComponent,
    MaterialSolesDialogComponent,
    SizeComponent,
    SizeDialogComponent,
    OriginDialogComponent,
    UploadFileComponent,
    BrandComponent,
    BrandDialogComponent,
    CategoryHomeComponent,
    CategoryDialogComponent,
    HomeProductComponent,
    DialogProductComponent,
    CustomerHomeComponent,
    CustomerDialogComponent,
    BlogHomeComponent,
    BlogDialogComponent,
    AddressHomeComponent,
    AddressDialogComponent,
    StaffHomeComponent,
    StaffDialogComponent,
    TestNewComponent,
    NComponent,
    SalesComponent,
    VoucherHomeComponent,
    VoucherDialogComponent, 

  ],
  providers: [],
})
export class AdminLazyModule { }
