import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Html5QrcodeScanner } from 'html5-qrcode';
import {
  NgxScannerQrcodeComponent,
  ScannerQRCodeConfig,
  ScannerQRCodeResult,
} from 'ngx-scanner-qrcode';
import { TraHangService } from '../../service/tra-hang.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogTraHangComponent } from '../dialog-tra-hang/dialog-tra-hang.component';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cho-xac-nhan',
  templateUrl: './cho-xac-nhan.component.html',
  styleUrls: ['./cho-xac-nhan.component.scss'],
})
export class ChoXacNhanComponent implements OnInit {
  listTraHang: any[] = [];

  constructor(
    private traHangService: TraHangService,
    private dialog: MatDialog,
    private notificationService: ToastrService
  ) {}

  ngOnInit(): void {
    this.traHangService.findAllByTrangThai(0).then((c) => {
      this.listTraHang = c;
    });
  }

  openDialog(traHang: any) {
    const dialogRef = this.dialog.open(DialogTraHangComponent, {
      width: '1300px',
      height: '570px',

      data: {
        type: 'add',
        traHang: traHang,
        openDialog: 0,
      },
    });
  }

  huyDon(id: number) {
    Swal.fire({
      title: 'Xác nhận hủy đơn hàng trả',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        this.traHangService.updateStatus(id, 3).then((c) => {
          this.notificationService.success(
            'Xác nhận hủy đơn hàng trả thành công !'
          );
          this.traHangService.findAllByTrangThai(0).then((c) => {
            this.listTraHang = c;
          });
          setTimeout(() => {
            window.location.reload();
          }, 500);
        });
      }
    });
  }

  xacNhan(id: number) {
    Swal.fire({
      title: 'Xác nhận đơn hàng trả',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        this.traHangService.updateStatus(id, 1).then((c) => {
          this.notificationService.success(
            'Xác nhận đơn hàng trả thành công !'
          );
          this.traHangService.findAllByTrangThai(0).then((c) => {
            this.listTraHang = c;
          });
          setTimeout(() => {
            window.location.reload();
          }, 500);
        });
      }
    });
  }
}
