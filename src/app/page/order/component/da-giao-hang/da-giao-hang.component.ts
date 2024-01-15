import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../service/order.service';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { isAfter,isSameDay, differenceInDays  } from 'date-fns';
import { TraHangComponent } from '../tra-hang/tra-hang.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-da-giao-hang',
  templateUrl: './da-giao-hang.component.html',
  styleUrls: ['./da-giao-hang.component.scss']
})
export class DaGiaoHangComponent implements OnInit{
 
  listHoaDon: any[] = [];
  hoaDon: any[] = [];
  openDiglog = 3;
  ngayHienTai: Date = new Date();
  ngayGiaoHang: Date = new Date();
  soNgay=0;
  

  constructor(
    private orderService: OrderService,
    private dialog: MatDialog,
    private notificationService: ToastrService,
  ) {

  }
  ngOnInit(): void {
    this.orderService.findOrderByKhachHangAndTrangThai(5).then(c => {
      this.listHoaDon = c;      
    })    

  //  if(this.soSanhNgay(15)>0){
  //   alert(123)
  //  }
  // console.log(this.soSanhNgay(15));
  // console.log(differenceInDays(this.ngayHienTai, this.ngayGiaoHang));
  
  

  }

  traHang(invoice: any) {
    this.dialog.closeAll();
    this.ngayGiaoHang = new Date(invoice.ngayCapNhat)
    this.orderService.findTraHangByIdHD(invoice.id).then(t => {

      if (differenceInDays(this.ngayHienTai, this.ngayGiaoHang) > 4 || differenceInDays(this.ngayHienTai, this.ngayGiaoHang) < 0) {
        this.notificationService.error("Đơn hàng đã quá thời gian trả hàng !")
      } else if (t.length === 0) {
        const dialogRef = this.dialog.open(TraHangComponent, {
          width: '1300px',
          height: '650px',

          data: {
            type: "add",
            invoice: invoice,
            openDialog: 8
          },
        })
      }
      else {
        let daTraHang = 0;
        t.forEach((key: any) => {
          if (key.trangThai !== 3) {
            daTraHang = 1;
          } else {
            daTraHang = 0;
          }
        })
        
        if(daTraHang === 1){
          this.notificationService.error("Đơn hàng đã hoàn trả !");
        }else{
          const dialogRef = this.dialog.open(TraHangComponent, {
            width: '1300px',
            height: '650px',

            data: {
              type: "add",
              invoice: invoice,
              openDialog: 8
            },
          })
        }
      }




    })

    // dialogRef.afterClosed().subscribe(data => {
    //   // this.getAll();
    // })
  }

  openDialog(invoice: any) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '1500px',
      height: '650px',

      data: {
        type: "add",
        invoice: invoice,
        openDialog:5
      },
    })


    // dialogRef.afterClosed().subscribe(data => {
    //   // this.getAll();
    // })
  }

}
