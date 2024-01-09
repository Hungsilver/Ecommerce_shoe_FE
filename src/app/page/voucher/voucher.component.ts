import { Component, OnInit } from '@angular/core';
import { VoucherSevice } from 'src/app/admin/voucher/service/voucher.service';
@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.scss']
})
export class VoucherComponent implements OnInit{
  listVouchers!: any;



constructor(private voucherService:VoucherSevice){

}



ngOnInit(): void {
this.getall();
}

getall() : void{
this.voucherService.getVoucher().then(voucher =>{
    if(voucher  && voucher.content){
      console.log('loag');
      this.listVouchers =voucher.content;
    }
    console.log("voucher:::",this.listVouchers);

})
}



}
