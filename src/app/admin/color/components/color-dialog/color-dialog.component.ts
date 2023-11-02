import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { ColorService } from '../../service/color.service';

@Component({
  selector: 'app-color-dialog',
  templateUrl: './color-dialog.component.html',
  styleUrls: ['./color-dialog.component.scss'],
})
export class ColorDialogComponent implements OnInit {
  color: any = {};
  type: any;
  ngOnInit(): void {

  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private colorService: ColorService,
    private dialog: MatDialog,
  ) {
    this.type = data.type;
    this.color = data.color;
  }
  addColor() {
    this.colorService.createColor(this.color).then(res => {
      console.log('data created', res.content);
      if (res) {
        this.dialog.closeAll();
      }
    })
  }
  updateColor() {
    this.colorService.updateColor(this.color, this.color.id).then(res => {
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
