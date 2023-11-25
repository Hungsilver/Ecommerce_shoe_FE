import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthCustomerService } from '../../serviceAuth/authCustomerService.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [],
})
export class LoginComponent {
  userLogin!: any;
  constructor(private formBuilder: FormBuilder,
    private authCustomService: AuthCustomerService,
    private notification: Toast,


  ) { }
  formLogin: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.maxLength(15)]],
  });

  onSubmit() {
    if (this.formLogin.valid) {
      this.authCustomService.loginCustomer(this.formLogin.value).then(res => {
        if (res) {

        }
      })
    }
  }
}
