import { NgModule } from '@angular/core';
import { LayoutPageComponent } from './layout-page.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  imports: [RouterModule],
  exports: [LayoutPageComponent],
  declarations: [
    LayoutPageComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
  ],
  providers: [],
})
export class LayoutPageModule {}
