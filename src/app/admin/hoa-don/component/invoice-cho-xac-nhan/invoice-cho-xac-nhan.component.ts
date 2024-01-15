import { Component, OnInit } from '@angular/core';
import { HoaDonService } from '../../service/hoadon.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-invoice-cho-xac-nhan',
  templateUrl: './invoice-cho-xac-nhan.component.html',
  styleUrls: ['./invoice-cho-xac-nhan.component.scss']
})
export class InvoiceChoXacNhanComponent implements OnInit {
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
    this.currentStatus = 2;
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
        console.error('Error fetching detail:', error);
      }
    );
  }

  huyDon(id: number) {
    Swal.fire(
      {
        title: 'Xác nhận hủy đơn hàng',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy'
      }
    ).then((result) => {
      if (result.isConfirmed) {// check confirm
        this.hoadonService.updateStatus(id, 6).then(c => {
          if(c!== null){
            this.notification.success("Xác nhận hủy đơn hàng thành công");
            this.getAll();
          }
        }, err => {
          this.notification.error("Xác nhận hủy đơn hàng không thành công");
        })
      }
    })
  }

  choLayHang(id: number) {
    Swal.fire(
      {
        title: 'Xác nhận đơn hàng',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy'
      }
    ).then((result) => {
      if (result.isConfirmed) {// check confirm
        this.hoadonService.updateStatus(id, 3).then(c => {
          if(c!== null){
            Swal.fire(
              {
                title: 'In hóa đơn',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Xác nhận',
                cancelButtonText: 'Hủy'
              }
            ).then((result) => {
              if (result.isConfirmed) {// check confirm
                this.exportPDF(id);
              }
            })
            this.notification.success("Xác nhận đơn hàng thành công");
            this.getAll();
          }
        }, err => {
          this.notification.error("Xác nhận đơn hàng không thành công");
        })
      }
    })
  }

  exportPDF(id:number): void {

    this.hoadonService.exportPdf(id).subscribe(
      (data) => {
        this.downloadFile(data);
      },
      (error) => {
        console.error('Error exporting PDF', error);
      }
    );
  }

  private downloadFile(data: Blob): void {
    const blob = new Blob([data], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'hoadon.pdf';
    link.click();
  }

}
