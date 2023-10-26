import { NgModule } from '@angular/core';
import { PageRoutingModule } from './page-routing.module';
import { PageLazyModule } from './page-lazy.module';



@NgModule({
  imports: [
    PageRoutingModule,
    PageLazyModule
  ],
  exports: [PageLazyModule],
})
export class PageModule { }
