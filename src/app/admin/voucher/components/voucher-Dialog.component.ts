import { Component, Inject, OnInit } from "@angular/core";
import { VoucherSevice } from "../service/voucher.service";
import { MAT_DIALOG_DATA,MatDialog } from "@angular/material/dialog";
// import { Moment } from "moment";
import * as moment from "moment";
import { FormBuilder,Validators,AbstractControl,ValidationErrors } from "@angular/forms";


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
    this.voucherFrom.get('hinhThucGiamGia').setValue(false);
      this.voucherFrom.get('trangThai').setValue(2);
    // Cập nhật validators cho chietKhau dựa trên giá trị mặc định của hinhThucGiamGia
    this.updateValidatorsForChietKhau(false);

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
      chietKhau: ['',[ Validators.required]],
      // ,Validators.min(0),Validators.max(10),Validators.pattern(/^[1-9]\d{0,2}?$/)
      moTa:['',Validators.required],
      hinhThucGiamGia :[false,Validators.required],
      trangThai: [2, Validators.required],
      thoiGianBatDau :['',Validators.required],
      thoiGianKetThuc :['',Validators.required]
    });

    this.voucherFrom.get('hinhThucGiamGia').valueChanges.subscribe((value: boolean) => {
      // Cập nhật validators cho chietKhau dựa trên giá trị mới của hinhThucGiamGia
      this.updateValidatorsForChietKhau(value);
    });



  }

private updateValidatorsForChietKhau( hinhThucGiamGiaValue :boolean): void{
  const chietKhauControl = this.voucherFrom.get('chietKhau');
console.log("hinh thuc",hinhThucGiamGiaValue)
  // Xóa tất cả các validators hiện tại
  chietKhauControl.clearValidators();

  if (hinhThucGiamGiaValue) {
   // Nếu là "Tiền Mặt", thêm các validators cho tiền mặt
   chietKhauControl.setValidators([
    Validators.required,
    Validators.min(10000),
    // Validators.max(800000),
    Validators.pattern(/^[1-9]\d{0,5}$/),
  ]);


  } else{
// Nếu là "Phần Trăm", thêm các validators cho phần trăm
    chietKhauControl.setValidators([
      Validators.required,
      Validators.min(0),
      Validators.max(10),
      Validators.pattern(/^[1-9]\d{0,2}?$/),
    ]);
  }


  // Cập nhật lại validators
  chietKhauControl.updateValueAndValidity();
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
      this.voucher.thoiGianBatDau = moment(this.voucher.thoiGianBatDau).toISOString();
      this.voucher.thoiGianKetThuc = moment(this.voucher.thoiGianKetThuc).toISOString();
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



