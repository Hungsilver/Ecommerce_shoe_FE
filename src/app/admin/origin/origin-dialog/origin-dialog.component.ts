import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
// import { MessageService } from 'primeng/api';
import { OriginService } from 'src/libs/service/project/origin/origin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-origin-dialog',
  templateUrl: './origin-dialog.component.html',
  styleUrls: ['./origin-dialog.component.scss'],
})
export class OriginDialogComponent implements OnInit {
  origin: any = {};
  type: any;

  originForm:FormGroup = new FormGroup({});

ngOnInit(): void {
  this.originForm = this.fb.group({
    ten: ['', [Validators.required,Validators.pattern(/[a-zA-Z]+/)]], // Tên là bắt buộc và ít nhất 3 ký tự
    trangThai: [1, Validators.required],
  });

  this.type = this.data.type;

  if (this.type === 'update') {
    this.originForm.patchValue(this.data.origin);
  }
}


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private originService: OriginService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) // private messageService: MessageService

  {
    this.type = data.type;
    this.origin = data.origin;
  }
  addOrigin() {
    const originData = this.originForm.value;
    this.originService.createOrigin(originData).then((res) => {
      if (res) {
        this.dialog.closeAll();
        // this.messageService.add({ severity: 'success', summary: 'Success', detail: 'add thành công' });
      } else {
        // this.messageService.add({ severity: 'error', summary: 'Error', detail: 'add thất bại' });
      }
    });
  }
  updateOrigin() {
    const originData = this.originForm.value;
    this.originService.updateOrigin(originData, this.data.origin.id).then((res) => {
      if (res) {
        this.dialog.closeAll();
      }
    });
  }
  deleteOrigin() {
    this.originService.deleteOrigin(this.data.origin.id);
    this.dialog.closeAll()
  }
}
