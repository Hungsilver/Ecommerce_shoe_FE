import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { ColorService } from '../../service/color.service';

@Component({
  selector: 'app-color-dialog',
  templateUrl: './color-dialog.component.html',
  styleUrls: ['./color-dialog.component.scss'],
})
export class ColorDialogComponent {
  color: any = {};
  type: any;
  ngOnInit(): void {}
  constructor(
    // @Inject(MAT_DIALOG_DATA) public data: any,
    private colorService: ColorService,
    private dialog: MatDialog
  ) // private messageService: MessageService
  {
    // this.type = data.type;
    // this.color = data.color;
  }
  addColor() {
    this.colorService.createColor(this.color).then((res) => {
      if (res) {
        this.dialog.closeAll();
        // this.messageService.add({
        //   severity: 'success',
        //   summary: 'Success',
        //   detail: 'add thành công',
        // });
      } else {
        // this.messageService.add({
        //   severity: 'error',
        //   summary: 'Error',
        //   detail: 'add thất bại',
        // });
      }
    });
  }
  updateColor() {
    this.colorService.updateColor(this.color, this.color.id).then((res) => {
      if (res) {
        this.dialog.closeAll();
      }
    });
  }
  deleteColor() {
    this.colorService.deleteColor(this.color.id);
  }
}
