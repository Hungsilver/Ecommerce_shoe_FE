import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../service/order.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

// import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-cho-lay-hang',
  templateUrl: './cho-lay-hang.component.html',
  styleUrls: ['./cho-lay-hang.component.scss']
})
export class ChoLayHangComponent implements OnInit {
  listHoaDon: any[] = [];
  hoaDon: any[] = [];
  openDiglog = 3;
  constructor(
    private orderService: OrderService,
    private dialog: MatDialog,
  ) {

  }
  ngOnInit(): void {
    this.orderService.findOrderByKhachHangAndTrangThai(3).then(c => {
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
        openDialog:3
      },
    })


    // dialogRef.afterClosed().subscribe(data => {
    //   // this.getAll();
    // })
  }



}
