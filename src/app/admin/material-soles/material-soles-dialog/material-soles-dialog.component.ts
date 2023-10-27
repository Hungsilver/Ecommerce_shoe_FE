import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MaterialSolesService } from 'src/libs/service/project/material-soles/material-soles.service';
@Component({
  selector: 'app-material-soles-dialog',
  templateUrl: './material-soles-dialog.component.html',
  styleUrls: ['./material-soles-dialog.component.scss']
})
export class MaterialSolesDialogComponent implements OnInit {
  materials: any = {};
  type: any;
  ngOnInit(): void {
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private materialSoles: MaterialSolesService,
  ) {
    this.type = data.type;
    this.materials = data.material;
  }
  addMaterial() {
    this.materialSoles.createMaterial(this.materials).then(res => {
      console.log('data created', res.content);
    })
  }
  updateMaterial() {
    this.materialSoles.updateMaterial(this.materials, this.materials.id).then(res => {
      console.log('data updated', res.content);
    })
  }
  deleteMaterial() {
    this.materialSoles.deleteMaterial(this.materials.id);
  }


}
