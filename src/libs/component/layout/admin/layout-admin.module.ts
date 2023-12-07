// import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutAdminComponent } from './layout-admin.component';
import { FooterAdminComponent } from './footer/footer.component';
import { NavbarAdminComponent } from './navbar/navbar.component';
import { SidebarAdminComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MenuModule } from 'primeng/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    RouterModule,
    MatSlideToggleModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MenuModule,
  ],
  exports: [LayoutAdminComponent],
  declarations: [
    LayoutAdminComponent,
    FooterAdminComponent,
    NavbarAdminComponent,
    SidebarAdminComponent,
  ],
  providers: [],
})
export class LayoutAdminModule { }
