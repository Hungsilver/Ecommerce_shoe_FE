import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
// import { MessageService } from 'primeng/api';
import { BrandService } from '../../service/brand.service';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-brand-dialog',
  templateUrl: './brand-dialog.component.html',
  styleUrls: ['./brand-dialog.component.scss']
})
export class BrandDialogComponent implements OnInit {
  brand: any = {};
  type: any;

  brandFrom: FormGroup = new FormGroup({});
  ngOnInit(): void {
    this.brandFrom =this.fb.group({
      ten: ['', [Validators.required, Validators.minLength(3)]], // Tên là bắt buộc và ít nhất 3 ký tự
      trangThai: [1, Validators.required],

    });
    this.type = this.data.type;
    if (this.type === 'update') {
      this.brandFrom.patchValue(this.data.brand);
    }

  }


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private brandService: BrandService,
    private dialog: MatDialog,
    private fb :FormBuilder
  ) {
    this.type = data.type;
    this.brand = data.brand;
  }
  addColor() {
    const brandData =this.brandFrom.value;
    this.brandService.createBrand(brandData).then(res => {
      console.log('data created', res.content);
      if (res) {
        this.dialog.closeAll();
      }
    })
  }
  updateColor() {
    const brandData = this.brandFrom.value;
    this.brandService.updateBrand(brandData, this.brand.id).then(res => {
      console.log('data updated', res.content);
      if (res) {
        this.dialog.closeAll();
      }
    })
  }
  deleteColor() {
    this.brandService.deleteBrand(this.brand.id);
    this.dialog.closeAll()
  }

}
