import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthCustomerService } from '../../serviceAuth/authCustomerService.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotPass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.scss'],
})
export class ForgotPassComponent {
  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthCustomerService,
    private notificationService: ToastrService,
    private router: Router
  ) { }

  formForget: FormGroup = this.formBuilder.group({
    email: ['', [Validators.email]],
  });

  onSubmit() {
    if (this.formForget.valid) {
      this.authenticationService.forgetPassCustomer(this.formForget.value).then(res => {
        if (res?.isOK) {
          this.notificationService.success('Thành công. Vui lòng kiểm tra email');
          this.router.navigateByUrl('/auth/login');
        } else {
          this.notificationService.error('Có lỗi xảy ra');
        }
      })
    }
  }
}
