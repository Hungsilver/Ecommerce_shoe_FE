import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminLazyModule } from './admin-lazy.module';


@NgModule({
  imports: [
    AdminLazyModule,
    AdminRoutingModule,
  ],
  exports: [AdminLazyModule],
  declarations: [],
})
export class AdminModule { }
