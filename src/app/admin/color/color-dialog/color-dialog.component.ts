import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ColorService } from 'src/libs/service/project/color/color.service';
@Component({
  selector: 'app-color-dialog',
  templateUrl: './color-dialog.component.html',
  styleUrls: ['./color-dialog.component.scss']
})
export class ColorDialogComponent implements OnInit {
  color: any = {};
  type: any;
  ngOnInit(): void {

  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private colorService: ColorService,
  ) {
    this.type = data.type;
    this.color = data.color;
  }
  addColor() {
    this.colorService.createColor(this.color).then(res => {
      console.log('data created', res.content);
    })
  }
  updateColor() {
    this.colorService.updateColor(this.color, this.color.id).then(res => {
      console.log('data updated', res.content);
    })
  }
  deleteColor() {
    this.colorService.deleteColor(this.color.id);
  }

}
