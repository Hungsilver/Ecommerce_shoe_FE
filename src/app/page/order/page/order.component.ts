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
  currentDate: Date = new Date();
  specificDate: Date = new Date('2024-01-07'); // Lưu ý: '2023-12-20' là định dạng ISO 8601

  constructor(
    private orderService: OrderService
  ){
    
  }
  ngOnInit(): void {
    this.items = [{ label: 'Tài khoản' }];

    this.home = { icon: '', label: 'Trang chủ', routerLink: '/' };

  }
  


}
