import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-origin-dialog',
  templateUrl: './origin-dialog.component.html',
  styleUrls: ['./origin-dialog.component.scss']
})
export class OriginDialogComponent implements OnInit {
  origin: any = {};

  ngOnInit(): void {

  }
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.origin = data
  }

}
