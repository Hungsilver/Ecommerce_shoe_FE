import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HoaDonService } from '../../service/hoadon.service';

@Component({
  selector: 'app-invoice-chi-tiet',
  templateUrl: './invoice-chi-tiet.component.html',
  styleUrls: ['./invoice-chi-tiet.component.scss']
})
export class InvoiceChiTietComponent implements OnInit{
  invoiceDetail:any ;
  traHang: any ;
  tongGiaHangTra = 0;


  constructor(
    private route: ActivatedRoute,
    private hoaDonService: HoaDonService
  ) {
    
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.invoiceDetail = history.state.detailData;
      this.hoaDonService.findTraHangByIdHD(this.invoiceDetail.id).then(c=>{        
        c.forEach((element:any) => {
          
          if(element.trangThai !== 3){
            this.traHang = element;

            this.traHang.listTraHangChiTiet.forEach((key:any)=>{
              this.tongGiaHangTra += key.soLuong * key.donGia;
            })
          }
        });
      })
    });
    
    
  }
}
