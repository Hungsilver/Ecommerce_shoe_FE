import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';
import { HoaDonService } from '../../service/hoadon.service';
import { ToastrService } from 'ngx-toastr';
import { NgxScannerQrcodeComponent, ScannerQRCodeConfig, ScannerQRCodeResult } from 'ngx-scanner-qrcode';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-invoice-chi-tiet',
  templateUrl: './invoice-chi-tiet.component.html',
  styleUrls: ['./invoice-chi-tiet.component.scss']
})
export class InvoiceChiTietComponent implements OnInit {
  result!: string;
  showQuantityInput!: boolean;
  isScanning!: boolean;
  searchResults!: string;
  isShowQrCode: boolean = false;
  timKiem = '';
  hienThi = false;
  hienThiQrcode = false;
  showCtsp = false;
  showUpdate = true;

  invoiceDetail: any;
  traHang: any;
  tongGiaHangTra = 0;
  hoaDonChiTiet: any = {};
  chiTietSanPham: any = {};
  hoaDonChiTietAdd: any = {};
  hoaDonChiTiets: any[] = [];
  tongTienDaThanhToan = 0;

  provinces: any[] = [];
  districts: any[] = [];
  wards: any[] = [];
  hostGHN = "https://online-gateway.ghn.vn/shiip/public-api/master-data/";
  selectedProvince = '';
  selectedDistrict = '';
  selectedWard = '';
  province_id = '';
  district_id = '';
  ward_id = '';
  province = '';
  district = '';
  ward = '';



  constructor(
    private route: ActivatedRoute,
    private hoaDonService: HoaDonService,
    private notification: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient,
  ) {

  }

