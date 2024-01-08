import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../service/dashboard.service';
import { IStat } from '../../service/dashboard.module';

@Component({
  selector: 'app-Orders',
  templateUrl: './Orders.component.html',
  styleUrls: ['./Orders.component.scss']
})
export class OrdersComponent implements OnInit {
  selectedSortBy!: any;
  dataOrders: any;
  stat!: IStat;

  constructor(
    private dbService: DashboardService
  ) { }

  ngOnInit() {
    this.dbService.getAllHD().then((res) => {
      if (res) {
        this.dataOrders = res.content;
      }
    })

    this.dbService.getStat().then((res) => {
      if (res) {
        this.stat = res;
      }
    })
  }
}
