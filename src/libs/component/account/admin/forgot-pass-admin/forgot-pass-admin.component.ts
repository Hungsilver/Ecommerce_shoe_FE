import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthAdminService } from '../../serviceAuth/authAdminService.service';

@Component({
  selector: 'app-forgot-pass-admin',
  templateUrl: './forgot-pass-admin.component.html',
  styleUrls: ['./forgot-pass-admin.component.scss']
})
export class ForgotPassAdminComponent implements OnInit {
  isConfirmPass: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private authAdminService: AuthAdminService
  ) { }

  formForget: FormGroup = this.formBuilder.group({
    email: ['', [Validators.email]],
  });

  onSubmit() {
    if (this.formForget.valid) {
      this.authAdminService.forgetPassAdmin(this.formForget?.get('email')?.value).then((res) => {

      })
    }
  }
  ngOnInit() {
  }

}
