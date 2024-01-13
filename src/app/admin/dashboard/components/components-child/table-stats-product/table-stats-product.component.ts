import { Component, Input, OnInit } from '@angular/core';
import { IDataHeader, IStatsProductReq } from '../../../service/dashboard.module';

@Component({
  selector: 'app-table-stats-product',
  templateUrl: './table-stats-product.component.html',
  styleUrls: ['./table-stats-product.component.scss']
})
export class TableStatsProductComponent implements OnInit {
  @Input() dataTable: any;
  dataHeaderStatsP: any = {};
  searchQuery: any;
  listTotalPage: any;

  constructor() { }

  ngOnInit() {
    let tongSL: number[] = [];
    let doanhThus: number[] = [];
    !!this.dataTable && this.dataTable.forEach((item: IStatsProductReq) => {
      tongSL.push(item.soLuong);
      doanhThus.push(item.doanhThu);
    });
    this.dataHeaderStatsP.tongDoanhThu = doanhThus.reduce((num, currentNum) => num + currentNum, 0);
    this.dataHeaderStatsP.tongSP = this.dataTable?.length;
  }

  getAll(action?: 'prev' | 'next'): void {
    if (action) {
      if (action === 'prev' && Number(this.searchQuery.page) > 1) {
        this.searchQuery.page = this.searchQuery.page - 1
      }
      if (action === 'next' &&
        Number(this.searchQuery.page) + 1 <= this.listTotalPage.length) {
        this.searchQuery.page = this.searchQuery.page + 1
      }
      Object.keys(this.searchQuery).forEach(key => {
        if (this.searchQuery[key] === null || this.searchQuery[key] === '') {
          delete this.searchQuery[key];
        }
      });
    }
    // this.colorService.getColors(this.searchQuery).then(color => {
    //   if (color && color.content) {
    //     this.colors = color.content;
    //     this.listTotalPage = this.getTotalPage(color.totalPages)
    //     console.log(color)
    //   }

    // })
  }


  getTotalPage(totalPages: number) {
    let listTotalPage = []

    for (let i = 1; i <= totalPages; i++) {
      listTotalPage.push(i);
    }
    return listTotalPage;
  }

  searchByName() {
    this.searchQuery['keyword'] = this.searchQuery.keyword;
    this.getAll();
  }
  openDialogEdit(a: any) { }
  openDialogDelete(a: any) { }
}
