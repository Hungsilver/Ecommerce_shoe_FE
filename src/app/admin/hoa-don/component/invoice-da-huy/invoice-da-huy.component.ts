import { Component, OnInit } from '@angular/core';
import { HoaDonService } from '../../service/hoadon.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice-da-huy',
  templateUrl: './invoice-da-huy.component.html',
  styleUrls: ['./invoice-da-huy.component.scss']
})
export class InvoiceDaHuyComponent implements OnInit {
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
    this.currentStatus = 6;
    this.getAll();
  }

  getAll(action?: 'prev' | 'next'): void {

    // const params: any ={
    //   ...this.searchQuery,
    //   status: this.currentStatus
    // }
    const params: any = { ...this.searchQuery };

    if (this.currentStatus !== undefined) {
      params.status = this.currentStatus;
    }



    if (action) {
      if (action === 'prev' && Number(this.searchQuery.page) > 1) {
        this.searchQuery.page = this.searchQuery.page - 1
      }
      if (action === 'next' &&
        Number(this.searchQuery.page) + 1 <= this.listTotalPage.length) {
        this.searchQuery.page = this.searchQuery.page + 1
      }

      Object.keys(params).forEach(key => {
        if (params[key] === null || params[key] === '' || params[key] === undefined) {
          delete params[key];
        }
      });

    }
    if (this.currentStatus === undefined) {
      delete params.status;
    }
    this.hoadonService.getInvoice(params).then(hoadon => {
      if (hoadon && hoadon.content) {
        this.invoices = hoadon.content;
        this.listTotalPage = this.getTotalPage(hoadon.totalPages)
        console.log(hoadon)
      }

    })
    console.log(this.searchQuery)
  }

  getTotalPage(totalPages: number) {
    let listTotalPage = []

    for (let i = 1; i <= totalPages; i++) {
      listTotalPage.push(i);
    }
    return listTotalPage;
  }

  redirectToDetail(id: number) {
    console.log('Navigating to InvoiceDetail with ID:', id);

    this.hoadonService.findByInvice(id).then(
      (detailData) => {
        console.log('Detail Data:', detailData);
        this.router.navigate(['/admin/hoa-don', id], { state: { detailData } });
      },
      (error) => {
        console.error('Error fetching detail:', error);
      }
    );
  }
}
