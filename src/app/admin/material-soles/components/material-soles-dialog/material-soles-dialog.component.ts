import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MaterialSolesService } from '../../service/material-soles.service';
@Component({
  selector: 'app-material-soles-dialog',
  templateUrl: './material-soles-dialog.component.html',
  styleUrls: ['./material-soles-dialog.component.scss']
})
export class MaterialSolesDialogComponent implements OnInit {
  materialse: any = {};
  type: any;
  ngOnInit(): void {
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private materialSoles: MaterialSolesService,
    private dialog: MatDialog,
  ) {
    // this.materialSoles
    this.type = data.type;
    this.materialse = data.material;
  }
  addMaterial() {
    this.materialSoles.createMaterial(this.materialse).then(res => {
      console.log('data created', res.content);
      if (res) {
        this.dialog.closeAll();
      }
    })
  }
  updateMaterial() {
    this.materialSoles.updateMaterial(this.materialse, this.materialse.id).then(res => {
      console.log('data updated', res.content);
      if (res) {
        this.dialog.closeAll();
      }
    })
  }
  deleteMaterial() {
    this.materialSoles.deleteMaterial(this.materialse.id);
  }


}
