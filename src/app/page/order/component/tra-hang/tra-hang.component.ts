import { Component, Inject, OnInit } from '@angular/core';
import { OrderService } from '../../service/order.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { differenceInDays } from 'date-fns';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tra-hang',
  templateUrl: './tra-hang.component.html',
  styleUrls: ['./tra-hang.component.scss']
})
export class TraHangComponent implements OnInit {
  invoice: any = {};
  openDialog: any;
  listTraHang: any[] = [];
  hoaDonChiTiets: any[] = [];
  abc: any[] = [];
  hoaDon: any[] = [];
  openDiglog = 3;
  ghiChu = '';
  invoiceDetail: any = {};
  tongTien = 0;
  checkedAll: any;
  clickCount = 0;
  checked: Set<number> = new Set();
  checkedItems: any = [];
  loiGhiChu = false;
  loiSoLuong = false;
  traHang: any = {};
  traHangChiTiets: any[] = [];
  listHdctChecked: any[] = [];
  tienTraKhach = 0;
  tienGiam = 0;
  tongSoLuongBanDau = 0;
  soLuongTra = 0;
  ngayHienTai: Date = new Date();
  ngayGiaoHang: Date = new Date();
  traHangDetail: any = {};
  tongGiaHangTra = 0;
  tongTienThanhToan = 0;



  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private orderService: OrderService,
    private dialog: MatDialog,
    private notificationService: ToastrService,
    private formBuilder: FormBuilder,
  ) {
    this.traHangDetail = data.traHang
    this.invoice = data.invoice
    this.openDialog = data.openDialog
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
    if (this.invoice !== undefined) {

      this.hoaDonChiTiets = this.invoice.listHoaDonChiTiet;

      this.invoice.listHoaDonChiTiet.forEach((c: any) => {
        this.tongSoLuongBanDau += c.soLuong;
      })
    }

    this.orderService.findTraHangByKhachHang().then(k => {
      this.listTraHang = k;
    })


    if (this.traHangDetail !== undefined) {
      this.traHangDetail.listTraHangChiTiet.forEach((key: any) => {
        this.tongGiaHangTra += key.soLuong * key.donGia;
      })

      if (this.traHangDetail.hoaDon.phieuGiamGia === null) {
        this.tongTienThanhToan = this.traHangDetail.hoaDon.tongTien + this.traHangDetail.hoaDon.phiVanChuyen;
      } else {
        this.tongTienThanhToan = this.traHangDetail.hoaDon.tongTien - this.traHangDetail.hoaDon.tienGiam;
      }
    }


  }

  closeDialog() {
    this.dialog.closeAll();
  }

  capNhatSoLuong($event: any, index: number) {
    this.loiSoLuong = false;
    const idHdct = this.invoice.listHoaDonChiTiet[index].id;
    this.orderService.findByIdHDCT(idHdct).then(c => {
      if ($event.target.value > c.soLuong || $event.target.value < 1) {
        this.notificationService.error("Số lượng trả hàng không hơp lệ !")
        this.loiSoLuong = true;
      } else {

        this.invoiceDetail = c;
        this.invoiceDetail.soLuong = $event.target.value;
        // this.hoaDonChiTiets = this.hoaDonChiTiets.filter((item: { id: number; }) => item.id !== idHdct);
        // this.hoaDonChiTiets.splice(index, 0, this.invoiceDetail);

        //
        this.tienTraKhach = 0;
        this.tienGiam = 0;
        this.soLuongTra = 0;
        if (this.listHdctChecked.length > 0) {
          this.listHdctChecked = this.listHdctChecked.filter((item: { id: number; }) => item.id !== idHdct);
          this.listHdctChecked.splice(index, 0, this.invoiceDetail);
          if (this.invoice.phieuGiamGia === null) {
            this.listHdctChecked.forEach((key: any) => {
              this.tienTraKhach += (key.soLuong * key.donGia)
            })
            this.tienTraKhach += this.invoice.phiVanChuyen;
          } else if (this.invoice.phieuGiamGia.hinhThucGiamGia === false) {
            this.listHdctChecked.forEach((key: any) => {
              this.tienTraKhach += (key.soLuong * key.donGia)
              this.tienGiam += ((key.soLuong * key.donGia) * this.invoice.phieuGiamGia.chietKhau) / 100
            })
            this.tienTraKhach -= this.tienGiam
            this.tienTraKhach += this.invoice.phiVanChuyen;
          } else {
            this.listHdctChecked.forEach((key: any) => {
              this.tienTraKhach += (key.soLuong * key.donGia)
              this.soLuongTra += key.soLuong;
            })
            this.tienGiam = (this.soLuongTra * (this.invoice.phieuGiamGia.chietKhau / this.tongSoLuongBanDau));
            this.tienTraKhach -= this.tienGiam
            this.tienTraKhach += this.invoice.phiVanChuyen;
          }
        }


      }
    })


  }

  isChecked(itemId: number): boolean {

    // Kiểm tra xem itemId có trong Set không
    return this.checked.has(itemId);
  }

  toggleChecked(itemId: number): void {
    // Đảo ngược trạng thái của itemId trong Set
    if (this.checked.has(itemId)) {
      this.checkedItems = [];
      this.listHdctChecked = [];
      this.checked.delete(itemId);
      this.tienTraKhach = 0;
    } else {
      this.checked.add(itemId);
      this.hoaDonChiTiets.forEach((key: any) => {
        this.checkedItems.push(key.id);
        this.listHdctChecked.push(key);
      })
      this.tienTraKhach = 0;
      this.tienGiam = 0;
      this.soLuongTra = 0;
      if (this.invoice.phieuGiamGia === null) {
        this.hoaDonChiTiets.forEach((key: any) => {
          this.tienTraKhach += (key.soLuong * key.donGia)
        })
        this.tienTraKhach += this.invoice.phiVanChuyen;
      } else if (this.invoice.phieuGiamGia.hinhThucGiamGia === false) {
        this.hoaDonChiTiets.forEach((key: any) => {
          this.tienTraKhach += (key.soLuong * key.donGia)
          this.tienGiam += ((key.soLuong * key.donGia) * this.invoice.phieuGiamGia.chietKhau) / 100
        })
        this.tienTraKhach -= this.tienGiam
        this.tienTraKhach += this.invoice.phiVanChuyen;
      } else {
        this.hoaDonChiTiets.forEach((key: any) => {
          this.tienTraKhach += (key.soLuong * key.donGia)
          this.soLuongTra += key.soLuong;
        })
        this.tienGiam = (this.soLuongTra * (this.invoice.phieuGiamGia.chietKhau / this.tongSoLuongBanDau));
        this.tienTraKhach -= this.tienGiam
        this.tienTraKhach += this.invoice.phiVanChuyen;


      }

    }


  }



  onCheckboxChange(event: any, itemId: number) {
    if (event.target.checked) {
      // Nếu checkbox được chọn, thêm giá trị vào mảng
      this.hoaDonChiTiets.forEach((key: any) => {
        if (key.id === itemId) {
          this.listHdctChecked.push(key);
          return;
        }
      })
      this.checkedItems.push(itemId);
      this.checkedItems;

      this.tienTraKhach = 0;
      this.tienGiam = 0;
      this.soLuongTra = 0;
      if (this.invoice.phieuGiamGia === null) {
        this.listHdctChecked.forEach((key: any) => {
          this.tienTraKhach += (key.soLuong * key.donGia)
        })
        this.tienTraKhach += this.invoice.phiVanChuyen;
      } else if (this.invoice.phieuGiamGia.hinhThucGiamGia === false) {
        this.listHdctChecked.forEach((key: any) => {
          this.tienTraKhach += (key.soLuong * key.donGia)
          this.tienGiam += ((key.soLuong * key.donGia) * this.invoice.phieuGiamGia.chietKhau) / 100
        })
        this.tienTraKhach -= this.tienGiam
        this.tienTraKhach += this.invoice.phiVanChuyen;
      } else {
        this.listHdctChecked.forEach((key: any) => {
          this.tienTraKhach += (key.soLuong * key.donGia)
          this.soLuongTra += key.soLuong;
        })
        this.tienGiam = (this.soLuongTra * (this.invoice.phieuGiamGia.chietKhau / this.tongSoLuongBanDau));
        this.tienTraKhach -= this.tienGiam
        this.tienTraKhach += this.invoice.phiVanChuyen;
      }

    } else {
      // Nếu checkbox bị hủy chọn, loại bỏ giá trị khỏi mảng
      this.listHdctChecked = this.listHdctChecked.filter((item: { id: number; }) => item.id !== itemId);
      this.checkedItems = this.checkedItems.filter((id: number) => id !== itemId);
      this.tienTraKhach = 0;
      this.tienGiam = 0;
      this.soLuongTra = 0;
      if (this.invoice.phieuGiamGia === null) {
        this.listHdctChecked.forEach((key: any) => {
          this.tienTraKhach += (key.soLuong * key.donGia)
        })
        this.tienTraKhach += this.invoice.phiVanChuyen;
      } else if (this.invoice.phieuGiamGia.hinhThucGiamGia === false) {
        this.listHdctChecked.forEach((key: any) => {
          this.tienTraKhach += (key.soLuong * key.donGia)
          this.tienGiam += ((key.soLuong * key.donGia) * this.invoice.phieuGiamGia.chietKhau) / 100
        })
        this.tienTraKhach -= this.tienGiam
        this.tienTraKhach += this.invoice.phiVanChuyen;
      } else {
        this.listHdctChecked.forEach((key: any) => {
          this.tienTraKhach += (key.soLuong * key.donGia)
          this.soLuongTra += key.soLuong;
        })
        this.tienGiam = (this.soLuongTra * (this.invoice.phieuGiamGia.chietKhau / this.tongSoLuongBanDau));
        this.tienTraKhach -= this.tienGiam
        this.tienTraKhach += this.invoice.phiVanChuyen;
      }

    }

  }


  trahang() {
    this.ngayGiaoHang = new Date(this.invoice.ngayCapNhat)
    this.orderService.findTraHangByIdHD(this.invoice.id).then(t => {

      if (differenceInDays(this.ngayHienTai, this.ngayGiaoHang) > 4 || differenceInDays(this.ngayHienTai, this.ngayGiaoHang) < 0) {
        this.notificationService.error("Đơn hàng đã quá thời gian trả hàng !")
      } else if (t.length === 0) {
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
              this.listHdctChecked.forEach((key: any) => {
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
                idHoaDon: this.invoice.id,
                lyDo: this.ghiChu,
                ngayTao: null,
                ngayCapNhat: null,
                tienTraKhach: this.tienTraKhach,
                trangThai: null,
                traHangChiTietRequests: this.traHangChiTiets
              })
              this.orderService.traHang(this.form.value).then(c => {
                this.notificationService.success('Trả hàng thành công !')
                this.dialog.closeAll();
                setTimeout(() => {
                  window.location.reload();
                }, 1000);
              }, err => {
                this.notificationService.success('Trả hàng không thành công !')

              })
            }
          })
        }
      } else {
        let daTraHang = 0;
        t.forEach((key: any) => {
          if (key.trangThai !== 3) {
            daTraHang = 1;
          } else {
            daTraHang = 0;
          }
        })
        
        if (daTraHang === 1) {
          this.notificationService.error("Đơn hàng đã hoàn trả !");
        }else{
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
                  this.listHdctChecked.forEach((key: any) => {
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
                    idHoaDon: this.invoice.id,
                    lyDo: this.ghiChu,
                    ngayTao: null,
                    ngayCapNhat: null,
                    tienTraKhach: this.tienTraKhach,
                    trangThai: null,
                    traHangChiTietRequests: this.traHangChiTiets
                  })
                  this.orderService.traHang(this.form.value).then(c => {
                    this.notificationService.success('Trả hàng thành công !')
                    this.dialog.closeAll();
                    setTimeout(() => {
                      window.location.reload();
                    }, 1000);
                  }, err => {
                    this.notificationService.success('Trả hàng không thành công !')

                  })
                }
              })
            }
        }

      }
    })


  }
}
