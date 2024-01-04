import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../service/order.service';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-da-giao-hang',
  templateUrl: './da-giao-hang.component.html',
  styleUrls: ['./da-giao-hang.component.scss']
})
export class DaGiaoHangComponent implements OnInit{
 
  listHoaDon: any[] = [];
  hoaDon: any[] = [];
  openDiglog = 3;
  constructor(
    private orderService: OrderService,
    private dialog: MatDialog,
  ) {

  }
  ngOnInit(): void {
    this.orderService.findOrderByKhachHangAndTrangThai(5).then(c => {
      this.listHoaDon = c;

    })
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
