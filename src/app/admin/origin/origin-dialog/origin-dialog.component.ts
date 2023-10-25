import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { OriginService } from 'src/libs/service/project/origin/origin.service';

@Component({
  selector: 'app-origin-dialog',
  templateUrl: './origin-dialog.component.html',
  styleUrls: ['./origin-dialog.component.scss']
})
export class OriginDialogComponent implements OnInit {
  origin: any = {};
  type: any;
  ngOnInit(): void {

  }
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private originService: OriginService,
  ) {
    this.type = data.type;
    this.origin = data.origin;
  }
  addOrigin() {
    this.originService.createOrigin(this.origin).then(res => {
      console.log('data created', res.content);
    })
  }
  updateOrigin() {
    this.originService.updateOrigin(this.origin, this.origin.id).then(res => {
      console.log('data updated', res.content);
    })
  }
  deleteOrigin() {
    this.originService.deleteOrigin(this.origin.id);
  }

}
