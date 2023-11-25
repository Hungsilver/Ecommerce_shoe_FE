import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private cacheService: CacheService,
    private authService: BaseAuthService,

  ) { }
  formLogin: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(6)]],
  });

  onSubmit() {
    if (this.formLogin.valid) {
      // alert(JSON.stringify(this.formLogin.value));
      // this.cacheService.
      this.authService.authenticateAdmin(this.formLogin.value).subscribe(async (res: any) => {
        this.cacheService.set('ADMIN', res.content);
      }, err => {
        console.log(err);
      }, () => { }
      )


    }
  }
  ngOnInit() {
  }

}
