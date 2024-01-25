import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { CustomerService } from '../../service/customer.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-customer-dialog',
  templateUrl: './customer-dialog.component.html',
  styleUrls: ['./customer-dialog.component.scss']
})
export class CustomerDialogComponent implements OnInit {

  customer: any = {};
  type: any;
  ngOnInit(): void {

  }
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private customerService: CustomerService,
    private dialog: MatDialog,
    private notification: ToastrService
  ) {
    this.type = data.type;
    this.customer = data.customer;
  }
  addCustomer() {
    if (!this.customer.email || !this.customer.soDienThoai) {
      this.notification.error('Vui lòng điền đầy đủ thông tin.');
      return; // Dừng hàm nếu thông tin không đầy đủ
    }

    this.customerService.createCustomer(this.customer).then(res => {
      console.log('data created', res.content);
      if (res) {
        this.dialog.closeAll();
      }
    }).catch((err) =>{
      if (err === 'Email already exists') {
        this.notification.error('Email đã tồn tại');
      }else if (err === 'Phone number already exists') {
        this.notification.error('Số điện thoại đã tồn tại');
      }else {
        this.notification.error('Lỗi khi thêm khach hang');
      }
    });
  }
  updateCustomer() {
    this.customerService.updateCustomer(this.customer, this.customer.id).then(res => {
      if (res) {
        this.dialog.closeAll();
      }
      console.log('data updated', res.content);
    })
  }
  deleteCustomer() {
    this.customerService.deleteCustomer(this.customer.id);
    this.dialog.closeAll()
  }

}
