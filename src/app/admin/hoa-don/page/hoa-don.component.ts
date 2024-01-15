import { Component, OnInit, ViewChild } from '@angular/core';
import { HoaDonService } from '../service/hoadon.service';
import { ToastrService } from 'ngx-toastr';
import { NgxScannerQrcodeComponent, ScannerQRCodeConfig, ScannerQRCodeResult } from 'ngx-scanner-qrcode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hoa-don',
  templateUrl: './hoa-don.component.html',
  styleUrls: ['./hoa-don.component.scss']
})
export class HoaDonComponent implements OnInit {
  stat: any = {};

  result!: string;
  showQuantityInput!: boolean;
  isScanning!: boolean;
  searchResults!: string;
  isShowQrCode: boolean = false;
  timKiem = '';
  hienThi = false;
  hienThiQrcode = false;
  showInvoice = false;

  invoice: any = {};

  constructor(
    private hoaDonService: HoaDonService,
    private notificationService: ToastrService,
    private router: Router,
  ) {

  }
  ngOnInit(): void {
    this.hoaDonService.getStat().then(c => {
      this.stat = c;
      console.log(c);

    })
  }

  public config: ScannerQRCodeConfig = {
    constraints: {
      video: {
        width: window.innerWidth
      },
    },
  };

  @ViewChild('action') action!: NgxScannerQrcodeComponent;

  onEvent(e: ScannerQRCodeResult[], action?: any): void {
    // Lưu kết quả vào biến result khi có sự kiện
    if (e && e.length > 0) {
      // Chuyển đổi Int8Array thành string
      const decodedData = new TextDecoder().decode(e[0].data);
      this.result = decodedData;

      // Dừng quét khi có kết quả thành công
      this.showQuantityInput = true;

      this.hoaDonService.findByMaHoaDon(this.result).then(c => {
        if (c === null) {
          this.notificationService.error("Hóa đơn không hợp lệ !")
          this.hienThi = false;
        } else {
          this.showInvoice = true;
          this.invoice = c;
        }

      }, err => {
        this.notificationService.error("Hóa đơn không hợp lệ !")
        this.hienThi = false;
      })

      this.stopScanning();
      this.turnOfQRCode();
    }
  }

  stopScanning(): void {
    // Dừng quét và tắt camera
    this.handle(this.action, 'stop');
    this.isScanning = false;
  }


  handle(action: any, fn: string): void {
    const playDeviceFacingBack = (devices: any[]) => {
      const device = devices.find(f => (/back|rear|environment/gi.test(f.label)));
      action.playDevice(device ? device.deviceId : devices[0].deviceId);
    }

    if (fn === 'start') {
      action[fn](playDeviceFacingBack).subscribe((r: any) => console.log(fn, r), alert);
    } else {
      action[fn]().subscribe((r: any) => console.log(fn, r), alert);
    }
  }

  showQRCode() {
    this.hienThiQrcode = true;
    this.isShowQrCode = !this.isShowQrCode;
  }

  turnOfQRCode() {
    this.isShowQrCode = false;
  }

  timKiemMaHoaDon() {

    this.hoaDonService.findByMaHoaDon(this.timKiem).then(c => {
      if (c === null) {
        this.notificationService.error("Hóa đơn không hợp lệ !")
        this.hienThi = false;
      } else {
        this.invoice = c;
        this.showInvoice = true;
      }

    }, err => {
      this.notificationService.error("Hóa đơn không hợp lệ !")
      this.hienThi = false;
    })
  }

  redirectToDetail(id: number) {
    this.hoaDonService.findByInvice(id).then(
      (detailData) => {
        this.router.navigate(['/admin/hoa-don', id], { state: { detailData } });
      },
      (error) => {
      }
    );
  }

}