  form: FormGroup = this.formBuilder.group({
    id: '',
    maHoaDon: '',
    tenKhachHang: ['', [Validators.required, Validators.maxLength(50)]],
    soDienThoai: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$')]],
    diaChi: ['', [Validators.required, Validators.maxLength(100)]],
    phuongXa: [this.ward],
    quanHuyen: this.district,
    tinhThanh: this.province,
    ngayTao: '',
    tongTien: '',
    tienGiam: '',
    tongTienSauGiam: '',
    phiVanChuyen: '',
    phuongThucThanhToan: ['0'],
    trangThai: '',
    phieuGiamGia: '',
    khachHang: '',
    listHoaDonChiTiet: []

  });
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.invoiceDetail = history.state.detailData;
      this.hoaDonService.findByInvice(history.state.detailData.id).then(key => {
        this.invoiceDetail = key;
        this.tongTienDaThanhToan = this.invoiceDetail.tongTienSauGiam + this.invoiceDetail.phiVanChuyen;
        this.province = this.invoiceDetail.tinhThanh
        this.district = this.invoiceDetail.quanHuyen
        this.ward = this.invoiceDetail.phuongXa
        this.form.get('tenKhachHang')?.setValue(this.invoiceDetail.tenKhachHang);
        this.form.get('soDienThoai')?.setValue(this.invoiceDetail.soDienThoai);
        this.form.get('diaChi')?.setValue(this.invoiceDetail.diaChi);
      })
      this.hoaDonService.findTraHangByIdHD(this.invoiceDetail.id).then(c => {
        c.forEach((element: any) => {

          if (element.trangThai !== 3) {
            this.traHang = element;

            this.traHang.listTraHangChiTiet.forEach((key: any) => {
              this.tongGiaHangTra += key.soLuong * key.donGia;
            })
          }
        });
      })
    });

    this.callApiProvince(this.hostGHN);
    this.callApiGHN(this.hostGHN);
  }

  // qr code
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
      this.hoaDonService.findByMaCtsp(this.result).then(c => {
        if (c) {
          this.showCtsp = true
          this.chiTietSanPham = c;
        }
      }, err => {
        this.showCtsp = false;
        this.notification.error("Không tìm thấy sản phẩm");
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

  timKiemCtsp() {
    if (this.timKiem === '') {
      this.showCtsp = false;
    } else {
      this.hoaDonService.findByMaCtsp(this.timKiem).then(c => {
        if (c) {
          this.showCtsp = true;
          this.chiTietSanPham = c;
        }
      }, err => {
        this.showCtsp = false;
        this.notification.error("Không tìm thấy sản phẩm");
      })
    }
  }

  deleteProduct(idHdct: number) {
    Swal.fire(
      {
        title: 'Xác nhận xóa sản phẩm',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy'
      }
    ).then((result) => {
      if (result.isConfirmed) {
        if (this.invoiceDetail.listHoaDonChiTiet.length == 1) {
          this.notification.error('Bạn không thể xóa sản phẩm cuối !');
        } else {
          this.hoaDonService.deleteInvoiceDetail(idHdct).then(h => {
            this.invoiceDetail.tongTien = 0;
            this.invoiceDetail.listHoaDonChiTiet = this.invoiceDetail.listHoaDonChiTiet.filter((item: { id: number; }) => item.id !== idHdct);
            this.invoiceDetail.listHoaDonChiTiet.forEach((element: any) => {
              this.invoiceDetail.tongTien += element.soLuong * element.donGia;
            });
            // this.invoiceDetail.tongTien = this.invoiceDetail.tongTien;
            if (this.invoiceDetail.phieuGiamGia === null) {
              this.invoiceDetail.tongTienSauGiam = this.invoiceDetail.tongTien
            }
            else if (this.invoiceDetail.phieuGiamGia.hinhThucGiamGia === false && this.invoiceDetail.phieuGiamGia.hinhThucGiamGia !== null) {
              this.invoiceDetail.tienGiam = (this.invoiceDetail.tongTien * this.invoiceDetail.phieuGiamGia.chietKhau) / 100;
            } else {
              this.invoiceDetail.tienGiam = this.invoiceDetail.phieuGiamGia.chietKhau;
            }
            this.invoiceDetail.tongTienSauGiam = this.invoiceDetail.tongTien - this.invoiceDetail.tienGiam;

            //update hoadon
            this.invoiceDetail.listHoaDonChiTiet.forEach((key: any) => {


              this.hoaDonChiTiets.push(
                {
                  id: key.id,
                  idHoaDon: this.invoiceDetail.id,
                  idChiTietSanPham: key.chiTietSanPham.id,
                  soLuong: key.soLuong,
                  donGia: key.donGia
                }
              )
            })

            this.form.patchValue({
              id: this.invoiceDetail.id,
              maHoaDon: this.invoiceDetail.maHoaDon,
              ngayTao: this.invoiceDetail.ngayTao,
              tongTien: this.invoiceDetail.tongTien,
              tienGiam: this.invoiceDetail.tienGiam,
              tongTienSauGiam: this.invoiceDetail.tongTienSauGiam,
              phiVanChuyen: this.invoiceDetail.phiVanChuyen,
              trangThai: this.invoiceDetail.trangThai,
              phieuGiamGia: this.invoiceDetail.phieuGiamGia,
              khachHang: this.invoiceDetail.khachHang,
              phuongXa: this.ward,
              quanHuyen: this.district,
              tinhThanh: this.province,
              listHoaDonChiTiet: this.hoaDonChiTiets,
            })
            console.log(this.form.value);

            this.hoaDonService.updateInvoice(this.form.value).then(c => {
              console.log(c);

            }, err => {
              alert('lỗi')
            })

          })
        }

      }
    })
  }

  addProduct() {
    if (this.chiTietSanPham.soLuong <= 0) {
      this.notification.error('Sản phẩm tạm hết hàng')
    } else if (this.chiTietSanPham.trangThai !== 1) {
      this.notification.error('Sản phẩm dùng kinh doanh')
    } else {
      Swal.fire(
        {
          title: 'Xác nhận thêm sản phẩm',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Xác nhận',
          cancelButtonText: 'Hủy'
        }
      ).then((result) => {
        if (result.isConfirmed) {// check confirm
          this.hoaDonChiTietAdd.idHoaDon = this.invoiceDetail.id;
          this.hoaDonChiTietAdd.donGia = this.chiTietSanPham.giaBan;
          this.hoaDonChiTietAdd.soLuong = 1;
          this.hoaDonChiTietAdd.idChiTietSanPham = this.chiTietSanPham.id;
          this.hoaDonService.addHdct(this.hoaDonChiTietAdd).then(c => {
            if (c) {
              this.hoaDonService.findByInvice(c.hoaDon.id).then(key => {
                this.invoiceDetail = key;

                this.invoiceDetail.listHoaDonChiTiet.forEach((element: any) => {
                  this.invoiceDetail.tongTien += element.soLuong * element.donGia;
                })
                if (this.invoiceDetail.phieuGiamGia === null) {
                  this.invoiceDetail.tongTienSauGiam = this.invoiceDetail.tongTien
                }
                else if (this.invoiceDetail.phieuGiamGia.hinhThucGiamGia === false && this.invoiceDetail.phieuGiamGia.hinhThucGiamGia !== null) {
                  this.invoiceDetail.tienGiam = (this.invoiceDetail.tongTien * this.invoiceDetail.phieuGiamGia.chietKhau) / 100;
                } else {
                  this.invoiceDetail.tienGiam = this.invoiceDetail.phieuGiamGia.chietKhau;
                }
                this.invoiceDetail.tongTienSauGiam = this.invoiceDetail.tongTien - this.invoiceDetail.tienGiam;

                this.invoiceDetail.listHoaDonChiTiet.forEach((key: any) => {
                  this.hoaDonChiTiets.push(
                    {
                      id: key.id,
                      idHoaDon: this.invoiceDetail.id,//đây đi cho đủ dữ liệu thôi nhé
                      idChiTietSanPham: key.chiTietSanPham.id,//đây đi cho đủ dữ liệu thôi nhé
                      soLuong: key.soLuong,
                      donGia: key.donGia
                    }
                  )
                })

                this.form.patchValue({
                  id: this.invoiceDetail.id,
                  maHoaDon: this.invoiceDetail.maHoaDon,
                  ngayTao: this.invoiceDetail.ngayTao,
                  tongTien: this.invoiceDetail.tongTien,
                  tienGiam: this.invoiceDetail.tienGiam,
                  tongTienSauGiam: this.invoiceDetail.tongTienSauGiam,
                  phiVanChuyen: this.invoiceDetail.phiVanChuyen,
                  trangThai: this.invoiceDetail.trangThai,
                  phieuGiamGia: this.invoiceDetail.phieuGiamGia,
                  khachHang: this.invoiceDetail.khachHang,
                  phuongXa: this.ward,
                  quanHuyen: this.district,
                  tinhThanh: this.province,
                  listHoaDonChiTiet: this.hoaDonChiTiets,
                })
                this.hoaDonService.updateInvoice(this.form.value).then(c => {
                  this.hoaDonService.findByInvice(c.id).then(key => {
                    this.invoiceDetail = key;
                  })
                })
              })




            }
          }, err => {
            alert('loi')
          })
        }
      })
    }



  }


  dangGiaoHang(id: number) {
    Swal.fire(
      {
        title: 'Xác nhận giao hàng',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy'
      }
    ).then((result) => {
      if (result.isConfirmed) {// check confirm
        this.hoaDonService.updateStatus(id, 4).then(c => {
          if (c !== null) {
            this.notification.success("Xác nhận giao hàng thành công");
            this.router.navigate(['/admin/hoa-don']);
          }
        }, err => {
          this.notification.error("Xác nhận giao hàng không thành công");
        })
      }
    })
  }

  choLayHang(id: number) {
    if (this.showUpdate === true) {
      Swal.fire(
        {
          title: 'Xác nhận đơn hàng',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Xác nhận',
          cancelButtonText: 'Hủy'
        }
      ).then((result) => {
        if (result.isConfirmed) {// check confirm
          this.hoaDonService.updateStatus(id, 3).then(c => {
            if (c !== null) {
              Swal.fire(
                {
                  title: 'In hóa đơn',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Xác nhận',
                  cancelButtonText: 'Hủy'
                }
              ).then((result) => {
                if (result.isConfirmed) {// check confirm
                  this.exportPDF(id);
                }
              })
              this.notification.success("Xác nhận đơn hàng thành công");
              this.router.navigate(['/admin/hoa-don']);
            }
          }, err => {
            this.notification.error("Xác nhận đơn hàng không thành công");
          })
        }
      })
    } else {
      this.notification.error('Vui lòng cập nhật đơn hàng trước')
    }

  }

  exportPDF(id: number): void {

    this.hoaDonService.exportPdf(id).subscribe(
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

  hoanThanh(id: number) {
    Swal.fire(
      {
        title: 'Xác nhận hoàn thành đơn hàng',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy'
      }
    ).then((result) => {
      if (result.isConfirmed) {// check confirm
        this.hoaDonService.updateStatus(id, 5).then(c => {
          if (c !== null) {
            this.notification.success("Xác nhận hoàn thành đơn hàng thành công");
            this.router.navigate(['/admin/hoa-don']);
          }
        }, err => {
          this.notification.error("Xác nhận hoàn thành đơn hàng không thành công");
        })
      }
    })
  }

  choXacNhan(id: number) {
    Swal.fire(
      {
        title: 'Chờ xác nhận đơn hàng',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy'
      }
    ).then((result) => {
      if (result.isConfirmed) {// check confirm
        this.hoaDonService.updateStatus(id, 2).then(c => {
          if (c !== null) {
            this.notification.success("Chờ xác nhận đơn hàng thành công");
            this.router.navigate(['/admin/hoa-don']);
          }
        }, err => {
          this.notification.error("Chờ xác nhận đơn hàng không thành công");
        })
      }
    })
  }

  huyDon(id: number) {
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
      if (result.isConfirmed) {// check confirm
        this.hoaDonService.updateStatus(id, 6).then(c => {
          if (c !== null) {
            this.notification.success("Xác nhận hủy đơn hàng thành công");
            this.router.navigate(['/admin/hoa-don']);
          }
        }, err => {
          this.notification.error("Xác nhận hủy đơn hàng không thành công");
        })
      }
    })
  }

  // deleteProduct(idHdct: number) {
  //   const index = this.invoiceDetail.listHoaDonChiTiet.findIndex((item: { id: number; }) => item.id === idHdct);
  //   if (index !== -1) {
  //     this.invoiceDetail.listHoaDonChiTiet.splice(index, 1);

  //     if (this.invoiceDetail.listHoaDonChiTiet.length < 1) {
  //       this.invoiceDetail.tongTien = 0
  //       this.invoiceDetail.tongTienSauGiam = 0;
  //     } else {
  //       this.invoiceDetail.tongTien = 0;
  //       this.invoiceDetail.tongTienSauGiam = 0;
  //       this.invoiceDetail.tienGiam = 0;

  //       this.invoiceDetail.listHoaDonChiTiet.forEach((key: any) => {
  //         this.invoiceDetail.tongTien += key.soLuong * key.donGia
  //       })

  //       if (this.invoiceDetail.phieuGiamGia === null) {
  //         this.invoiceDetail.tongTienSauGiam = this.invoiceDetail.tongTien;
  //       } else if (this.invoiceDetail.phieuGiamGia.hinhThucGiamGia === false) {
  //         this.invoiceDetail.tienGiam = (this.invoiceDetail.tongTien * this.invoiceDetail.phieuGiamGia.chietKhau) / 100
  //         this.invoiceDetail.tongTienSauGiam = this.invoiceDetail.tongTien - this.invoiceDetail.tienGiam;
  //       } else {
  //         this.invoiceDetail.tienGiam = this.invoiceDetail.phieuGiamGia.chietKhau;
  //         this.invoiceDetail.tongTienSauGiam = this.invoiceDetail.tongTien - this.invoiceDetail.tienGiam;
  //       }
  //     }


  //   }
  // }

  tangSoLuong(index: number) {
    this.showUpdate = false;
    const idHdct = this.invoiceDetail.listHoaDonChiTiet[index].id;

    this.invoiceDetail.listHoaDonChiTiet.forEach((element: any) => {
      if (element.id == idHdct) {
        this.hoaDonChiTiet = element;
        this.hoaDonChiTiet.soLuong += 1
        this.invoiceDetail.listHoaDonChiTiet = this.invoiceDetail.listHoaDonChiTiet.filter((item: { id: number; }) => item.id !== idHdct);
        this.invoiceDetail.listHoaDonChiTiet.splice(index, 0, this.hoaDonChiTiet);
        this.invoiceDetail.tongTien = 0;
        this.invoiceDetail.listHoaDonChiTiet.forEach((element: any) => {
          this.invoiceDetail.tongTien += element.soLuong * element.donGia;
        });
        // this.invoiceDetail.tongTien = this.tongTien;
        if (this.invoiceDetail.phieuGiamGia === null) {
          this.invoiceDetail.tongTienSauGiam = this.invoiceDetail.tongTien
        }
        else if (this.invoiceDetail.phieuGiamGia.hinhThucGiamGia === false && this.invoiceDetail.phieuGiamGia.hinhThucGiamGia !== null) {
          this.invoiceDetail.tienGiam = (this.invoiceDetail.tongTien * this.invoiceDetail.phieuGiamGia.chietKhau) / 100;
        } else {
          this.invoiceDetail.tienGiam = this.invoiceDetail.phieuGiamGia.chietKhau;
        }
        this.invoiceDetail.tongTienSauGiam = this.invoiceDetail.tongTien - this.invoiceDetail.tienGiam;

        return;
      }
    });
  }

  giamSoLuong(index: number) {
    this.showUpdate = false;
    const idHdct = this.invoiceDetail.listHoaDonChiTiet[index].id;
    this.invoiceDetail.listHoaDonChiTiet.forEach((element: any) => {
      if (element.id == idHdct) {
        this.hoaDonChiTiet = element;
        this.hoaDonChiTiet.soLuong -= 1
        this.invoiceDetail.listHoaDonChiTiet = this.invoiceDetail.listHoaDonChiTiet.filter((item: { id: number; }) => item.id !== idHdct);
        this.invoiceDetail.listHoaDonChiTiet.splice(index, 0, this.hoaDonChiTiet);
        this.invoiceDetail.tongTien = 0;
        this.invoiceDetail.listHoaDonChiTiet.forEach((element: any) => {
          this.invoiceDetail.tongTien += element.soLuong * element.donGia;
        });
        // this.invoiceDetail.tongTien = this.tongTien;
        if (this.invoiceDetail.phieuGiamGia === null) {
          this.invoiceDetail.tongTienSauGiam = this.invoiceDetail.tongTien
        }
        else if (this.invoiceDetail.phieuGiamGia.hinhThucGiamGia === false && this.invoiceDetail.phieuGiamGia.hinhThucGiamGia !== null) {
          this.invoiceDetail.tienGiam = (this.invoiceDetail.tongTien * this.invoiceDetail.phieuGiamGia.chietKhau) / 100;
        } else {
          this.invoiceDetail.tienGiam = this.invoiceDetail.phieuGiamGia.chietKhau;
        }
        this.invoiceDetail.tongTienSauGiam = this.invoiceDetail.tongTien - this.invoiceDetail.tienGiam;

        return;
      }
    });
  }



  callApiGHN(api: any) {
    const headers = new HttpHeaders({
      'token': 'b9c52434-a191-11ee-b394-8ac29577e80e',
      'Content-Type': 'application/json'
    });
    this.http.get(api + 'province', { headers }).subscribe((response: any) => {
      response.data.forEach((a: any) => {
        if (a.ProvinceName == this.invoiceDetail.tinhThanh) {
          this.province_id = a.ProvinceID;
          this.http.get(this.hostGHN + 'district?province_id=' + a.ProvinceID, { headers }).subscribe((res: any) => {
            res.data.forEach((key: any) => {
              if (key.DistrictName == this.invoiceDetail.quanHuyen) {
                this.selectedDistrict = key.DistrictID;
                return;
              }
            })

          });
          return;
        }
      })

    });
  }

  callApiProvince(api: string) {
    const headers = new HttpHeaders({
      'token': 'b9c52434-a191-11ee-b394-8ac29577e80e',
      'Content-Type': 'application/json'
    });
    this.http.get(api + 'province', { headers }).subscribe((response: any) => {
      console.log(response);
      this.provinces = response.data;
      response.data.forEach((key: any) => {
        // console.log(key.ProvinceID);
        if (key.ProvinceName == this.invoiceDetail.tinhThanh) {
          this.province_id = key.ProvinceID;
          this.callApiDistrict(key.ProvinceID);
          return;
        }
      })

    });
  }

  callApiDistrict(province_id: string) {
    const headers = new HttpHeaders({
      'token': 'b9c52434-a191-11ee-b394-8ac29577e80e',
      'Content-Type': 'application/json'
    });
    this.http.get(this.hostGHN + 'district?province_id=' + province_id, { headers }).subscribe((response: any) => {
      console.log(response.data);

      this.districts = response.data;
      response.data.forEach((key: any) => {
        // console.log(key.ProvinceID);
        if (key.DistrictName == this.invoiceDetail.quanHuyen) {
          this.district_id = key.DistrictID;
          this.callApiWard(key.DistrictID);
          return;
        }
      })

    });
  }

  callApiWard(district_id: string) {
    const headers = new HttpHeaders({
      'token': 'b9c52434-a191-11ee-b394-8ac29577e80e',
      'Content-Type': 'application/json'
    });
    this.http.get(this.hostGHN + 'ward?district_id=' + district_id, { headers }).subscribe((response: any) => {
      console.log(response);
      this.wards = response.data;
      // response.data.forEach((key:any)=>{
      //   // console.log(key.ProvinceID);
      //   if (key.WardName == this.invoice.tinhThanh) {
      //     this.ward_id = key.WardCode;
      //     return;
      //   }
      //   })

    });

  }

  onProvinceChange(event: any) {
    this.provinces.forEach((key) => {
      if (key.ProvinceName == event.target.value) {
        this.province_id = key.ProvinceID
      }
    })
    this.selectedProvince = this.province_id;
    this.province = event.target.value;
    this.selectedDistrict = '';
    this.selectedWard = '';
    if (this.selectedProvince !== '') {
      this.callApiDistrict(this.selectedProvince);
    }
  }

  onDistrictChange(event: any) {
    this.district_id = '';
    this.districts.forEach((key) => {
      if (key.DistrictName == event.target.value) {
        this.district_id = key.DistrictID
      }
    })
    this.selectedDistrict = this.district_id;
    this.district = event.target.value;
    this.selectedWard = '';
    if (this.selectedDistrict !== '') {
      this.callApiWard(this.selectedDistrict);
    }
  }

  onWardChange(event: any) {
    this.wards.forEach((key) => {
      if (key.WardName == event.target.value) {
        this.ward_id = key.WardCode
      }
    })
    this.selectedWard = this.ward_id;
    this.ward = event.target.value;
    this.giaoHangNhanh(0);

  }

  giaoHangNhanh(tienGiam: number) {
this.showUpdate = false;
    // Thêm headers
    const headers = new HttpHeaders({
      'token': 'b9c52434-a191-11ee-b394-8ac29577e80e',
      'Content-Type': 'application/json'
    });

    // Thêm parameters
    const params = new HttpParams()
      .set('service_id', 53321)// id tài khoản GHN
      .set('insurance_value', this.invoiceDetail.tongTienSauGiam)// tổng tiền đơn hàng
      .set('coupon', '')//Mã giảm giá của GHN
      .set('from_district_id', 1915)//D Phường/ Xã người gửi
      .set('to_district_id', this.selectedDistrict)//ID Quận/Huyện người nhận
      .set('to_ward_code', this.selectedWard)//ID Quận/Huyện người nhận
      .set('height', 15)//Chiều cao (cm)
      .set('length', 15)// Chiều dài (cm)
      .set('weight', 1000)//trọng lượng dơn hàng (gram)
      .set('width', 15);//Chiều rộng (cm)

    this.http.get(' https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee', { headers, params }).subscribe((response: any) => {
      console.log(response.data.total);
      this.invoiceDetail.phiVanChuyen = response.data.total;
      this.invoiceDetail.tongTienSauGiam = this.invoiceDetail.tongTien;
      if (this.invoiceDetail.phieuGiamGia === null) {
        this.invoiceDetail.tienGiam = 0;
      } else if (this.invoiceDetail.phieuGiamGia.hinhThucGiamGia === false) {
        this.invoiceDetail.tienGiam = (this.invoiceDetail.tongTien * this.invoiceDetail.phieuGiamGia.chietKhau) / 100;
      } else {
        this.invoiceDetail.tienGiam = this.invoiceDetail.phieuGiamGia.chietKhau;
      }
      this.invoiceDetail.tongTienSauGiam = this.invoiceDetail.tongTien - this.invoiceDetail.tienGiam;
    }, (err) => {
      // this.tongTienSauGiam = this.tongTien;
      this.invoiceDetail.phiVanChuyen = 0;
      if (this.invoiceDetail.phieuGiamGia === null) {
        this.invoiceDetail.tienGiam = 0;
      } else if (this.invoiceDetail.phieuGiamGia.hinhThucGiamGia === false) {
        this.invoiceDetail.tienGiam = (this.invoiceDetail.tongTien * this.invoiceDetail.phieuGiamGia.chietKhau) / 100;
      } else {
        this.invoiceDetail.tienGiam = this.invoiceDetail.phieuGiamGia.chietKhau;
      }
      this.invoiceDetail.tongTienSauGiam = this.invoiceDetail.tongTien - this.invoiceDetail.tienGiam;

    });

  }

  onSubmit() {

    this.showUpdate = true;

    this.invoiceDetail.listHoaDonChiTiet.forEach((key: any) => {
      this.hoaDonChiTiets.push(
        {
          id: key.id,
          idHoaDon: this.invoiceDetail.id,//đây đi cho đủ dữ liệu thôi nhé
          idChiTietSanPham: key.chiTietSanPham.id,//đây đi cho đủ dữ liệu thôi nhé
          soLuong: key.soLuong,
          donGia: key.donGia
        }
      )
    })

    this.form.patchValue({
      id: this.invoiceDetail.id,
      maHoaDon: this.invoiceDetail.maHoaDon,
      ngayTao: this.invoiceDetail.ngayTao,
      tongTien: this.invoiceDetail.tongTien,
      tienGiam: this.invoiceDetail.tienGiam,
      tongTienSauGiam: this.invoiceDetail.tongTienSauGiam,
      phiVanChuyen: this.invoiceDetail.phiVanChuyen,
      trangThai: this.invoiceDetail.trangThai,
      phieuGiamGia: this.invoiceDetail.phieuGiamGia,
      khachHang: this.invoiceDetail.khachHang,
      phuongXa: this.ward,
      quanHuyen: this.district,
      tinhThanh: this.province,
      listHoaDonChiTiet: this.hoaDonChiTiets,
    })

    if (this.invoiceDetail.tenKhachHang === '' || this.invoiceDetail.soDienThoai === '' || this.invoiceDetail.diaChi === '') {

      Swal.fire(
        {
          title: 'Xác nhận cập nhật đơn hàng',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Xác nhận',
          cancelButtonText: 'Hủy'
        }
      ).then((result) => {
        if (result.isConfirmed) {
          this.hoaDonService.updateInvoice(this.form.value).then(c => {
            this.notification.success('Cập nhật đơn hàng thành công !');
            this.hoaDonService.findByInvice(history.state.detailData.id).then(key => {
              this.invoiceDetail = key;
              setTimeout(() => {
                window.location.reload();
              }, 500);
            })
          }, err => {
            this.notification.success('Cập nhật đơn hàng không thành công !');
          })
        }
      })

      
    }else{
      this.notification.error('Vui lòng nhập đủ thông tin !')
    }
    


  }




}
