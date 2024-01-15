import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MaterialService } from '../../service/material.service'
import { FormGroup,FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-material-dialog',
  templateUrl: './material-dialog.component.html',
  styleUrls: ['./material-dialog.component.scss']
})
export class MaterialDialogComponent implements OnInit {
  material: any = {};
  type: any;

  materialForm: FormGroup = new FormGroup({});


  ngOnInit(): void {
    this.materialForm = this.fb.group({
      ten: ['', [Validators.required,Validators.pattern(/[a-zA-Z]+/)]], // Tên là bắt buộc và ít nhất 3 ký tự
      trangThai: [1, Validators.required],
    });

    this.type = this.data.type;

  if (this.type === 'update') {
    this.materialForm.patchValue(this.data.material);
  }


  }
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private materialService: MaterialService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.type = data.type;
    this.material = data.material;
  }
  addMaterial() {
    const materialData = this.materialForm.value;
    this.materialService.createMaterial(materialData).then(res => {
      console.log('data created', res.content);
      if (res) {
        this.dialog.closeAll();
      }
    })
  }
  updateMaterial() {
    const materialData = this.materialForm.value;
    this.materialService.updateMaterials(materialData, this.material.id).then(res => {
      console.log('data updated', res.content);
      if (res) {
        this.dialog.closeAll();
      }
    })
  }
  deleteMaterial() {
    this.materialService.deleteMaterials(this.material.id);
    this.dialog.closeAll();
  }
}
