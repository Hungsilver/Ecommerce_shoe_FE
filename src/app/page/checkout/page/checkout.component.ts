import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CartService } from '../../cart/service/cart.service';
import { CacheService } from 'src/libs/service/request/cache.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CheckoutService } from '../service/checkout.service';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  home: any;
  items: any;
  hostGHN = "https://online-gateway.ghn.vn/shiip/public-api/master-data/";
  provinces: any[] = [];
  districts: any[] = [];
  wards: any[] = [];
  phiShip = 0;
  headers: any;
  cartDetails: any[] = [];
  query: any = {};
  tongTien = 0;
  tongTienSauGiam = 0;
  tienGiam = 0;
  phieuGiamGia: any = []
  hinhThucGiamGia: any;
  idPhieuGiamGia: any;
  chietKhau = 0;
  hoaDonChiTietReqest: any[] = [];
  selectedProvince = '';
  selectedDistrict = '';
  selectedWard = '';



  constructor(
    private notificationService: ToastrService,
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private cacheService: CacheService,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.items = [{ label: 'Thanh toán' }];
    this.home = { icon: '', label: 'Trang chủ', routerLink: '/' };
    this.callApiProvince(this.hostGHN);
    this.findByIdGhct();
    console.log(this.hoaDonChiTietReqest);

  }

  form: FormGroup = this.formBuilder.group({
    tenKhachHang: ['', [Validators.required, Validators.maxLength(50)]],
    soDienThoai: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$')]],
    diaChi: ['', [Validators.required, Validators.maxLength(100)]],
    phuongXa: ['', [Validators.required]],
    quanHuyen: ['', [Validators.required]],
    tinhThanh: ['', [Validators.required]],
    tongTien: '',
    tienGiam: '',
    tongTienSauGiam: '',
    phiVanChuyen: '',
    phuongThucThanhToan: ['0'],
    trangThai: '',
    phieuGiamGia: '',
    khachHang: '',
    nhanVien: '',
    hoaDonChiTietRequests: [this.hoaDonChiTietReqest]

  });

  onSubmit() {
    this.form.patchValue({
      phuongXa: this.selectedWard,
      quanHuyen: this.selectedDistrict,
      tinhThanh: this.selectedProvince,
      tongTien: this.tongTien,
      tienGiam: this.tienGiam,
      tongTienSauGiam: this.tongTienSauGiam,
      phiVanChuyen: this.phiShip,
      trangThai: null,
      phieuGiamGia:this.idPhieuGiamGia,
      khachHang: null,
      nhanVien: null,
      hoaDonChiTietReqests: this.hoaDonChiTietReqest
    })
    console.log(this.hoaDonChiTietReqest);

    if (this.form.valid) {
      if(this.phiShip === 0){// check giao hang nhanh
        this.notificationService.error('Không hỗ trợ giao hàng tại địa phương của bạn !');
      }else{
        Swal.fire(
          {
            title: 'Xác nhận thanh toán',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Thanh toán',
            cancelButtonText: 'Hủy'
          }
        ).then((result) => {
          if (result.isConfirmed) {// check confirm
            if (this.form.value.phuongThucThanhToan === '0') {// check phuongthucthanhtoan
              this.checkoutService.checkout(this.form.value).then(c => {
                this.router.navigate(['/payment/success'])
              },(err)=>{
                this.router.navigate(['/payment/error'])
              })
            } else {
              this.checkoutService.checkout(this.form.value).then(c => {
                console.log(c);
                window.location.href = c.data;
              })
            }
          }
        })
      }
      
    } else {
      this.notificationService.error('Vui lòng nhập đầy đủ thông tin!');
    }
  }

  findByIdGhct() {
    this.query.listIdGhct = this.cacheService.get('listIdGhct');
    this.cartService.findById(this.query).then((c) => {
      c.forEach((cart: any) => {
        this.tongTien += (cart.soLuong * cart.giaBan);
        this.tongTienSauGiam = this.tongTien;
        this.cartDetails.push(cart);
        this.hoaDonChiTietReqest.push({
          id: null,
          idHoaDon: null,
          idChiTietSanPham: cart.chiTietSanPham.id,
          soLuong: cart.soLuong,
          donGia: cart.giaBan
        })
      })
    })
  }

  findByCodeVoucher(event: any) {
    this.phieuGiamGia.ma = event.target.value;
    this.tongTienSauGiam = this.tongTien;
    this.checkoutService.findByMaPhieuGiamGia(this.phieuGiamGia).then((p) => {
      console.log(p);
      if (p === null) {
        console.log('không tìm thấy');
        this.chietKhau = 0;
        this.tongTienSauGiam = this.tongTien;
        this.notificationService.error('Mã voucher không hợp lệ');
      } else {
        this.idPhieuGiamGia = p.id;
        if(p.trangThai === 1){
          if (p.hinhThucGiamGia === true) {
            this.hinhThucGiamGia = p.hinhThucGiamGia;
            this.chietKhau = p.chietKhau;
            this.tienGiam = ((this.tongTienSauGiam * p.chietKhau) / 100)
            this.tongTienSauGiam = (this.tongTienSauGiam - this.tienGiam);
            console.log(true);
  
          } else {
            this.hinhThucGiamGia = p.hinhThucGiamGia;
            this.chietKhau = p.chietKhau;
            this.tienGiam = p.chietKhau;
            this.tongTienSauGiam = (this.tongTienSauGiam - this.tienGiam);
            console.log(false);
  
          }
        }else{
          this.notificationService.error('Mã voucher không hợp lệ');
        }
        
      }


    }
    )
  }

  callApiProvince(api: string) {
    const headers = new HttpHeaders({
      'token': 'b9c52434-a191-11ee-b394-8ac29577e80e',
      'Content-Type': 'application/json'
    });
    this.http.get(api + 'province', { headers }).subscribe((response: any) => {
      console.log(response);
      this.provinces = response.data;
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
    });

  }

  onProvinceChange(event: any) {
    this.selectedProvince = event.target.value;
    this.selectedDistrict = '';
    this.selectedWard = '';
    if (this.selectedProvince !== '') {
      this.callApiDistrict(this.selectedProvince);
    }
  }

  onDistrictChange(event: any) {
    this.selectedDistrict = event.target.value;
    this.selectedWard = '';
    if (this.selectedDistrict !== '') {
      this.callApiWard(this.selectedDistrict);
    }
  }

  onWardChange(event: any) {
    this.selectedWard = event.target.value;
    this.giaoHangNhanh();

  }

  giaoHangNhanh() {
    // Thêm headers
    const headers = new HttpHeaders({
      'token': 'b9c52434-a191-11ee-b394-8ac29577e80e',
      'Content-Type': 'application/json'
    });

    // Thêm parameters
    const params = new HttpParams()
      .set('service_id', 53321)// id tài khoản GHN
      .set('insurance_value', this.tongTienSauGiam)// tổng tiền đơn hàng
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
      this.phiShip = response.data.total;
      this.tongTienSauGiam += response.data.total;
    }, (err) => {
      this.phiShip = 0;
      this.notificationService.error('Không hỗ trợ giao hàng tại địa phương của bạn  !')
    });

  }



}
