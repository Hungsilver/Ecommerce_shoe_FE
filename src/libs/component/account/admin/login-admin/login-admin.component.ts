import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/libs/service/notification/notification.service';
import { BaseAuthService } from 'src/libs/service/request/auth.service';
import { CacheService } from 'src/libs/service/request/cache.service';

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
    private authService: BaseAuthService,
    // private notificationService: NotificationService
  ) { }
  formLogin: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(6)]],
  });

  onSubmit() {

    if (this.formLogin.valid) {
      //   // alert(JSON.stringify(this.formLogin.value));
      //   // this.cacheService.
      //   this.authService.authenticateAdmin(this.formLogin.value).subscribe(async (res: any) => {
      //     if (res?.content) {
      //       this.cacheService.set('admin', res.content);
      //     }
      //   }, err => {
      //     console.log(err);
      //   }, () => { }
      //   )
      //call api luu vao cache
      if (this.formLogin.get('email')?.value === 'admin@gmail.com'
        && this.formLogin.get('password')?.value === 'admin@123'
      ) {
        this.cacheService.set('admin', { id: 1, ten: 'hung silver' });
        this.router.navigateByUrl('/admin')
      }

      // if (!this.cacheService.get('admin')) {
      //   alert('loi login admin');
      // } else {
      // }

    }
  }
  ngOnInit() {
  }

}
