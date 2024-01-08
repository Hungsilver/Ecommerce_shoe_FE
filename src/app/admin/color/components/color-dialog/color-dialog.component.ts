import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { ColorService } from '../../service/color.service';
import { NgToastService } from 'ng-angular-popup';
import { ToastrService } from 'ngx-toastr';
import { FormGroup,Validators,FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-color-dialog',
  templateUrl: './color-dialog.component.html',
  styleUrls: ['./color-dialog.component.scss'],
})
export class ColorDialogComponent implements OnInit {
  color: any = {};
  type: any;


  colorForm : FormGroup = new FormGroup({});
  ngOnInit(): void {
    this.colorForm = this.fb.group({
      ten: ['', [Validators.required,Validators.pattern(/[a-zA-Z]+/)]], // Tên là bắt buộc và ít nhất 3 ký tự
      trangThai: [1, Validators.required],
  });

  this.type = this.data.type;

  if (this.type === 'update') {
    this.colorForm.patchValue(this.data.color);
  }


}

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private colorService: ColorService,
    private dialog: MatDialog,
      private fb:FormBuilder,
    private toast: NgToastService,
    private notification: ToastrService,


  ) {
    this.type = data.type;
    this.color = data.color;
  }
  addColor() {
    const colorData = this.colorForm.value;
    this.colorService.createColor(colorData).then(res => {
      console.log('data created', res.content);
      if (res) {
        // this.toast.success({ detail: "Success Message", summary: "Success", duration: 5000 })
        this.notification.success("Thêm thành công")
        this.dialog.closeAll();
      } else {
        this.toast.error({ detail: "Success False", summary: "False", duration: 5000 })
      }
    })
  }
  updateColor() {
    const colorData = this.colorForm.value;
    this.colorService.updateColor(colorData, this.color.id).then(res => {
      if (res) {
        this.dialog.closeAll();
      }
      console.log('data updated', res.content);
    })
  }
  deleteColor() {
    this.colorService.deleteColor(this.color.id);
    this.dialog.closeAll()
  }
}
