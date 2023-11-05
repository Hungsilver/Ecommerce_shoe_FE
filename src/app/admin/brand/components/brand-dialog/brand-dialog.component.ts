import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
// import { MessageService } from 'primeng/api';
import { BrandService } from '../../service/brand.service';

@Component({
  selector: 'app-brand-dialog',
  templateUrl: './brand-dialog.component.html',
  styleUrls: ['./brand-dialog.component.scss']
})
export class BrandDialogComponent implements OnInit {
  brand: any = {};
  type: any;
  ngOnInit(): void {

  }


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private brandService: BrandService,
    private dialog: MatDialog,
  ) {
    this.type = data.type;
    this.brand = data.brand;
  }
  addColor() {
    this.brandService.createBrand(this.brand).then(res => {
      console.log('data created', res.content);
      if (res) {
        this.dialog.closeAll();
      }
    })
  }
  updateColor() {
    this.brandService.updateBrand(this.brand, this.brand.id).then(res => {
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
