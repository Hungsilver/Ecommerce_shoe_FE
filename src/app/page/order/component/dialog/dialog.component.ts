import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { OrderService } from '../../service/order.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { TraHangComponent } from '../tra-hang/tra-hang.component';
import { isAfter, isSameDay, differenceInDays } from 'date-fns';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  invoice: any = {};
  openDialog: any;
  idInvoice!: number;
  invoiceDetail: any = {};
  invoiceUpdate: any = {};
  tongTien = 0;
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
  phiShip = 0;
  disabledDistrict = true;
  disabledWard = true;
  hoaDonChiTiets: any[] = [];
  ngayHienTai: Date = new Date();
  ngayGiaoHang: Date = new Date();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private orderService: OrderService,
    private notificationService: ToastrService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
  ) {
    this.invoice = data.invoice
    this.openDialog = data.openDialog
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
    this.callApiProvince(this.hostGHN);
    this.callApiGHN(this.hostGHN);
    this.province = this.invoice.tinhThanh
    this.district = this.invoice.quanHuyen
    this.ward = this.invoice.phuongXa
    this.form.get('tenKhachHang')?.setValue(this.invoice.tenKhachHang);
    this.form.get('soDienThoai')?.setValue(this.invoice.soDienThoai);
    this.form.get('diaChi')?.setValue(this.invoice.diaChi);
    // this.form.get('tinhThanh')?.setValue(this.invoice.tinhThanh);
    // this.form.get('quanHuyen')?.setValue(this.invoice.quanHuyen);    
  }

  onSubmit() {


    this.invoice.listHoaDonChiTiet.forEach((key: any) => {
      this.hoaDonChiTiets.push(
        {
          id: key.id,
          idHoaDon: this.invoice.id,//đây đi cho đủ dữ liệu thôi nhé
          idChiTietSanPham: key.chiTietSanPham.id,//đây đi cho đủ dữ liệu thôi nhé
          soLuong: key.soLuong,
          donGia: key.donGia
        }
      )
    })

    this.form.patchValue({
      id: this.invoice.id,
      maHoaDon: this.invoice.maHoaDon,
      ngayTao: this.invoice.ngayTao,
      tongTien: this.invoice.tongTien,
      tienGiam: this.invoice.tienGiam,
      tongTienSauGiam: this.invoice.tongTienSauGiam,
      phiVanChuyen: this.invoice.phiVanChuyen,
      trangThai: this.invoice.trangThai,
      phieuGiamGia: this.invoice.phieuGiamGia,
      khachHang: this.invoice.khachHang,
      phuongXa: this.ward,
      quanHuyen: this.district,
      tinhThanh: this.province,
      listHoaDonChiTiet: this.hoaDonChiTiets,
    })

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
        this.orderService.updateInvoice(this.form.value).then(c => {
          this.notificationService.success('Cập nhật đơn hàng thành công !');
          this.dialog.closeAll();
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }, err => {
          this.notificationService.success('Cập nhật đơn hàng không thành công !');
        })
      }
    })


  }


  closeDialog() {
    if (this.invoice.trangThai === 2) {
      this.dialog.closeAll();
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } else {
      this.dialog.closeAll();
    }
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
      if (result.isConfirmed) {
        this.orderService.huyDon(id).then(c => {
          this.dialog.closeAll();
          this.notificationService.success('Hủy đơn hàng thành công !');
          setTimeout(() => {
            window.location.reload();
          }, 500);
        })
      }
    })
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
        if (this.invoice.listHoaDonChiTiet.length == 1) {
          this.notificationService.error('Bạn không thể xóa sản phẩm cuối !');
        } else {
          this.orderService.deleteInvoiceDetail(idHdct).then(h => {
            this.tongTien = 0;
            this.invoice.listHoaDonChiTiet = this.invoice.listHoaDonChiTiet.filter((item: { id: number; }) => item.id !== idHdct);
            this.invoice.listHoaDonChiTiet.forEach((element: any) => {
              this.tongTien += element.soLuong * element.donGia;
            });
            this.invoice.tongTien = this.tongTien;
            if (this.invoice.phieuGiamGia === null) {
              this.invoice.tongTienSauGiam = this.invoice.tongTien
            }
            else if (this.invoice.phieuGiamGia.hinhThucGiamGia === false && this.invoice.phieuGiamGia.hinhThucGiamGia !== null) {
              this.invoice.tienGiam = (this.tongTien * this.invoice.phieuGiamGia.chietKhau) / 100;
            } else {
              this.invoice.tienGiam = this.invoice.phieuGiamGia.chietKhau;
            }
            this.invoice.tongTienSauGiam = this.invoice.tongTien - this.invoice.tienGiam;

            //update hoadon
            this.invoice.listHoaDonChiTiet.forEach((key: any) => {


              this.hoaDonChiTiets.push(
                {
                  id: key.id,
                  idHoaDon: this.invoice.id,
                  idChiTietSanPham: key.chiTietSanPham.id,
                  soLuong: key.soLuong,
                  donGia: key.donGia
                }
              )
            })

            this.form.patchValue({
              id: this.invoice.id,
              maHoaDon: this.invoice.maHoaDon,
              ngayTao: this.invoice.ngayTao,
              tongTien: this.tongTien,
              tienGiam: this.invoice.tienGiam,
              tongTienSauGiam: this.invoice.tongTienSauGiam,
              phiVanChuyen: this.invoice.phiVanChuyen,
              trangThai: this.invoice.trangThai,
              phieuGiamGia: this.invoice.phieuGiamGia,
              khachHang: this.invoice.khachHang,
              phuongXa: this.ward,
              quanHuyen: this.district,
              tinhThanh: this.province,
              listHoaDonChiTiet: this.hoaDonChiTiets,
            })
            console.log(this.form.value);

            this.orderService.updateInvoice(this.form.value).then(c => {
              console.log(c);

            }, err => {
              alert('lỗi')
            })

          })
        }

      }
    })
  }

  tangSoLuong(index: number) {
    const idHdct = this.invoice.listHoaDonChiTiet[index].id;

    this.invoice.listHoaDonChiTiet.forEach((element: any) => {
      if (element.id == idHdct) {
        this.invoiceDetail = element;
        this.invoiceDetail.soLuong += 1;
        this.invoice.listHoaDonChiTiet = this.invoice.listHoaDonChiTiet.filter((item: { id: number; }) => item.id !== idHdct);
        this.invoice.listHoaDonChiTiet.splice(index, 0, this.invoiceDetail);
        this.tongTien = 0;
        this.invoice.listHoaDonChiTiet.forEach((element: any) => {
          this.tongTien += element.soLuong * element.donGia;
        });
        this.invoice.tongTien = this.tongTien;
        if (this.invoice.phieuGiamGia === null) {
          this.invoice.tongTienSauGiam = this.invoice.tongTien
        }
        else if (this.invoice.phieuGiamGia.hinhThucGiamGia === false && this.invoice.phieuGiamGia.hinhThucGiamGia !== null) {
          this.invoice.tienGiam = (this.tongTien * this.invoice.phieuGiamGia.chietKhau) / 100;
        } else {
          this.invoice.tienGiam = this.invoice.phieuGiamGia.chietKhau;
        }
        this.invoice.tongTienSauGiam = this.invoice.tongTien - this.invoice.tienGiam;

        return;
      }
    });
  }

  giamSoLuong(index: number) {
    const idHdct = this.invoice.listHoaDonChiTiet[index].id;
    this.invoice.listHoaDonChiTiet.forEach((element: any) => {
      if (element.id == idHdct) {
        this.invoiceDetail = element;
        this.invoiceDetail.soLuong -= 1;
        this.invoice.listHoaDonChiTiet = this.invoice.listHoaDonChiTiet.filter((item: { id: number; }) => item.id !== idHdct);
        this.invoice.listHoaDonChiTiet.splice(index, 0, this.invoiceDetail);
        this.tongTien = 0;
        this.invoice.listHoaDonChiTiet.forEach((element: any) => {
          this.tongTien += element.soLuong * element.donGia;
        });
        this.invoice.tongTien = this.tongTien;
        if (this.invoice.phieuGiamGia === null) {
          this.invoice.tongTienSauGiam = this.invoice.tongTien
        }
        else if (this.invoice.phieuGiamGia.hinhThucGiamGia === false && this.invoice.phieuGiamGia.hinhThucGiamGia !== null) {
          this.invoice.tienGiam = (this.tongTien * this.invoice.phieuGiamGia.chietKhau) / 100;
        } else {
          this.invoice.tienGiam = this.invoice.phieuGiamGia.chietKhau;
        }
        this.invoice.tongTienSauGiam = this.invoice.tongTien - this.invoice.tienGiam;

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
        if (a.ProvinceName == this.invoice.tinhThanh) {
          this.province_id = a.ProvinceID;
          this.http.get(this.hostGHN + 'district?province_id=' + a.ProvinceID, { headers }).subscribe((res: any) => {
            res.data.forEach((key: any) => {
              if (key.DistrictName == this.invoice.quanHuyen) {
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
        if (key.ProvinceName == this.invoice.tinhThanh) {
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
        if (key.DistrictName == this.invoice.quanHuyen) {
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

    // Thêm headers
    const headers = new HttpHeaders({
      'token': 'b9c52434-a191-11ee-b394-8ac29577e80e',
      'Content-Type': 'application/json'
    });

    // Thêm parameters
    const params = new HttpParams()
      .set('service_id', 53321)// id tài khoản GHN
      .set('insurance_value', this.invoice.tongTienSauGiam)// tổng tiền đơn hàng
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
      this.invoice.phiVanChuyen = response.data.total;
      this.invoice.tongTienSauGiam = this.tongTien;
      if (this.invoice.phieuGiamGia.hinhThucGiamGia === false) {
        this.invoice.tienGiam = (this.tongTien * this.invoice.phieuGiamGia.chietKhau) / 100;
      } else {
        this.invoice.tienGiam = this.invoice.phieuGiamGia.chietKhau;
      }
      this.invoice.tongTienSauGiam = this.invoice.tongTien - this.invoice.tienGiam;

    }, (err) => {
      // this.tongTienSauGiam = this.tongTien;
      this.invoice.phiVanChuyen = 0;
      if (this.invoice.phieuGiamGia.hinhThucGiamGia === false) {
        this.invoice.tienGiam = (this.tongTien * this.invoice.phieuGiamGia.chietKhau) / 100;
      } else {
        this.invoice.tienGiam = this.invoice.phieuGiamGia.chietKhau;
      }
      this.invoice.tongTienSauGiam = this.invoice.tongTien - this.invoice.tienGiam;

    });

  }

  // trả hàng

  traHang(invoice: any) {
    this.dialog.closeAll();
    this.ngayGiaoHang = new Date(invoice.ngayCapNhat)
    this.orderService.findTraHangByIdHD(invoice.id).then(t => {

      if (differenceInDays(this.ngayHienTai, this.ngayGiaoHang) > 4 || differenceInDays(this.ngayHienTai, this.ngayGiaoHang) < 0) {
        this.notificationService.error("Đơn hàng đã quá thời gian trả hàng !")
      } else if (t.length === 0) {
        const dialogRef = this.dialog.open(TraHangComponent, {
          width: '1300px',
          height: '650px',

          data: {
            type: "add",
            invoice: invoice,
            openDialog: 8
          },
        })
      }
      else {
        let daTraHang = 0;
        t.forEach((key: any) => {
          if (key.trangThai !== 3) {
            daTraHang = 1;
          } else {
            daTraHang = 0
            
          }
        })
        
        if(daTraHang === 1){
          this.notificationService.error("Đơn hàng đã hoàn trả !");

        }else{
          const dialogRef = this.dialog.open(TraHangComponent, {
            width: '1300px',
            height: '650px',

            data: {
              type: "add",
              invoice: invoice,
              openDialog: 8
            },
          })
        }
      }




    })

    // dialogRef.afterClosed().subscribe(data => {
    //   // this.getAll();
    // })
  }

}




