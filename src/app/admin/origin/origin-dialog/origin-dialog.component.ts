import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
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
    private dialog: MatDialog,
    private messageService: MessageService

  ) {
    this.type = data.type;
    this.origin = data.origin;
  }
  addOrigin() {
    this.originService.createOrigin(this.origin).then(res => {
      if (res) {
        this.dialog.closeAll();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'add thành công' });
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'add thất bại' });

      }
    })
  }
  updateOrigin() {
    this.originService.updateOrigin(this.origin, this.origin.id).then(res => {
      if (res) {
        this.dialog.closeAll()
      }
    })
  }
  deleteOrigin() {
    this.originService.deleteOrigin(this.origin.id);
  }

}
