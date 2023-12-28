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
      chietKhau: ['',[ Validators.required,Validators.min(0),Validators.max(10)]],
      moTa:['',Validators.required],
      hinhThucGiamGia :[1,Validators.required],
      trangThai: [1, Validators.required],
      thoiGianBatDau :['',Validators.required],
      thoiGianKetThuc :['',Validators.required]
    });

  }

addVoucher(){
  const tenValue = this.voucherFrom.get('ten').value;
  const chietKhauValue = this.voucherFrom.get('chietKhau').value;
  const moTaValue = this.voucherFrom.get('moTa').value;
const hinhThucGiamGiaValue = this.voucherFrom.get('hinhThucGiamGia').value;
const trangThaiValue =this.voucherFrom.get('trangThai').value;

const thoiGianBatDauControl = this.voucherFrom.get('thoiGianBatDau');
  const thoiGianKetThucControl = this.voucherFrom.get('thoiGianKetThuc');

  const thoiGianBatDauValue = thoiGianBatDauControl.value;
  const thoiGianKetThucValue = thoiGianKetThucControl.value;

  // thoiGianBatDauControl.setValue(thoiGianBatDauValue.toISOString());
  // thoiGianKetThucControl.setValue(thoiGianKetThucValue.toISOString());
this.voucher ={
  ten:tenValue,
  chietKhau:chietKhauValue,
  moTa: moTaValue,
  hinhThucGiamGia:hinhThucGiamGiaValue,

  thoiGianBatDau: thoiGianBatDauValue,
  thoiGianKetThuc:thoiGianKetThucValue,
  trangThai :trangThaiValue,
};

    const thoiGianHienTai  = moment();
      console.log('time now:', thoiGianHienTai);
      // this.voucher.thoiGianBatDau = moment(this.voucher.thoiGianBatDau).toISOString();
      // this.voucher.thoiGianKetThuc = moment(this.voucher.thoiGianKetThuc).toISOString();
    // console.log('time start:',this.voucher.thoiGianBatDau);
    // console.log('time end:',this.voucher.thoiGianKetThuc);
    if(thoiGianBatDauValue instanceof Date){
      thoiGianBatDauControl.setValue(thoiGianBatDauValue.toISOString());
    } else if (thoiGianKetThucValue instanceof Date){
      thoiGianKetThucControl.setValue(thoiGianKetThucValue.toISOString());

    }
else if( moment(thoiGianBatDauValue).isSameOrAfter(thoiGianKetThucValue)){
    console.log('time end:',thoiGianKetThucValue);
    alert('Thời gian Bắt đầu không được lớn hoặc bằng Thời gian kết thúc');

  }else if(thoiGianHienTai.isBefore(thoiGianBatDauValue)){

      this.voucherService.createVoucher(this.voucher).then((res) => {
      console.log('data created', res.content);
   if (res) {
    this.dialog.closeAll();
    }
});

} else{
  alert('Thời gian bắt đầu không được nhỏ hơn hoặc bằng thời gian hiện tại. Vui lòng nhập lại.');
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



