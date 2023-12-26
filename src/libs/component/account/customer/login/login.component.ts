import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthCustomerService } from '../../serviceAuth/authCustomerService.service';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { CacheService } from 'src/libs/service/request/cache.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [],
})
export class LoginComponent implements OnInit {
  items: MenuItem[] | undefined;

  home: MenuItem | undefined;

  userLogin!: any;

  constructor(private formBuilder: FormBuilder,
    private authCustomService: AuthCustomerService,
    private notificationService: ToastrService,
    private cacheService: CacheService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.items = [{ label: 'Login' }];

    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }
  formLogin: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    matKhau: ['', [Validators.required, Validators.maxLength(15)]],
  });

  onSubmit() {
    if (this.formLogin.valid) {
      this.authCustomService.loginCustomer(this.formLogin.value).then(res => {
        if (res) {
          this.notificationService.success('Đăng nhập thành công', 'Đăng nhập');
          this.cacheService.set('customer', res.data)
          this.router.navigateByUrl('/');
        }
      }, err => {
        this.notificationService.error('Đăng nhập thất bại', 'Đăng nhập');
      })
    }
  }
}
