import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MaterialService } from '../../service/material.service'

@Component({
  selector: 'app-material-dialog',
  templateUrl: './material-dialog.component.html',
  styleUrls: ['./material-dialog.component.scss']
})
export class MaterialDialogComponent implements OnInit {
  material: any = {};
  type: any;
  ngOnInit(): void {

  }
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private materialService: MaterialService,
    private dialog: MatDialog,
  ) {
    this.type = data.type;
    this.material = data.material;
  }
  addMaterial() {
    this.materialService.createMaterial(this.material).then(res => {
      console.log('data created', res.content);
      if (res) {
        this.dialog.closeAll();
      }
    })
  }
  updateMaterial() {
    this.materialService.updateMaterials(this.material, this.material.id).then(res => {
      console.log('data updated', res.content);
      if (res) {
        this.dialog.closeAll();
      }
    })
  }
  deleteMaterial() {
    this.materialService.deleteMaterials(this.material.id);

  }
}
