import { Component, OnInit } from '@angular/core';
import { IStatsProductReq } from '../../service/dashboard.module';
import { DashboardService } from '../../service/dashboard.service';

@Component({
  selector: 'app-ForProduct',
  templateUrl: './ForProduct.component.html',
  styleUrls: ['./ForProduct.component.scss']
})
export class ForProductComponent implements OnInit {

  dataStatProduct: any;
  data7day!: IStatsProductReq[];
  data28day!: IStatsProductReq[];
  data1month!: IStatsProductReq[];
  data6month!: IStatsProductReq[];
  data1nam!: IStatsProductReq[];

  constructor(
    private dashbroardService: DashboardService
  ) { }

  ngOnInit() {
    this.dataStatProduct = 1;
    this.dashbroardService.productFor7Date().then((res) => {
      if (res) {
        this.data7day = res;
      }
    })

    this.dashbroardService.productFor28Date().then((res) => {
      if (res) {
        this.data28day = res;
      }
    })

    this.dashbroardService.productFor6month().then((res) => {
      if (res) {
        this.data6month = res;
      }
    })

    this.dashbroardService.productFor1year().then((res) => {
      if (res) {
        this.data1nam = res;
      }
    })
  }

}
