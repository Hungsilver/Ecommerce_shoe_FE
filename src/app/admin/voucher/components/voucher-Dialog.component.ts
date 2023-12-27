import { Component, Inject, OnInit } from "@angular/core";
import { VoucherSevice } from "../service/voucher.service";
import { MAT_DIALOG_DATA,MatDialog } from "@angular/material/dialog";
// import { Moment } from "moment";
import * as moment from "moment";
import { FormBuilder,Validators } from "@angular/forms";


@Component({
  selector :'app-voucher-dialog',
  templateUrl:'./voucher-Dialog.component.html',
  styleUrls: ['./voucher-Dialog.component.scss'],
})

export class VoucherDialogComponent implements OnInit{
voucher:any ={};
type: any;
voucherFrom :any;


  ngOnInit(): void {

  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private voucherService: VoucherSevice,
    private dialog: MatDialog,
      private fb :FormBuilder
  ) {

    this.type = data.type;
    this.voucher = data.voucher;

    this.voucherFrom =this.fb.group({
      ten: ['', Validators.required],
      chietKhau: ['', Validators.required],
    });

  }

addVoucher(){
    const thoiGianHienTai  = moment();
      console.log('time now:', thoiGianHienTai);
      this.voucher.thoiGianBatDau = moment(this.voucher.thoiGianBatDau).toISOString();
      this.voucher.thoiGianKetThuc = moment(this.voucher.thoiGianKetThuc).toISOString();
    console.log('time start:',this.voucher.thoiGianBatDau);
  //   const timestampBatDau = moment(this.voucher.thoiGianBatDau).unix();
  // const timestampKetThuc = moment(this.voucher.thoiGianKetThuc).unix();
if(this.voucher.thoiGianBatDau ==='' || this.voucher.thoiGianKetThuc ===''){
  // điều kiện này chưa đc nên check lại
    alert('Không Được để trống');
}else  if( this.voucher.thoiGianBatDau >= this.voucher.thoiGianKetThuc){
    console.log('time end:',this.voucher.thoiGianKetThuc);
    alert('Thời gian Bắt đầu không được lớn hoặc bằng Thời gian kết thúc');

  }else if(thoiGianHienTai.isBefore(this.voucher.thoiGianBatDau)){

      this.voucherService.createVoucher(this.voucher).then((res) => {
      console.log('data created', res.content);
   if (res) {
    this.dialog.closeAll();
    }
});

} else{
  alert('Thời gian bắt đầu không được nhỏ hơn thời gian hiện tại. Vui lòng nhập lại.');
}

}

updateVoucher(){
  this.voucherService.updateVoucher(this.voucher, this.voucher.id).then((res) => {
    if (res) {
      this.dialog.closeAll();
    }
    console.log('data updated', res.content);
  });

}
deleteVoucher() {
  this.voucherService.deleteVoucher(this.voucher.id);
  this.dialog.closeAll();
}




}



