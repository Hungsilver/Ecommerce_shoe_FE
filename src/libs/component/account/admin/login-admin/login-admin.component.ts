import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CacheService } from 'src/libs/service/request/cache.service';
import { AuthCustomerService } from '../../serviceAuth/authCustomerService.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss']
})
export class LoginAdminComponent implements OnInit {
  userLogin!: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private cacheService: CacheService,
    private notification: ToastrService,
    private authCustomer: AuthCustomerService
  ) { }

  formLogin: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(6)]],
  });

  onSubmit() {

    if (this.formLogin.valid) {
      this.authCustomer.loginAdmin(this.formLogin.value).then((res: any) => {
        if (res.isOK) {
          this.cacheService.set('admin', res.data);
          this.notification.success('đăng nhập thành công')
          this.router.navigateByUrl('/admin');
          return;
        }
      }, (err) => {
        this.notification.error('đăng nhập không thành công')
      }
      )
    }
  }
  ngOnInit() {
  }

}
