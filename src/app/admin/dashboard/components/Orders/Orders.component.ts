import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Orders',
  templateUrl: './Orders.component.html',
  styleUrls: ['./Orders.component.scss']
})
export class OrdersComponent implements OnInit {
  selectedSortBy!: any;

  constructor() { }

  ngOnInit() {
  }

}
