import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { SizeService } from 'src/libs/service/project/size/size.service';
@Component({
  selector: 'app-size-dialog',
  templateUrl: './size-dialog.component.html',
  styleUrls: ['./size-dialog.component.scss']
})
export class SizeDialogComponent implements OnInit {

  size: any = {};
  type: any;
  ngOnInit(): void {

  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sizeService: SizeService,
  ) {
    this.type = data.type;
    this.size = data.size;
  }
  addOrigin() {
    this.sizeService.createSize(this.size).then(res => {
      console.log('data created', res.content);
    })
  }
  updateOrigin() {
    this.sizeService.updateSize(this.size, this.size.id).then(res => {
      console.log('data updated', res.content);
    })
  }
  deleteOrigin() {
    this.sizeService.deleteSize(this.size.id);
  }

}
