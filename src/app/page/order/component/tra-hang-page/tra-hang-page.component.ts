import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../service/order.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { TraHangComponent } from '../tra-hang/tra-hang.component';

@Component({
  selector: 'app-tra-hang-page',
  templateUrl: './tra-hang-page.component.html',
  styleUrls: ['./tra-hang-page.component.scss']
})
export class TraHangPageComponent implements OnInit {
  listTraHang: any[] = [];
  hoaDon: any[] = [];
  trangThai = '';



  constructor(
    private orderService: OrderService,
    private dialog: MatDialog,
    private notificationService: ToastrService,
  ) {
  }
  ngOnInit(): void {
this.orderService.findTraHangByKhachHang().then(k=>{
  this.listTraHang = k;
})
  }

  openDialog(traHang: any) {
    const dialogRef = this.dialog.open(TraHangComponent, {
      width: '1500px',
      height: '650px',

      data: {
        type: "add",
        traHang: traHang,
        openDialog:7
      },
    })


    // dialogRef.afterClosed().subscribe(data => {
    //   // this.getAll();
    // })
  }
}
