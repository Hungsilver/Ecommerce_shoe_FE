import { Component, OnInit, ViewChild } from '@angular/core';
import { TraHangService } from '../../service/tra-hang.service';
import { ToastrService } from 'ngx-toastr';
import { NgxScannerQrcodeComponent, ScannerQRCodeConfig, ScannerQRCodeResult } from 'ngx-scanner-qrcode';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { DialogTraHangComponent } from '../dialog-tra-hang/dialog-tra-hang.component';
import { isAfter, isSameDay, differenceInDays } from 'date-fns';
import { DialogUpdateCtspComponent } from '../dialog-update-ctsp/dialog-update-ctsp.component';

@Component({
  selector: 'app-new-tra-hang',
  templateUrl: './new-tra-hang.component.html',
  styleUrls: ['./new-tra-hang.component.scss']
})
export class NewTraHangComponent implements OnInit {

  result!: string;
  showQuantityInput!: boolean;
  isScanning!: boolean;
  searchResults!: string;
  isShowQrCode: boolean = false;

  hoaDon: any = {};
  timKiem = '';
  hienThi = false;
  hienThiQrcode = false;
  listSanPhamTra: any[] = [];
  checkedAll: any;
  clickCount = 0;
  checked: Set<number> = new Set();
  checkedItems: any = [];
  tongTienHangTra = 0;
  tienTraKhach = 0;
  tienGiam = 0;
  tongSoLuongBanDau = 0;
  soLuongTra = 0;
  loiSoLuong = false;
  invoiceDetail: any = {};
  loiGhiChu = false;
  ghiChu = '';
  traHangChiTiets: any[] = [];
  ngayHienTai: Date = new Date();
  ngayGiaoHang: Date = new Date();

  constructor(
    private traHangService: TraHangService,
    private notificationService: ToastrService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
  ) {

  }

  form: FormGroup = this.formBuilder.group({
    id: null,
    idHoaDon: null,
    lyDo: null,
    ngayTao: null,
    ngayCapNhat: null,
    tienTraKhach: null,
    trangThai: null,
    traHangChiTietRequests: null
  });

