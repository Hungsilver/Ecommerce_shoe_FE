import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../service/hoadon.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  invoices !: any;
  searchQuery: any = {};
  listTotalPage: any = [];

  selectedTab: string = 'all';
  // currentStatus: number = 0;
  currentStatus: number | undefined;


  constructor(private hoadonService: InvoiceService,
    private notification: ToastrService,
    private router: Router,
  ) {
    this.searchQuery.page = 1;
    this.searchQuery.pageSize = 10;
  }

  ngOnInit(): void {
    //   this.searchQuery.page = 1;
    // this.searchQuery.pageSize = 10;
    this.getAll();
  }

  onPageChange() {
    this.getAll();
  }

  mapTabToStatus(tabId: string): number {
    switch (tabId) {
      case '0':
        return 0;
      case '1':
        return 1;
      case '2':
        return 2;
      case '3':
        return 3;
      case '4':
        return 4;
      case '5':
        return 5;
      case '6':
        return 6;
      case '7':
        return 7;
      // ...Thêm các case cho các tab khác
      default:
        return 0; // Mặc định là 'all' nếu không trùng với bất kỳ tab nào
    }
  }

  showTab(tabId: string): void {
    // this.selectedTab = tab;
    this.currentStatus = (tabId === 'all') ? undefined : this.mapTabToStatus(tabId);
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
  searchByName() {
    this.searchQuery['keyword'] = this.searchQuery.keyword;
    this.getAll();
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
