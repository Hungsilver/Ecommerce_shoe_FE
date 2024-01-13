import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../../service/dashboard.service';
import { IDashBoardReq } from '../../service/dashboard.module';
import * as moment from 'moment';
import { NgToastService } from 'ng-angular-popup';
import { ToastrService } from 'ngx-toastr';
import { ChartColumnComponent } from '../components-child/chart-column/chart-column.component';

@Component({
  selector: 'app-ForDate',
  templateUrl: './ForDate.component.html',
  styleUrls: ['./ForDate.component.scss']
})
export class ForDateComponent implements OnInit {

  data7day!: IDashBoardReq[];
  data28day!: IDashBoardReq[];
  data6month!: IDashBoardReq[];
  data1nam!: IDashBoardReq[];

  startDate!: any;
  endDate!: any;
  dataForDate!: IDashBoardReq[];
  params: any = {};


  constructor(
    private dashbroardService: DashboardService,
    private notification: ToastrService,

  ) { }

  ngOnInit() {
    const dateTemp = new Date();
    this.endDate = new Date();
    this.startDate = new Date(dateTemp.setDate(dateTemp.getUTCDate() - 7));

    this.params = {
      startDate: moment.utc(this.startDate).format('YYYY-MM-DD'),
      endDate: moment.utc(this.endDate).format('YYYY-MM-DD')
    }
    this.dashbroardService.doanhThu7day().then((res) => {
      if (res) {
        this.data7day = res;
      }
    })

    this.dashbroardService.doanhThu28day().then((res) => {
      if (res) {
        this.data28day = res;
      }
    })

    this.dashbroardService.doanhThu6month().then((res) => {
      if (res) {
        this.data6month = res;
      }
    })

    this.dashbroardService.doanhThu1year().then((res) => {
      if (res) {
        this.data1nam = res;
      }
    })

    this.dashbroardService.getDataForAboutDate(this.params).then((res) => {
      if (res) {
        this.dataForDate = res;
      }
    })
  }
  getAll() {
    if (this.startDate > this.endDate) {
      this.notification.error('Ngày bắt đầu phải nhỏ hơn ngày kết thúc');
      return;
    }
    const diffInDays = moment(this.endDate).diff(moment(this.startDate), 'days');

    if (diffInDays > 30) {
      this.notification.error('Không được vượt quá 30 ngày');
      return;
    }
    this.params = {
      startDate: moment.utc(this.startDate).format('YYYY-MM-DD'),
      endDate: moment.utc(this.endDate).format('YYYY-MM-DD')
    }
    this.dashbroardService.getDataForAboutDate(this.params).then((res) => {
      this.dataForDate = res;
    })
  }

}
