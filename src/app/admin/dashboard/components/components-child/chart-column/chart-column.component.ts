import { Component, Input, OnInit } from '@angular/core';
import { IDashBoardReq, IDataHeader } from '../../../service/dashboard.module';

@Component({
  selector: 'app-chart-column',
  templateUrl: './chart-column.component.html',
  styleUrls: ['./chart-column.component.scss']
})
export class ChartColumnComponent implements OnInit {
  @Input() dataChart: any;

  constructor() { }

  data: any;
  dataHeader: any = {};

  options: any;

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    let tongDonHangArray: number[] = [];
    let tongDoanhThuArray: number[] = [];
    let ngayThangArray: string[] = [];
    this.dataChart.forEach((item: IDashBoardReq) => {
      tongDonHangArray.push(item.tongDonHang);
      tongDoanhThuArray.push(item.tongDoanhThu);
      ngayThangArray.push(item.ngayThang);
    });
    this.dataHeader.tongDonHang = tongDonHangArray.reduce((num, currentNum) => num + currentNum, 0);
    this.dataHeader.tongDoanhThu = tongDoanhThuArray.reduce((num, currentNum) => num + currentNum, 0);
    this.dataHeader.tbTongDoanhThu = tongDoanhThuArray.reduce((num, currentNum) => num + currentNum, 0) / ngayThangArray.length;
    this.data = {
      labels: ngayThangArray, //list ngay thang
      datasets: [
        {
          label: 'Tổng doanh thu',
          backgroundColor: documentStyle.getPropertyValue('--blue-500'),
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          yAxisID: 'y-axis-left',
          data: tongDoanhThuArray //data tong tien
        },
        {
          label: 'Tổng đơn hàng',
          backgroundColor: documentStyle.getPropertyValue('--pink-500'),
          borderColor: documentStyle.getPropertyValue('--pink-500'),
          // yAxisID: 'y-axis-right',
          data: tongDonHangArray //data tong don hang
        }
      ]
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          id: 'y-axis-left',
          position: 'left',
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500
            }
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          id: 'y-axis-right',
          position: 'right',
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }
}
