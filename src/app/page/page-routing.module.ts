import { Router, Routes } from '@angular/router';
import { ProductComponent } from '../page/product/product.component';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'product',
    component: ProductComponent,
    children: [{ path: 'detail', component: DetailComponent }],
  },
];
