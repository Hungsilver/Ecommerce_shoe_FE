import { NgModule } from '@angular/core';
import { AccountRoutingModule } from './account-routing.module';
import { AccountLazyModule } from './account-lazy.module';

@NgModule({
  declarations: [],
  imports: [
    AccountRoutingModule,
    AccountLazyModule
  ],

  exports: [
    AccountLazyModule
  ]
})
export class AccountModule { }
