import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthCustomerService } from '../../serviceAuth/authCustomerService.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

interface IRegister {
  fullName: string;
  email: string;
  password: string;
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [MessageService],
})
export class RegisterComponent {
  constructor(
    private formBuilder: FormBuilder,
    private messageService: ToastrService,
    private authenticationService: AuthCustomerService,
    private router: Router
  ) { }

  myForm: FormGroup = this.formBuilder.group({
    hoTen: ['', [Validators.required, Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.email]],
    matKhau: ['', [Validators.required, Validators.maxLength(16)]],
  });

  onSubmit() {
    if (this.myForm.valid) {
      this.authenticationService.registerCustomer(this.myForm.value).then(res => {
        if (res?.isOK) {
          this.messageService.success('Đăng kí thành công');
          this.router.navigateByUrl('/auth/login');
        } else {
          this.messageService.error('Đăng kí thất bại');
        }
      })
    } else {
      this.messageService.error('Hãy kiểm tra lại form');
    }
  }
}
