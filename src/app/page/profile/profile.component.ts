import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { CacheService } from 'src/libs/service/request/cache.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MatNativeDateModule } from '@angular/material/core';
import * as moment from 'moment';
import { KhachHangService } from 'src/libs/service/project/khachhangService/KhachHang.service';


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
  isShowInfo: boolean = true;
  infoUpdate: any = {}
  constructor(
    private cacheService: CacheService,
    private fb: FormBuilder,
    private khachHangService: KhachHangService
  ) {
    this.profileForm = fb.group({
      hoTen: [null, Validators.required],
      soDienThoai: [null, Validators.required],
      ngaySinh: [null, Validators.required],
    })

  }

  ngOnInit() {
    this.profile = this.cacheService.get("customer");
    this.profileForm.patchValue({
      ngaySinh: new Date('12/2/2003').toISOString(),
      ...this.profile
    });


  }
  updateProfile() {
    if (this.profileForm.valid) {

    }
  }

  changeTab(numTab: number) {
    if (numTab === 0) {
      this.isShowInfo = true;
      this.isShowChangePass = false;
      this.isShowOrder = false;
    }
  }
  showChangePass() {
    this.isShowChangePass = true;
  }
}
