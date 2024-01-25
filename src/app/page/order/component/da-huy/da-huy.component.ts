import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../service/order.service';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-da-huy',
  templateUrl: './da-huy.component.html',
  styleUrls: ['./da-huy.component.scss']
})
export class DaHuyComponent implements OnInit{
 
  listHoaDon: any[] = [];
  hoaDon: any[] = [];
  openDiglog = 3;
  constructor(
    private orderService: OrderService,
    private dialog: MatDialog,
  ) {

  }
  ngOnInit(): void {
    this.orderService.findOrderByKhachHangAndTrangThai(6).then(c => {
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
        openDialog:6
      },
    })


    // dialogRef.afterClosed().subscribe(data => {
    //   // this.getAll();
    // })
  }
}
