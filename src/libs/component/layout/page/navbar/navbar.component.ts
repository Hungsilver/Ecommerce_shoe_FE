import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartComponent } from 'src/app/page/cart/page/cart.component';
import { CartService } from 'src/app/page/cart/service/cart.service';
import { AuthCustomerService } from 'src/libs/component/account/serviceAuth/authCustomerService.service';
import { CacheService } from 'src/libs/service/request/cache.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  quantityInCart = 0;
  customerInfo: any = undefined;

  constructor(
    private cacheService: CacheService,
    private cartService: CartService,
    private authCustomService: AuthCustomerService,
    private router: Router
  ) {

  }
  ngOnInit(): void {
    this.cartService.getAll().then(c => {
      if (c) {
        c.forEach((key: any) => {
          this.quantityInCart++;
        })
      }
    }, err => {
      this.quantityInCart = 0;
    })
    this.customerInfo = this.cacheService?.get('customer') ?? undefined;
  }

  logout() {
    this.customerInfo = null;
    this.authCustomService.logoutCustomer();
    this.cacheService.remove('customer');
    this.router.navigate(['/'])
  }
}
