import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { TraHangService } from '../../service/tra-hang.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { DialogUpdateCtspComponent } from '../dialog-update-ctsp/dialog-update-ctsp.component';

@Component({
  selector: 'app-dialog-tra-hang',
  templateUrl: './dialog-tra-hang.component.html',
  styleUrls: ['./dialog-tra-hang.component.scss']
})
export class DialogTraHangComponent implements OnInit {
  //tại quầy
  listSanPhamTra: any = {};
  traHangChiTiet: any = {};
  listTraHangChiTiet: any[] = [];
  listCapNhatCTSP: any[] = [];
  chiTietSanPham: any = {};
  listUpdateCTSP: any[] = [];
  openDialog: any;
  loiSoLuong = true;
  checked: Set<number> = new Set();
  checkedItems: any = [];
  //


  // chờ xác nhận
  traHangDialog: any = {};
  tongGiaSanPhamTra = 0;
  idTraHangDialog = 0;
  traHangChiTietDialog: any = {};
  tongTienTraKhach = 0;
  tongSoLuongBanDau = 0;
  tongSoLuongTra = 0;
  tienGiam = 0;
  traHangChiTietAdd: any = {};
  loiGhiChu = false;
  ghiChu = ''
  traHang: any = {};



  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private traHangService: TraHangService,
    private notificationService: ToastrService,
  ) {
    this.listSanPhamTra = data.listSanPhamTra;
    this.traHangDialog = data.traHang;
    this.openDialog = data.openDialog
  }

  ngOnInit(): void {
    this.listTraHangChiTiet = this.listSanPhamTra;

    if (this.traHangDialog !== undefined) {
      this.idTraHangDialog = this.traHangDialog.id;
      this.tongTienTraKhach = this.traHangDialog.tienTraKhach;
      this.ghiChu = this.traHangDialog.lyDo;
      this.traHangDialog.listTraHangChiTiet.forEach((key: any) => {
        this.tongGiaSanPhamTra += key.soLuong * key.donGia;
        this.tongSoLuongBanDau += key.soLuong
      })
    }
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  // trả hàng tại quầy
  capNhatSoLuong($event: any, index: number) {
    this.loiSoLuong = false;
    const idHdct = this.listTraHangChiTiet[index].id;
    this.traHangService.findByIdHDCT(idHdct).then(c => {
      if ($event.target.value > c.soLuong || $event.target.value < 1) {
        this.notificationService.error("Số lượng cập nhật không hơp lệ !")
        this.loiSoLuong = true;
      } else {

        if (this.listCapNhatCTSP.length > 0) {
          this.traHangChiTiet = c;
          this.traHangChiTiet.soLuong = $event.target.value;

          this.listCapNhatCTSP = this.listCapNhatCTSP.filter((item: { id: number; }) => item.id !== idHdct);
          this.listCapNhatCTSP.splice(index, 0, this.traHangChiTiet);
        }
      }
    })

  }

  toggleChecked(itemId: number): void {
    // Đảo ngược trạng thái của itemId trong Set

    if (this.checked.has(itemId)) {
      this.checkedItems = [];
      this.listCapNhatCTSP = [];
      this.checked.delete(itemId);
    } else {
      this.checked.add(itemId);
      this.listSanPhamTra.forEach((key: any) => {
        this.checkedItems.push(key.id);
        this.listCapNhatCTSP.push(key);
      })
    }
  }

  isChecked(itemId: number): boolean {

    // Kiểm tra xem itemId có trong Set không
    return this.checked.has(itemId);
  }


  onCheckboxChange(event: any, itemId: number) {
    if (event.target.checked) {
      // Nếu checkbox được chọn, thêm giá trị vào mảng
      this.listSanPhamTra.forEach((key: any) => {
        if (key.id === itemId) {
          this.listCapNhatCTSP.push(key);

          return;
        }
      })
      this.checkedItems.push(itemId);
      this.checkedItems;

    } else {
      // Nếu checkbox bị hủy chọn, loại bỏ giá trị khỏi mảng
      this.listCapNhatCTSP = this.listCapNhatCTSP.filter((item: { id: number; }) => item.id !== itemId);
      this.checkedItems = this.checkedItems.filter((id: number) => id !== itemId);
    }

  }

  huyCapNhat() {
    this.dialog.closeAll();
    this.notificationService.success('Trả hàng thành công !')
  }

  capNhatCTSP() {
    this.listUpdateCTSP = [];
    if (this.loiSoLuong === true) {
      this.notificationService.error('Số lượng cập nhật không hợp lệ !')
    } else {
      this.listCapNhatCTSP.forEach((key: any) => {
        this.listUpdateCTSP.push({
          idChiTietSanPham: key.chiTietSanPham.id,
          soLuong: key.soLuong
        })
      })

      this.traHangService.capNhatCTSP(this.listUpdateCTSP).then(c => {
        this.notificationService.success('Cập nhật sản phẩm thành công !')
      }, err => {
        this.notificationService.success('Cập nhật sản phẩm không thành công !')
      })
    }

  }
  // end trả hàng tại quầy


  updateQuantityTHCT(id?: number, $event?: any) {



    const soLuong = $event.target.value;
    this.traHangDialog.listTraHangChiTiet.forEach((key: any) => {
      if (key.id === id) {
        this.traHangChiTietDialog = key;
      }
    })

    if (soLuong > this.traHangChiTietDialog.hoaDonChiTiet.soLuong) {
      this.notificationService.error('Số lượng sản phẩm trả không hợp lệ');
    } else if (soLuong === '' || soLuong < 1) {
      this.notificationService.error('Số lượng sản phẩm trả không hợp lệ');

    } else {

      Swal.fire(
        {
          title: 'Cập nhật số lượng sản phẩm trả hàng',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Xác nhận',
          cancelButtonText: 'Hủy'
        }
      ).then((result) => {
        if (result.isConfirmed) {// check confirm
          this.tongGiaSanPhamTra = 0;
          this.tongSoLuongTra = 0;
          this.tongTienTraKhach = 0;
          this.tienGiam = 0;
          this.traHangService.updateQuantityTHCT(id, $event.target.value).then(c => {
            this.traHangService.findTraHangById(this.idTraHangDialog).then(t => {
              this.traHangDialog = t;
              t.listTraHangChiTiet.forEach((key: any) => {
                this.tongGiaSanPhamTra += key.soLuong * key.donGia
              })


              if (this.traHangDialog.hoaDon.phieuGiamGia === null) {
                this.traHangDialog.listTraHangChiTiet.forEach((key: any) => {
                  this.tongTienTraKhach += key.soLuong * key.donGia
                  this.tongGiaSanPhamTra += key.soLuong * key.donGia
                })
              } else if (this.traHangDialog.hoaDon.phieuGiamGia.hinhThucGiamGia === false) {
                this.traHangDialog.listTraHangChiTiet.forEach((key: any) => {
                  this.tongGiaSanPhamTra += key.soLuong * key.donGia
                  this.tongTienTraKhach += (key.soLuong * key.donGia)
                  this.tienGiam += ((key.soLuong * key.donGia) * this.traHangDialog.hoaDon.phieuGiamGia.chietKhau) / 100;
                })
                this.tongTienTraKhach -= this.tienGiam
                this.tongTienTraKhach += this.traHangDialog.hoaDon.phiVanChuyen;
              } else {
                this.traHangDialog.listTraHangChiTiet.forEach((key: any) => {
                  this.tongTienTraKhach += key.soLuong * key.donGia
                  this.tongSoLuongTra += key.soLuong;
                })
                this.tienGiam = (this.tongSoLuongTra * (this.traHangDialog.hoaDon.phieuGiamGia.chietKhau / this.tongSoLuongBanDau));
                this.tongTienTraKhach -= this.tienGiam
                this.tongTienTraKhach += this.traHangDialog.hoaDon.phiVanChuyen;
              }

              this.traHangService.updateTotalPayments(this.traHangDialog.id, this.tongTienTraKhach).then(c => {

              })
            })


          })
        }
      })
    }
  }

  deleteTHCT(id?: number) {


    if (this.traHangDialog.listTraHangChiTiet.length === 1) {
      this.notificationService.error("Bạn không thể xóa sản phẩm cuối")
    } else {
      Swal.fire(
        {
          title: 'Xác nhận xóa sản phẩm trả hàng',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Xác nhận',
          cancelButtonText: 'Hủy'
        }
      ).then((result) => {
        if (result.isConfirmed) {// check confirm
          this.tongGiaSanPhamTra = 0;
          this.tongSoLuongTra = 0;
          this.tongTienTraKhach = 0;
          this.tienGiam = 0;
          this.traHangService.delelteTHCT(id).then(c => {
            this.traHangService.findTraHangById(this.idTraHangDialog).then(t => {
              this.traHangDialog = t;
              t.listTraHangChiTiet.forEach((key: any) => {
                this.tongSoLuongTra += key.soLuong

              })


              if (this.traHangDialog.hoaDon.phieuGiamGia === null) {
                this.traHangDialog.listTraHangChiTiet.forEach((key: any) => {
                  this.tongTienTraKhach += key.soLuong * key.donGia
                  this.tongGiaSanPhamTra += key.soLuong * key.donGia
                })
              } else if (this.traHangDialog.hoaDon.phieuGiamGia.hinhThucGiamGia === false) {
                this.traHangDialog.listTraHangChiTiet.forEach((key: any) => {
                  this.tongGiaSanPhamTra += key.soLuong * key.donGia
                  this.tongTienTraKhach += (key.soLuong * key.donGia)
                  this.tienGiam += ((key.soLuong * key.donGia) * this.traHangDialog.hoaDon.phieuGiamGia.chietKhau) / 100;
                })
                this.tongTienTraKhach -= this.tienGiam
                this.tongTienTraKhach += this.traHangDialog.hoaDon.phiVanChuyen;
              } else {
                this.traHangDialog.listTraHangChiTiet.forEach((key: any) => {
                  this.tongTienTraKhach += key.soLuong * key.donGia
                  this.tongSoLuongTra += key.soLuong;
                })
                this.tienGiam = (this.tongSoLuongTra * (this.traHangDialog.hoaDon.phieuGiamGia.chietKhau / this.tongSoLuongBanDau));
                this.tongTienTraKhach -= this.tienGiam
                this.tongTienTraKhach += this.traHangDialog.hoaDon.phiVanChuyen;
              }
            })
          }, err => {
            this.notificationService.error('Bạn không thể xóa sản phẩm !')
          })
        }
      })
    }
  }

  closeDialogs() {
    this.dialog.closeAll();
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }


  addTHCT(idHDCT: number) {
    let loiAdd = false;
    this.traHangDialog.listTraHangChiTiet.forEach((key: any) => {
      if (key.hoaDonChiTiet.id === idHDCT) {
        loiAdd = true;
      }
    })

    if (loiAdd === false) {
      Swal.fire(
        {
          title: 'Xác nhận thêm sản phẩm trả hàng',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Xác nhận',
          cancelButtonText: 'Hủy'
        }
      ).then((result) => {
        if (result.isConfirmed) {// check confirm
          this.tongGiaSanPhamTra = 0;
          this.tongSoLuongTra = 0;
          this.tongTienTraKhach = 0;
          this.tienGiam = 0;

          this.traHangChiTietAdd.id = null;
          this.traHangChiTietAdd.idTraHang = this.traHangDialog.id;
          this.traHangChiTietAdd.idHoaDonChiTiet = idHDCT;
          this.traHangChiTietAdd.soLuong = 1;
          this.traHangChiTietAdd.giaBan = null;

          this.traHangService.addTHCT(this.traHangChiTietAdd).then(c => {
            if (c) {
              this.traHangService.findTraHangById(this.idTraHangDialog).then(t => {
                this.traHangDialog = t;
                t.listTraHangChiTiet.forEach((key: any) => {
                  this.tongSoLuongTra += key.soLuong

                })

                if (this.traHangDialog.hoaDon.phieuGiamGia === null) {
                  this.traHangDialog.listTraHangChiTiet.forEach((key: any) => {
                    this.tongTienTraKhach += key.soLuong * key.donGia
                    this.tongGiaSanPhamTra += key.soLuong * key.donGia
                  })
                } else if (this.traHangDialog.hoaDon.phieuGiamGia.hinhThucGiamGia === false) {
                  this.traHangDialog.listTraHangChiTiet.forEach((key: any) => {
                    this.tongGiaSanPhamTra += key.soLuong * key.donGia
                    this.tongTienTraKhach += (key.soLuong * key.donGia)
                    this.tienGiam += ((key.soLuong * key.donGia) * this.traHangDialog.hoaDon.phieuGiamGia.chietKhau) / 100;
                  })
                  this.tongTienTraKhach -= this.tienGiam
                  this.tongTienTraKhach += this.traHangDialog.hoaDon.phiVanChuyen;
                } else {
                  this.traHangDialog.listTraHangChiTiet.forEach((key: any) => {
                    this.tongTienTraKhach += key.soLuong * key.donGia
                    this.tongSoLuongTra += key.soLuong;
                  })
                  this.tienGiam = (this.tongSoLuongTra * (this.traHangDialog.hoaDon.phieuGiamGia.chietKhau / this.tongSoLuongBanDau));
                  this.tongTienTraKhach -= this.tienGiam
                  this.tongTienTraKhach += this.traHangDialog.hoaDon.phiVanChuyen;
                }
              })
            }
          })
        }
      })

    } else {
      this.notificationService.error('Sản phẩm đã trong trong danh sách trả hàng');
    }

  }

  choXuLy() {
    this.loiGhiChu = false;
    if (this.ghiChu === '' || this.ghiChu.length < 1 || this.ghiChu.length > 200) {
      this.loiGhiChu = true;
    } else {
      Swal.fire(
        {
          title: 'Xác nhận đơn hàng trả',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Xác nhận',
          cancelButtonText: 'Hủy'
        }
      ).then((result) => {
        if (result.isConfirmed) {
          this.traHangService.updateGhiChu(this.traHangDialog.id, this.ghiChu).then(c => {
            this.notificationService.success('Xác nhận đơn hàng trả thành công !')
            this.dialog.closeAll();
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          })
        }
      })
    }
  }

  choXacNhan(id: number) {
    Swal.fire(
      {
        title: 'Chờ xác nhận đơn hàng trả',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy'
      }
    ).then((result) => {
      if (result.isConfirmed) {
        this.traHangService.updateStatus(id, 0).then(c => {
          this.notificationService.success('Chờ xác nhận đơn hàng trả thành công !')
          this.dialog.closeAll();
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        })
      }
    })
  }


  huyDon(id: number) {
    Swal.fire(
      {
        title: 'Xác nhận hủy đơn hàng trả',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy'
      }
    ).then((result) => {
      if (result.isConfirmed) {
        this.traHangService.updateStatus(id, 3).then(c => {
          this.notificationService.success('Xác nhận hủy đơn hàng trả thành công !')
          this.dialog.closeAll();
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        })
      }
    })
  }

  hoanThanh(id: number) {
    Swal.fire(
      {
        title: 'Xác nhận hoàn thành đơn hàng trả',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy'
      }
    ).then((result) => {
      if (result.isConfirmed) {
        this.traHangService.updateStatus(id, 2).then(c => {
          this.notificationService.success('Xác nhận hoàn thành đơn hàng trả thành công !')
          this.exportPDF(this.traHangDialog.id);
          this.dialog.closeAll();
          this.openDialogs(this.traHangDialog.listTraHangChiTiet, this.traHangDialog);
          this.traHangService.updateTongTien(this.traHangDialog.id).then(c => {
          })
          // this.dialog.closeAll();
          // setTimeout(() => {
          //   window.location.reload();
          // }, 1000);
        })
      }
    })
  }
  openDialogs(listSanPhamTra: any, traHang: any) {
    const dialogRef = this.dialog.open(DialogUpdateCtspComponent, {
      width: '1000px',
      height: '500px',

      data: {
        type: "add",
        listSanPhamTra: listSanPhamTra,
        traHang: traHang,
        openDialog: 4
      },
    })
  }

  inHoaDon(){
    this.exportPDF(50);
  }

  exportPDF(id: number): void {

    this.traHangService.exportPdf(id).subscribe(
      (data) => {
        this.downloadFile(data);
      },
      (error) => {
        console.error('Error exporting PDF', error);
      }
    );
  }

  private downloadFile(data: Blob): void {
    const blob = new Blob([data], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'hoadon.pdf';
    link.click();
  }

}
