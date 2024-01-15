import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MaterialSolesService } from '../../service/material-soles.service';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
@Component({
  selector: 'app-material-soles-dialog',
  templateUrl: './material-soles-dialog.component.html',
  styleUrls: ['./material-soles-dialog.component.scss']
})
export class MaterialSolesDialogComponent implements OnInit {
  materialSloes: any = {};
  type: any;

  materialSolesForm: FormGroup = new FormGroup({});


  ngOnInit(): void {
    this.materialSolesForm = this.fb.group({
      ten: ['', [Validators.required,Validators.pattern(/[a-zA-Z]+/)]], // Tên là bắt buộc và ít nhất 3 ký tự
      trangThai: [1,Validators.required],
    });

    if(this.data.materialSloes && this.data.materialSloes.ten
       && this.data.materialSloes.trangThai){
        this.materialSolesForm.patchValue({
          ten: this.data.materialSloes.ten,
          trangThai: this.data.materialSloes.trangThai,
        });
       }

  //   this.type = this.data.type;
  // if (this.type === 'update') {
  //   this.materialSolesForm.patchValue(this.data.materialSloes);
  // }

  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private materialSoles: MaterialSolesService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {
    // this.materialSoles
    this.type = data.type;
    this.materialSloes = data.materialSloes;
  }
  addMaterial() {
    const materialSolesData = this.materialSolesForm.value;
    this.materialSoles.createMaterial(materialSolesData).then(res => {
      console.log('data created', res.content);
      if (res) {
        this.dialog.closeAll();
      }
    })
  }
  updateMaterial() {
    const materialSolesData = this.materialSolesForm.value;
    this.materialSoles.updateMaterial(materialSolesData,this.materialSloes.id).then(res => {
      console.log('data updated', res.content);
      if (res) {
        this.dialog.closeAll();
      }
    })
  }
  deleteMaterial() {
    this.materialSoles.deleteMaterial(this.materialSloes.id);
  }


}
