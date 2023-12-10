import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { StaffService } from '../../service/staff.service';

@Component({
  selector: 'app-staff-dialog',
  templateUrl: './staff-dialog.component.html',
  styleUrls: ['./staff-dialog.component.scss'],
})
export class StaffDialogComponent implements OnInit {
  staff: any = {};
  type: any;
  ngOnInit(): void {}

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private staffService: StaffService,
    private dialog: MatDialog
  ) {
    this.type = data.type;
    this.staff = data.staff;
  }
  addStaff() {
    this.staffService.createStaff(this.staff).then((res) => {
      console.log('data created', res.content);
      if (res) {
        this.dialog.closeAll;
      }
    });
  }

  updateStaff() {
    this.staffService.updateStaff(this.staff, this.staff.id).then((res) => {
      console.log('data updated', res.content);
      if (res) {
        this.dialog.closeAll();
      }
    });
  }

deleteStaff(){
this.staffService.deleteStaff(this.staff.id);

}






}
