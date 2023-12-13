import { NgModule } from '@angular/core';
import { LayoutPageComponent } from './layout-page.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BadgeModule } from 'primeng/badge';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  imports: [
    RouterModule,
    BadgeModule,
    CommonModule,
    FormsModule,
    MatIconModule,
    MatMenuModule
  ],
  exports: [],
  declarations: [
    LayoutPageComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
  ],
  providers: [],
})
export class LayoutPageModule { }
