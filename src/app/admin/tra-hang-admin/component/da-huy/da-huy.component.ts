import { Component, OnInit } from '@angular/core';
import { TraHangService } from '../../service/tra-hang.service';
import { DialogTraHangComponent } from '../dialog-tra-hang/dialog-tra-hang.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-da-huy',
  templateUrl: './da-huy.component.html',
  styleUrls: ['./da-huy.component.scss']
})
export class DaHuyComponent implements OnInit {
  listTraHang: any [] = [];

  constructor(
    private traHangService: TraHangService,
    private dialog: MatDialog,
    private notificationService: ToastrService,
  ){

  }

  ngOnInit(): void {
    this.traHangService.findAllByTrangThai(3).then(c=>{
      this.listTraHang = c;
    })

  }

  openDialog(traHang: any) {
    const dialogRef = this.dialog.open(DialogTraHangComponent, {
      width: '1300px',
      height: '570px',

      data: {
        type: "add",
        traHang: traHang,
        openDialog: 3
      },
    })
  }

}
