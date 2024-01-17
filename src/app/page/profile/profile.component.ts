import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CacheService } from 'src/libs/service/request/cache.service';
import { KhachHangService } from 'src/libs/service/project/khachhangService/KhachHang.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profile: any = undefined;
  profileForm: FormGroup;
  isShowOrder: boolean = true;
  isShowChangePass: boolean = false;
  isShowInfo: boolean = false;
  infoUpdate: any = {}
  isDisableUpdate: boolean = true;
  hostGHN = "https://online-gateway.ghn.vn/shiip/public-api/master-data/";
  provinces: any[] = [];
  districts: any[] = [];
  wards: any[] = [];

  selectedProvince = '';
  selectedDistrict = '';
  selectedWard = '';
  province = '';
  district = '';
  ward = '';

  password: string = '';
  confirmPassword: string = '';

  constructor(
    private cacheService: CacheService,
    private fb: FormBuilder,
    private khachHangService: KhachHangService,
    private notification: ToastrService,
    private http: HttpClient
  ) {
    this.profileForm = fb.group({
      hoTen: [null, Validators.required],
      soDienThoai: [null, [Validators.required, Validators.pattern(/^03\d{8}$/)]],
      ngaySinh: [null, Validators.required],
      email: null,
      // tinhThanh: [null, Validators.required],
      // quanHuyen: [null, Validators.required],
      // phuongXa: [null, Validators.required],
      // dcChiTiet: [null, Validators.required],
    })

  }

  ngOnInit() {
    this.profile = this.cacheService.get("customer");
    // this.callApiProvince(this.hostGHN);
    this.profileForm.patchValue({
      ...this.profile,
      ngaySinh: new Date(this.profile.ngaySinh)
    });
  }

  updateProfile() {
    if (this.profileForm.valid) {
      this.profileForm.value.ngaySinh = new Date(this.profileForm.get('ngaySinh')?.value).toLocaleDateString('ja-JP')
      this.khachHangService.updateCustomer(this.profileForm.value, this.profile.id).then(res => {
        if (res.data) {
          this.cacheService.set('customer', res.data);
          this.notification.success('update thành công');
        } else {
          this.notification.error('update thất bại');
        }
      })
      console.log(this.profileForm.value);

    }
  }


  changePass() {
    if (this.password !== this.confirmPassword) {
      this.notification.error('* Mât khẩu phải trùng nhau');
      // this.errorPass = ;
      return;
    }
    if (this.password?.length < 8 || this.password?.length > 16 || this.confirmPassword?.length < 8 || this.confirmPassword?.length > 16) {
      this.notification.error('* Mât khẩu phải từ 8-16 kí tự');
      return;
    }

    this.khachHangService.changePass({ matKhau: this.password }).then(res => {
      if (res) {
        this.notification.success('thay đổi mật khẩu thành công');
      } else {
        this.notification.error('thay đổi mật khẩu thất bại');
      }
    })
  }

  // formatDate(date: string) {
  //   const date = moment('1/1/2001', 'D/M/YYYY');
  //   const formatted = date.format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)');
  //   formatted.replace('GMT', 'GMT+0700 (Indochina Time)');
  //   return
  // }

  changeTab(numTab: number) {
    if (numTab === 1) {
      this.isShowInfo = true;
      this.isShowChangePass = false;
      this.isShowOrder = false;
    } else if (numTab === 2) {
      this.isShowInfo = false;
      this.isShowOrder = true;
      this.isShowChangePass = false;
    } else if (numTab === 3) {
      this.isShowInfo = false;
      this.isShowOrder = false;
      this.isShowChangePass = true;
    }
  }

  showChangePass() {
    this.isShowChangePass = true;
  }

  openEdit() {
    this.isDisableUpdate = !this.isDisableUpdate;
    console.log(this.profileForm.value);
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
    this.provinces.forEach((key) => {
      if (key.ProvinceID == event.target.value) {
        this.province = key.ProvinceName
      }
    })
    this.selectedProvince = event.target.value;
    this.selectedDistrict = '';
    this.selectedWard = '';
    if (this.selectedProvince !== '') {
      this.callApiDistrict(this.selectedProvince);
    }
  }

  onDistrictChange(event: any) {
    this.districts.forEach((key) => {
      if (key.DistrictID == event.target.value) {
        this.district = key.DistrictName
      }
    })
    this.selectedDistrict = event.target.value;
    this.selectedWard = '';
    if (this.selectedDistrict !== '') {
      this.callApiWard(this.selectedDistrict);
    }
  }

  onWardChange(event: any) {
    this.wards.forEach((key) => {
      if (key.WardCode == event.target.value) {
        this.ward = key.WardName
      }
    })
    this.selectedWard = event.target.value;
  }
}
