import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HoaDonService } from '../../service/hoadon.service';


@Component({
  selector: 'app-tat-ca',
  templateUrl: './tat-ca.component.html',
  styleUrls: ['./tat-ca.component.scss']
})
export class TatCaComponent implements OnInit {
  invoices !: any;
  searchQuery: any = {};
  listTotalPage: any = [];

  selectedTab: string = 'all';
  // currentStatus: number = 0;
  currentStatus: number | undefined;


  constructor(private hoadonService: HoaDonService,
    private notification: ToastrService,
    private router: Router,
  ) {
    this.searchQuery.page = 1;
    this.searchQuery.pageSize = 10;
  }
  ngOnInit(): void {
    this.getAll();
  }

  getAll(action?: 'prev' | 'next'): void {

    // const params: any ={
    //   ...this.searchQuery,
    //   status: this.currentStatus
    // }
    // const params: any = { ...this.searchQuery };

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
    if (this.currentStatus === undefined) {
      delete this.searchQuery.status;
    }
    this.hoadonService.getInvoice(this.searchQuery).then(hoadon => {
      if (hoadon && hoadon.content) {
        this.invoices = hoadon.content;
        this.listTotalPage = this.getTotalPage(hoadon.totalPages)
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

  redirectToDetail(id: number) {
    this.hoadonService.findByInvice(id).then(
      (detailData) => {
        this.router.navigate(['/admin/hoa-don', id], { state: { detailData } });
      },
      (error) => {
      }
    );
  }

}
