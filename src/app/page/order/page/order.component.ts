import { Component, OnInit } from '@angular/core';
import { OrderService } from '../service/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit{
  items: any;
  home: any;

  constructor(
    private orderService: OrderService
  ){
    
  }
  ngOnInit(): void {
    this.items = [{ label: 'Tài khoản' }];

    this.home = { icon: '', label: 'Trang chủ', routerLink: '/' };

  }

}
