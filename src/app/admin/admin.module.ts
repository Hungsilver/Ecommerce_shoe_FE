import { NgModule } from '@angular/core';
import { AdminLazyModule } from './admin-lazy.module';
import { AdminRoutingModule } from './admin-routing.module';


@NgModule({
  imports: [
    AdminLazyModule,
    AdminRoutingModule
  ],
  exports: [AdminLazyModule],
  declarations: [],
})
export class AdminModule { }
