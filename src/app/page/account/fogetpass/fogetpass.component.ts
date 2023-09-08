import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-fogetpass',
  templateUrl: './fogetpass.component.html',
  styleUrls: ['./fogetpass.component.scss'],
})
export class FogetpassComponent {
  constructor(private formBuilder: FormBuilder) {}

  formForget: FormGroup = this.formBuilder.group({
    email: ['', [Validators.email]],
  });

  onSubmit() {
    if (this.formForget.valid) {
      alert(JSON.stringify(this.formForget.value));
    }
  }
}
