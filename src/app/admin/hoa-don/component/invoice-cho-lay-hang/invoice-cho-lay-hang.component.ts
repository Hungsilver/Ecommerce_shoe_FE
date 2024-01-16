import { Component, OnInit } from '@angular/core';
import { HoaDonService } from '../../service/hoadon.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-invoice-cho-lay-hang',
  templateUrl: './invoice-cho-lay-hang.component.html',
  styleUrls: ['./invoice-cho-lay-hang.component.scss']
})
export class InvoiceChoLayHangComponent implements OnInit {
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
    this.currentStatus = 3;
    this.getAll();
  }

  getAll(action?: 'prev' | 'next'): void {

    // const params: any ={
    //   ...this.searchQuery,
    //   status: this.currentStatus
    // }
    // const params: any = { ...this.searchQuery };

    if (this.currentStatus !== undefined) {
      this.searchQuery.status = this.currentStatus;
    }



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

  dangGiaoHang(id: number) {
    Swal.fire(
      {
        title: 'Xác nhận giao hàng',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy'
      }
    ).then((result) => {
      if (result.isConfirmed) {// check confirm
        this.hoadonService.updateStatus(id, 4).then(c => {
          if(c!== null){

            this.notification.success("Xác nhận giao hàng thành công");
            this.getAll();
          }
        }, err => {
          this.notification.error("Xác nhận giao hàng không thành công");
        })
      }
    })
  }

}
