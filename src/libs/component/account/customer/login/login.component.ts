import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseAuthService } from 'src/libs/service/request/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [],
})
export class LoginComponent {
  userLogin!: any;
  constructor(private formBuilder: FormBuilder,
    private authService: BaseAuthService
  ) { }
  formLogin: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.maxLength(15)]],
  });

  onSubmit() {
    if (this.formLogin.valid) {
      this.authService.authenticateUser(this.formLogin.value).subscribe(data => {
        if (data && data?.content) {

        }
      })
      // alert(JSON.stringify(this.formLogin.value));

    }
  }
}
