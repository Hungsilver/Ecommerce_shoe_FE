import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminLazyModule } from './admin-lazy.module';
import { VndPipe } from 'src/libs/common/pipe/changeVND.pipe';


@NgModule({
  imports: [
    AdminLazyModule,
    AdminRoutingModule,
  ],
  exports: [AdminLazyModule],
  declarations: [],
})
export class AdminModule { }
