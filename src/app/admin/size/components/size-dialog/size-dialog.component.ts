import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { SizeService } from '../../service/size.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-size-dialog',
  templateUrl: './size-dialog.component.html',
  styleUrls: ['./size-dialog.component.scss']
})
export class SizeDialogComponent implements OnInit {

  sizes: any = {};
  type: any;

  sizeForm :FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.sizeForm = this.fb.group({
      size: ['', [Validators.required]], // Tên là bắt buộc và ít nhất 3 ký tự
      trangThai: [1, Validators.required],
    });


    this.type = this.data.type;
  if (this.type === 'update') {
    this.sizeForm.patchValue(this.data.size);
  }

  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sizeService: SizeService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.type = data.type;
    this.sizes = data.size;
  }
  addOrigin() {
    const sizeData = this.sizeForm.value;
    this.sizeService.createSize(sizeData).then(res => {
      console.log('data created', res.content);
      if (res) {
        this.dialog.closeAll();
      }
    })
  }
  updateOrigin() {
    const sizeData =this.sizeForm.value;
    this.sizeService.updateSize(sizeData, this.sizes.id).then(res => {
      console.log('data updated', res.content);
      if (res) {
        this.dialog.closeAll();
      }
    })
  }
  deleteOrigin() {
    this.sizeService.deleteSize(this.sizes.id);
  }

}
