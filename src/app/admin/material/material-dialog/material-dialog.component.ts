import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MaterialService } from 'src/libs/service/project/material/material.service';

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
  ) {
    this.type = data.type;
    this.material = data.material;
  }
  addMaterial() {
    this.materialService.createMaterial(this.material).then(res => {
      console.log('data created', res.content);
    })
  }
  updateMaterial() {
    this.materialService.updateMaterial(this.material, this.material.id).then(res => {
      console.log('data updated', res.content);
    })
  }
  deleteMaterial() {
    this.materialService.deleteMaterial(this.material.id);
  }
}
