import { Component, OnInit } from '@angular/core';
import { TraHangService } from '../../service/tra-hang.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DialogTraHangComponent } from '../dialog-tra-hang/dialog-tra-hang.component';

@Component({
  selector: 'app-cho-xu-ly',
  templateUrl: './cho-xu-ly.component.html',
  styleUrls: ['./cho-xu-ly.component.scss']
})
export class ChoXuLyComponent implements OnInit {
  listTraHang: any [] = [];

  constructor(
    private traHangService: TraHangService,
    private dialog: MatDialog,
    private notificationService: ToastrService,
  ){

  }

  ngOnInit(): void {
    this.traHangService.findAllByTrangThai(1).then(c=>{
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
        openDialog: 1
      },
    })
  }

}
