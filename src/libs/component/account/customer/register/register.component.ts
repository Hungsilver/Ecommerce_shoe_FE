import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

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
    private messageService: MessageService
  ) {}

  myForm: FormGroup = this.formBuilder.group({
    fullName: ['', [Validators.required, Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.maxLength(16)]],
  });

  onSubmit() {
    if (this.myForm.valid) {
      const formData: IRegister = this.myForm.value;
      alert(JSON.stringify(formData.password));
    } else {
      alert('invalid');
    }
  }
}
