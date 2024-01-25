import { Component, OnInit } from '@angular/core';
import { TraHangService } from '../service/tra-hang.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogTraHangComponent } from '../component/dialog-tra-hang/dialog-tra-hang.component';

@Component({
  selector: 'app-tra-hang-admin',
  templateUrl: './tra-hang-admin.component.html',
  styleUrls: ['./tra-hang-admin.component.scss']
})
export class TraHangAdminComponent implements OnInit{
  params: any = {};
  listTraHang:any[]=[];
  show = false;
  timKiem = '';

  constructor(
    private traHangService: TraHangService,
    private notificationService: ToastrService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
  ) {

  }

  ngOnInit(): void {

  }

  timKiemHoaDon(){
    this.params.maHoaDon = this.timKiem;

    this.traHangService.findByTraHangMaHoaDon(this.params).then(c=>{
      if(c.length > 0){
        this.listTraHang = c;
        this.show = true;
      }else{
        this.show = false;
        this.notificationService.error("Không tìm thấy hóa đơn trả hàng");
      }
    },err=>{
      this.show = false;
      this.notificationService.error("Không tìm thấy hóa đơn trả hàng");
    })

  }

  openDialog(traHang: any) {
    const dialogRef = this.dialog.open(DialogTraHangComponent, {
      width: '1300px',
      height: '570px',

      data: {
        type: 'add',
        traHang: traHang,
        openDialog: traHang.trangThai,
      },
    });
  }

}
