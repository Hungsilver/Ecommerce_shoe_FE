import { Component, Inject, OnInit  } from "@angular/core";
import { VoucherSevice } from "../service/voucher.service";
import { MAT_DIALOG_DATA,MatDialog } from "@angular/material/dialog";;
import * as moment from "moment";
import { FormBuilder,Validators,AbstractControl,ValidationErrors, FormGroup } from "@angular/forms";
// import * as moment from 'moment-timezone';

@Component({
  selector :'app-voucher-dialog',
  templateUrl:'./voucher-Dialog.component.html',
  styleUrls: ['./voucher-Dialog.component.scss'],
})

export class VoucherDialogComponent implements OnInit{
voucher:any ={};
type: any;
voucherFrom :FormGroup = new FormGroup ({}) ;
updateDate : string | null =null;
tgbd: string | null = null;
tgkt :string | null =null;

  ngOnInit(): void {


    this.voucherFrom =this.fb.group({
      ten: ['',[Validators.required,Validators.minLength(10)]],
      chietKhau: ['',[ Validators.required]],
      // ,Validators.min(0),Validators.max(10),Validators.pattern(/^[1-9]\d{0,2}?$/)
      moTa:['',[Validators.required,Validators.minLength(10)]],
      hinhThucGiamGia :[false,[Validators.required]],
      trangThai: [1, [Validators.required]],
      thoiGianBatDau :[null,[Validators.required]],
      thoiGianKetThuc :[null,[Validators.required]]
      //,Validators.pattern(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4} (0[1-9]|1[0-2]):[0-5][0-9] (AM|PM|am|pm)$/)
    });

    // if(this.data.voucher && this.data.voucher.ten && this.data.voucher.chietKhau
    //   && this.data.voucher.moTa && this.data.voucher.hinhThucGiamGia &&
    //  this.data.voucher.trangThai && this.data.voucher.thoiGianBatDau &&
    //   this.data.voucher.thoiGianKetThuc){
    //   this.tgbd = moment(this.data.voucher.thoiGianBatDau).format('MM/DD/YYYY h:mm A');
    //   this.tgkt = moment(this.data.voucher.thoiGianKetThuc).format('MM/DD/YYYY h:mm A');
    //   console.log("show ra:",this.tgbd);
    //   console.log("tg update",this.data.voucher.thoiGianBatDau);

    //   this.data.voucher.thoiGianBatDau =this.tgbd ;
    //   this.data.voucher.thoiGianKetThuc = this.tgkt;
    //   this.voucherFrom.patchValue({
    //     ten: this.data.voucher.ten,
    //     chietKhau:this.data.voucher.chietKhau,
    //     moTa:this.data.voucher.moTa,
    //     hinhThucGiamGia :this.data.voucher.hinhThucGiamGia,
    //     trangThai :this.data.voucher.trangThai,
    //     thoiGianBatDau :this.data.voucher.thoiGianBatDau,
    //     thoiGianKetThuc:this.data.voucher.thoiGianKetThuc,
    //   });
    // }


    this.type = this.data.type;

    if (this.type === 'update') {
      // this.isEditing = false;
      this.tgbd = moment(this.data.voucher.thoiGianBatDau).format('MM/DD/YYYY h:mm A');
    this.tgkt = moment(this.data.voucher.thoiGianKetThuc).format('MM/DD/YYYY h:mm A');
    console.log("show ra:",this.tgbd);
    console.log("tg update",this.data.voucher.thoiGianBatDau);

    this.data.voucher.thoiGianBatDau =this.tgbd ;
    this.data.voucher.thoiGianKetThuc = this.tgkt;
    this.voucherFrom.patchValue(this.data.voucher);
    }

    this.voucherFrom!.get('hinhThucGiamGia')!.valueChanges.subscribe((value: boolean) => {
      // Cập nhật validators cho chietKhau dựa trên giá trị mới của hinhThucGiamGia
      this.updateValidatorsForChietKhau(value);
    });
    this.voucherFrom!.get('hinhThucGiamGia')!.setValue(false);
    // this.voucherFrom!.get('trangThai')!.setValue(2);
  // Cập nhật validators cho chietKhau dựa trên giá trị mặc định của hinhThucGiamGia
  this.updateValidatorsForChietKhau(false);

  }


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private voucherService: VoucherSevice,
    private dialog: MatDialog,
      private fb :FormBuilder,
  ) {

    this.type = data.type;
    this.voucher = data.voucher;

  }

