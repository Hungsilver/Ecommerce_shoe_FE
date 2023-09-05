import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutAdminComponent } from './layout-admin.component';
import { FooterAdminComponent } from './footer/footer.component';
import { NavbarAdminComponent } from './navbar/navbar.component';
import { SidebarAdminComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  imports: [RouterModule, MatSlideToggleModule],
  exports: [LayoutAdminComponent],
  declarations: [
    LayoutAdminComponent,
    FooterAdminComponent,
    NavbarAdminComponent,
    SidebarAdminComponent,
  ],
  providers: [],
})
export class LayoutAdminModule {}
