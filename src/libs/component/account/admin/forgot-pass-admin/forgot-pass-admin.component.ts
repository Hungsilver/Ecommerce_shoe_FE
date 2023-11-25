import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-pass-admin',
  templateUrl: './forgot-pass-admin.component.html',
  styleUrls: ['./forgot-pass-admin.component.scss']
})
export class ForgotPassAdminComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  formForget: FormGroup = this.formBuilder.group({
    email: ['', [Validators.email]],
  });

  onSubmit() {
    if (this.formForget.valid) {
      alert(JSON.stringify(this.formForget.value));
    }
  }
  ngOnInit() {
  }

}
