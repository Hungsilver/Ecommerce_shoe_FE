import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../service/order.service';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cho-xac-nhan',
  templateUrl: './cho-xac-nhan.component.html',
  styleUrls: ['./cho-xac-nhan.component.scss']
})
export class ChoXacNhanComponent implements OnInit{
  
  listHoaDon: any[] = [];
  hoaDon: any[] = [];
  openDiglog = 3;
  params: any = [];
  constructor(
    private orderService: OrderService,
    private dialog: MatDialog,
    private notificationService: ToastrService,
  ) {

  }
  ngOnInit(): void {
    this.loadData();
  }

  openDialog(invoice: any) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '1500px',
      height: '650px',

      data: {
        type: "add",
        invoice: invoice,
        openDialog:2
      },
    })
  }

  loadData(){
    this.orderService.findOrderByKhachHangAndTrangThai(2).then(c => {
      this.listHoaDon = c;
      console.log(c);
      
    })
  }

  huyDon(id:number){
    Swal.fire(
      {
        title: 'Xác nhận hủy đơn hàng',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy'
      }
    ).then((result) => {
      if (result.isConfirmed) {
        this.orderService.huyDon(id).then(c=>{
          this.loadData();
          this.notificationService.success('Hủy đơn hàng thành công !');
        })
      }
    })
  }

  
}