private updateValidatorsForChietKhau( hinhThucGiamGiaValue :boolean): void{
  const chietKhauControl = this.voucherFrom.get('chietKhau');
console.log("hinh thuc",hinhThucGiamGiaValue)
  // Xóa tất cả các validators hiện tại
  chietKhauControl!.clearValidators();

  if (hinhThucGiamGiaValue) {
   // Nếu là "Tiền Mặt", thêm các validators cho tiền mặt
   chietKhauControl!.setValidators([
    Validators.required,
    Validators.min(10000),
    // Validators.max(800000),
    Validators.pattern(/^[1-9]\d{0,5}$/),
  ]);


  } else{
// Nếu là "Phần Trăm", thêm các validators cho phần trăm
    chietKhauControl!.setValidators([
      Validators.required,
      Validators.min(0),
      Validators.max(10),
      Validators.pattern(/^[1-9]\d{0,2}?$/),
    ]);
  }


  // Cập nhật lại validators
  chietKhauControl!.updateValueAndValidity();
}

addVoucher(){

const voucherData = this.voucherFrom.value;

const formattedDate = moment(voucherData.thoiGianBatDau).toISOString();
const ketthucdate = moment(voucherData.thoiGianKetThuc).toISOString();
console.log(formattedDate);
const thoiGianHienTai  = moment();
if (moment(formattedDate).isSameOrBefore(thoiGianHienTai)) {
  alert('Thời gian bắt đầu phải lớn hơn thời gian hiện tại.');
  return; // Không thực hiện thêm voucher nếu kiểm tra không đúng
}
if (moment(formattedDate).isSameOrAfter(ketthucdate)) {
 alert('Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc.');
  return; // Không thực hiện thêm voucher nếu kiểm tra không đúng
}
this.voucher ={
ten: voucherData.ten,
chietKhau :voucherData.chietKhau,
moTa :voucherData.moTa,
hinhThucGiamGia :voucherData.hinhThucGiamGia,
trangThai: voucherData.trangThai,
thoiGianBatDau :formattedDate,
thoiGianKetThuc :ketthucdate,
}
console.log("tgbd:",this.voucher.thoiGianBatDau);
console.log("tgkt:",this.voucher.thoiGianKetThuc);

// this.voucher.thoiGianBatDau = moment(this.voucher.thoiGianBatDau).toISOString();
    // this.voucher.thoiGianKetThuc = moment(this.voucher.thoiGianKetThuc).toISOString();

    //   console.log('time now:', thoiGianHienTai);

    // console.log('time start:',this.voucher.thoiGianBatDau);
    // console.log('time end:',this.voucher.thoiGianKetThuc);
    // if(thoiGianBatDauValue instanceof Date){
    //   thoiGianBatDauControl!.setValue(thoiGianBatDauValue.toISOString());
    // } else if (thoiGianKetThucValue instanceof Date){
    //   thoiGianKetThucControl!.setValue(thoiGianKetThucValue.toISOString());

    // }else
  //   if( moment(thoiGianBatDauControl!.value).isSameOrAfter(thoiGianKetThucControl!.value)){
  //   console.log('time end:',thoiGianKetThucValue);
  //   alert('Thời gian Bắt đầu không được lớn hoặc bằng Thời gian kết thúc');

  // }else if(thoiGianHienTai.isBefore(thoiGianBatDauControl!.value)){

      this.voucherService.createVoucher(this.voucher).then((res) => {
      console.log('data created', res.content);
   if (res) {
    this.dialog.closeAll();
    }
});

// } else{
//   alert('Thời gian bắt đầu không được nhỏ hơn hoặc bằng thời gian hiện tại. Vui lòng nhập lại.');
// }

}

updateVoucher(){
  // this.isEditing = true;
const voucherData =this.voucherFrom.value;

const formattedDate = moment(voucherData.thoiGianBatDau).toISOString();
const ketthucdate = moment(voucherData.thoiGianKetThuc).toISOString();
const thoiGianHienTai  = moment();

if (moment(formattedDate).isSameOrBefore(thoiGianHienTai)) {
  alert('Thời gian bắt đầu phải lớn hơn thời gian hiện tại.');
  return; // Không thực hiện thêm voucher nếu kiểm tra không đúng
}
if (moment(formattedDate).isSameOrAfter(ketthucdate)) {
 alert('Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc.');
  return; // Không thực hiện thêm voucher nếu kiểm tra không đúng
}
this.voucher ={
  ten: voucherData.ten,
chietKhau :voucherData.chietKhau,
moTa :voucherData.moTa,
hinhThucGiamGia :voucherData.hinhThucGiamGia,
trangThai: voucherData.trangThai,
thoiGianBatDau :formattedDate,
thoiGianKetThuc :ketthucdate,
}
// this.updateDate = this.voucher.thoiGianBatDau;
  this.voucherService.updateVoucher(this.voucher, this.data.voucher.id).then((res) => {
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



