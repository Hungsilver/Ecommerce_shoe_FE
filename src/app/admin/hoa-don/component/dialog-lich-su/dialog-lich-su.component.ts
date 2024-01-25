import { Component, Inject, OnInit } from '@angular/core';
import { HoaDonService } from '../../service/hoadon.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-lich-su',
  templateUrl: './dialog-lich-su.component.html',
  styleUrls: ['./dialog-lich-su.component.scss']
})
export class DialogLichSuComponent implements OnInit {
  ghiChu !: any;
  searchQuery: any = {};
  listTotalPage: any = [];

  selectedTab: string = 'all';
  // currentStatus: number = 0;
  currentStatus: number | undefined;

  idHoaDon:number | undefined;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private hoadonService: HoaDonService,
    private notification: ToastrService,
    private router: Router,
    private dialog: MatDialog,
  ) {
    this.searchQuery.page = 1;
    this.searchQuery.pageSize = 10;
    this.searchQuery.idHoaDon = data.idHoaDon;
  }
  ngOnInit(): void {
    this.getAll();
  }

  getAll(action?: 'prev' | 'next'): void {

    // const params: any ={
    //   ...this.searchQuery,
    //   status: this.currentStatus
    // }
    const params: any = { ...this.searchQuery };

    // if (this.currentStatus !== undefined) {
    //   params.status = this.currentStatus;
    // }



    if (action) {
      if (action === 'prev' && Number(this.searchQuery.page) > 1) {
        this.searchQuery.page = this.searchQuery.page - 1
      }
      if (action === 'next' &&
        Number(this.searchQuery.page) + 1 <= this.listTotalPage.length) {
        this.searchQuery.page = this.searchQuery.page + 1
      }

      Object.keys(this.searchQuery).forEach(key => {
        if (this.searchQuery[key] === null || this.searchQuery[key] === '' || this.searchQuery[key] === undefined) {
          delete this.searchQuery[key];
        }
      });

    }
    // if (this.currentStatus === undefined) {
    //   delete params.status;
    // }
    this.hoadonService.getGhiChu(this.searchQuery).then(c => {
      if (c && c.content) {
        this.ghiChu = c.content;
        this.listTotalPage = this.getTotalPage(c.totalPages)
      }

    })
  }

  getTotalPage(totalPages: number) {
    let listTotalPage = []

    for (let i = 1; i <= totalPages; i++) {
      listTotalPage.push(i);
    }
    return listTotalPage;
  }

  closeDialog() {
    this.dialog.closeAll();
  }
}