  ngOnInit(): void {

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

      this.traHangService.findByMaHoaDon(this.result).then(c => {
        this.traHangService.findTraHangByIdHD(c.id).then(t => {
          if (t === null) {
            if (c === null) {
              this.notificationService.error("Hóa đơn không hợp lệ !")
              this.hienThi = false;
            } else if (differenceInDays(this.ngayHienTai, this.ngayGiaoHang) > 5 || differenceInDays(this.ngayHienTai, this.ngayGiaoHang) < 0) {
              this.notificationService.error("Hóa đơn đã quá hạn trả hàng !")
              this.hienThi = false;
            } else if (c !== null && c.trangThai === 5) {
              c.listHoaDonChiTiet.forEach((key: any) => {
                this.tongSoLuongBanDau += key.soLuong;
              })

              this.hoaDon = c;
              this.hienThi = true;
            } else {
              this.notificationService.error("Hóa đơn không hợp lệ !")
              this.hienThi = false;
            }
          } else {
            this.notificationService.error("Hóa đơn đã trả hàng !")
            this.hienThi = false;
          }
        })


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
    if (this.timKiem === '') {
      this.hienThi = false;
    } else {
      this.traHangService.findByMaHoaDon(this.timKiem).then(c => {
        this.traHangService.findTraHangByIdHD(c.id).then(t => {
          if (t.length === 0) {
            this.ngayGiaoHang = new Date(c.ngayCapNhat)
            if (c === null) {
              this.notificationService.error("Hóa đơn không hợp lệ !")
              this.hienThi = false;
            } else if (differenceInDays(this.ngayHienTai, this.ngayGiaoHang) > 5 || differenceInDays(this.ngayHienTai, this.ngayGiaoHang) < 0) {
              this.notificationService.error("Hóa đơn đã quá hạn trả hàng !")
              this.hienThi = false;
            } else if (c !== null && c.trangThai === 5) {
              c.listHoaDonChiTiet.forEach((key: any) => {
                this.tongSoLuongBanDau += key.soLuong;
              })

              this.hoaDon = c;
              this.hienThi = true;
            } else {
              this.notificationService.error("Hóa đơn không hợp lệ !")
              this.hienThi = false;
            }
          }else {
            let daTraHang = 0;
            t.forEach((key: any) => {
              if (key.trangThai !== 3) {
                daTraHang = 1;
              } else {
                daTraHang = 0;
              }
            })

            if(daTraHang === 1){
              this.notificationService.error("Hóa đơn đã trả hàng !")
            }else{
              this.ngayGiaoHang = new Date(c.ngayCapNhat)
              if (c === null) {
                this.notificationService.error("Hóa đơn không hợp lệ !")
                this.hienThi = false;
              } else if (differenceInDays(this.ngayHienTai, this.ngayGiaoHang) > 5 || differenceInDays(this.ngayHienTai, this.ngayGiaoHang) < 0) {
                this.notificationService.error("Hóa đơn đã quá hạn trả hàng !")
                this.hienThi = false;
              } else if (c !== null && c.trangThai === 5) {
                c.listHoaDonChiTiet.forEach((key: any) => {
                  this.tongSoLuongBanDau += key.soLuong;
                })
  
                this.hoaDon = c;
                this.hienThi = true;
              } else {
                this.notificationService.error("Hóa đơn không hợp lệ !")
                this.hienThi = false;
              }
            }
          }
        })

      }, err => {
        this.notificationService.error("Hóa đơn không hợp lệ !")
        this.hienThi = false;
      })
    }

  }

  capNhatSoLuong($event: any, index: number) {
    this.loiSoLuong = false;
    const idHdct = this.listSanPhamTra[index].id;

    this.traHangService.findByIdHDCT(idHdct).then(c => {
      if ($event.target.value > c.soLuong || $event.target.value < 1) {
        this.notificationService.error("Số lượng trả hàng không hơp lệ !")
        this.loiSoLuong = true;
      } else {

        this.invoiceDetail = c;
        this.invoiceDetail.soLuong = $event.target.value;


        //
        this.tienTraKhach = 0;
        this.tienGiam = 0;
        this.soLuongTra = 0;
        this.tongTienHangTra = 0;

        if (this.listSanPhamTra.length > 0) {
          this.listSanPhamTra = this.listSanPhamTra.filter((item: { id: number; }) => item.id !== idHdct);
          this.listSanPhamTra.splice(index, 0, this.invoiceDetail);


          if (this.hoaDon.phieuGiamGia === null) {
            this.listSanPhamTra.forEach((key: any) => {
              this.tienTraKhach += (key.soLuong * key.donGia)
              this.tongTienHangTra += key.soLuong * key.donGia
            })
            this.tienTraKhach += this.hoaDon.phiVanChuyen;
          } else if (this.hoaDon.phieuGiamGia.hinhThucGiamGia === false) {
            this.listSanPhamTra.forEach((key: any) => {
              this.tongTienHangTra += key.soLuong * key.donGia
              this.tienTraKhach += (key.soLuong * key.donGia)
              this.tienGiam += ((key.soLuong * key.donGia) * this.hoaDon.phieuGiamGia.chietKhau) / 100
            })
            this.tienTraKhach -= this.tienGiam
            this.tienTraKhach += this.hoaDon.phiVanChuyen;
          } else {
            this.listSanPhamTra.forEach((key: any) => {
              this.tongTienHangTra += key.soLuong * key.donGia
              this.tienTraKhach += (key.soLuong * key.donGia)
              this.soLuongTra += key.soLuong;
            })
            this.tienGiam = (this.soLuongTra * (this.hoaDon.phieuGiamGia.chietKhau / this.tongSoLuongBanDau));
            this.tienTraKhach -= this.tienGiam
            this.tienTraKhach += this.hoaDon.phiVanChuyen;
          }
        }
      }
    })
  }


  toggleChecked(itemId: number): void {
    // Đảo ngược trạng thái của itemId trong Set
    this.tongTienHangTra = 0;
    if (this.checked.has(itemId)) {
      this.checkedItems = [];
      this.listSanPhamTra = [];
      this.checked.delete(itemId);
    } else {
      this.checked.add(itemId);
      this.hoaDon.listHoaDonChiTiet.forEach((key: any) => {
        this.checkedItems.push(key.id);
        this.listSanPhamTra.push(key);
        this.tongTienHangTra += key.soLuong * key.donGia
      })


      this.tienTraKhach = 0;
      this.tienGiam = 0;
      this.soLuongTra = 0;
      if (this.hoaDon.phieuGiamGia === null) {
        this.hoaDon.listHoaDonChiTiet.forEach((key: any) => {
          this.tienTraKhach += (key.soLuong * key.donGia)
        })
        this.tienTraKhach += this.hoaDon.phiVanChuyen;
      } else if (this.hoaDon.phieuGiamGia.hinhThucGiamGia === false) {
        this.hoaDon.listHoaDonChiTiet.forEach((key: any) => {
          this.tienTraKhach += (key.soLuong * key.donGia)
          this.tienGiam += ((key.soLuong * key.donGia) * this.hoaDon.phieuGiamGia.chietKhau) / 100
        })
        this.tienTraKhach -= this.tienGiam
        this.tienTraKhach += this.hoaDon.phiVanChuyen;
      } else {
        this.hoaDon.listHoaDonChiTiet.forEach((key: any) => {
          this.tienTraKhach += (key.soLuong * key.donGia)
          this.soLuongTra += key.soLuong;
        })
        this.tienGiam = (this.soLuongTra * (this.hoaDon.phieuGiamGia.chietKhau / this.tongSoLuongBanDau));
        this.tienTraKhach -= this.tienGiam
        this.tienTraKhach += this.hoaDon.phiVanChuyen;
      }

    }
  }

  isChecked(itemId: number): boolean {

    // Kiểm tra xem itemId có trong Set không
    return this.checked.has(itemId);
  }


  onCheckboxChange(event: any, itemId: number) {
    this.tongTienHangTra = 0;
    if (event.target.checked) {
      // Nếu checkbox được chọn, thêm giá trị vào mảng
      this.hoaDon.listHoaDonChiTiet.forEach((key: any) => {
        if (key.id === itemId) {
          this.listSanPhamTra.push(key);
          this.listSanPhamTra.forEach((c: any) => {
            this.tongTienHangTra += c.soLuong * c.donGia;
          })
          return;
        }
      })
      this.checkedItems.push(itemId);
      this.checkedItems;

      this.tienTraKhach = 0;
      this.tienGiam = 0;
      this.soLuongTra = 0;
      if (this.hoaDon.phieuGiamGia === null) {
        this.listSanPhamTra.forEach((key: any) => {
          this.tienTraKhach += (key.soLuong * key.donGia)
        })
        this.tienTraKhach += this.hoaDon.phiVanChuyen;
      } else if (this.hoaDon.phieuGiamGia.hinhThucGiamGia === false) {
        this.listSanPhamTra.forEach((key: any) => {
          this.tienTraKhach += (key.soLuong * key.donGia)
          this.tienGiam += ((key.soLuong * key.donGia) * this.hoaDon.phieuGiamGia.chietKhau) / 100
        })
        this.tienTraKhach -= this.tienGiam
        this.tienTraKhach += this.hoaDon.phiVanChuyen;
      } else {
        this.listSanPhamTra.forEach((key: any) => {
          this.tienTraKhach += (key.soLuong * key.donGia)
          this.soLuongTra += key.soLuong;
        })
        this.tienGiam = (this.soLuongTra * (this.hoaDon.phieuGiamGia.chietKhau / this.tongSoLuongBanDau));
        this.tienTraKhach -= this.tienGiam
        this.tienTraKhach += this.hoaDon.phiVanChuyen;
      }


    } else {
      // Nếu checkbox bị hủy chọn, loại bỏ giá trị khỏi mảng
      this.listSanPhamTra = this.listSanPhamTra.filter((item: { id: number; }) => item.id !== itemId);
      this.checkedItems = this.checkedItems.filter((id: number) => id !== itemId);
      this.listSanPhamTra.forEach((c: any) => {
        this.tongTienHangTra += c.soLuong * c.donGia;
      })
      this.tienTraKhach = 0;
      this.tienGiam = 0;
      this.soLuongTra = 0;
      if (this.hoaDon.phieuGiamGia === null) {
        this.listSanPhamTra.forEach((key: any) => {
          this.tienTraKhach += (key.soLuong * key.donGia)
        })
        this.tienTraKhach += this.hoaDon.phiVanChuyen;
      } else if (this.hoaDon.phieuGiamGia.hinhThucGiamGia === false) {
        this.listSanPhamTra.forEach((key: any) => {
          this.tienTraKhach += (key.soLuong * key.donGia)
          this.tienGiam += ((key.soLuong * key.donGia) * this.hoaDon.phieuGiamGia.chietKhau) / 100
        })
        this.tienTraKhach -= this.tienGiam
        this.tienTraKhach += this.hoaDon.phiVanChuyen;
      } else {
        this.listSanPhamTra.forEach((key: any) => {
          this.tienTraKhach += (key.soLuong * key.donGia)
          this.soLuongTra += key.soLuong;

        })
        this.tienGiam = (this.soLuongTra * (this.hoaDon.phieuGiamGia.chietKhau / this.tongSoLuongBanDau));
        this.tienTraKhach -= this.tienGiam
        this.tienTraKhach += this.hoaDon.phiVanChuyen;
      }
    }
  }


  trahang() {

    this.loiGhiChu = false;
    if (this.ghiChu === '' || this.ghiChu.length < 1 || this.ghiChu.length > 200) {
      this.loiGhiChu = true;
    } else if (this.loiSoLuong === true) {
      this.notificationService.error("Số lượng trả hàng không hợp lệ ");
    } else if (this.checkedItems.length === 0) {
      this.notificationService.error("Vui lòng chọn sản phẩm muốn trả hàng ");
    } else {
      Swal.fire(
        {
          title: 'Xác nhận trả hàng',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Trả hàng',
          cancelButtonText: 'Hủy'
        }
      ).then((result) => {
        if (result.isConfirmed) {// check confirm
          this.traHangChiTiets = [];
          this.listSanPhamTra.forEach((key: any) => {
            this.traHangChiTiets.push(
              {
                id: null,
                idTraHang: null,
                idHoaDonChiTiet: key.id,
                soLuong: key.soLuong,
                donGia: key.donGia
              }
            )
          })

          this.form.patchValue({
            id: null,
            idHoaDon: this.hoaDon.id,
            lyDo: this.ghiChu,
            ngayTao: null,
            ngayCapNhat: null,
            tienTraKhach: this.tienTraKhach,
            trangThai: null,
            traHangChiTietRequests: this.traHangChiTiets
          })
          this.traHangService.traHang(this.form.value).then(c => {
            this.openDialog(this.listSanPhamTra);
            // this.notificationService.success('Trả hàng thành công !')
            this.hienThi = false;
          }, err => {
            this.notificationService.error('Trả hàng không thành công !')
          })
        }
      })



    }


  }

  openDialog(listSanPhamTra: any) {
    const dialogRef = this.dialog.open(DialogUpdateCtspComponent, {
      width: '1000px',
      height: '500px',

      data: {
        type: "add",
        listSanPhamTra: listSanPhamTra,
        openDialog: 4
      },
    })
  }

}
