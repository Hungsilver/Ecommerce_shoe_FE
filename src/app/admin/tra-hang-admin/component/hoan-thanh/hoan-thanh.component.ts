import { Component, OnInit } from '@angular/core';
import { TraHangService } from '../../service/tra-hang.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DialogTraHangComponent } from '../dialog-tra-hang/dialog-tra-hang.component';

@Component({
  selector: 'app-hoan-thanh',
  templateUrl: './hoan-thanh.component.html',
  styleUrls: ['./hoan-thanh.component.scss']
})
export class HoanThanhComponent implements OnInit {
  listTraHang: any [] = [];

  constructor(
    private traHangService: TraHangService,
    private dialog: MatDialog,
    private notificationService: ToastrService,
  ){

  }

  ngOnInit(): void {
    this.traHangService.findAllByTrangThai(2).then(c=>{
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
        openDialog: 2
      },
    })
  }

}
