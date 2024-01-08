import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { StaffService } from '../../service/staff.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
@Component({
  selector: 'app-staff-dialog',
  templateUrl: './staff-dialog.component.html',
  styleUrls: ['./staff-dialog.component.scss'],
})
export class StaffDialogComponent implements OnInit {
  staff: any = {};
  type: any;
  uploadedUrl: string | null = null;

staffFrom :FormGroup = new FormGroup({});


  ngOnInit(): void {

    this.staffFrom = this.fb.group({
      hoTen: ['', [Validators.required,Validators.pattern(/^[\p{L}]+([\s.'-][\p{L}]+)*$/u)]],
      email : ['', [Validators.required,Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]],
      matKhau:  ['', [Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/),Validators.minLength(8)]],
      soDienThoai:  ['',[ Validators.required,Validators.pattern(/^(0[1-9])+([0-9]{8})$/)]],
      gioiTinh:  [true, Validators.required],
      ngaySinh:  ['', Validators.required],
      diaChi: ['', Validators.required],
      trangThai: [1, Validators.required],
      anhDaiDien :['', Validators.required],
  });

  // if(this.data.staff && this.data.staff.hoTen && this.data.staff.email && this.data.staff.matKhau
  //   &&  this.data.staff.soDienThoai && this.data.staff.gioiTinh && this.data.staff.ngaySinh
  //   &&this.data.staff.diaChi && this.data.staff.trangThai && this.data.staff.anhDaiDien
  //   ){
  //     this.staffFrom.patchValue({
  //       hoTen :this.data.staff.hoTen,
  //       email :this.data.staff.email,
  //       matKhau :this.data.staff.matKhau,
  //       soDienThoai: this.data.staff.soDienThoai,
  //       gioiTinh :this.data.staff.gioiTinh,
  //       ngaySinh:this.data.staff.ngaySinh,
  //       diaChi : this.data.staff.diaChi,
  //       trangThai: this.data.staff.trangThai,
  //       // anhDaiDien :this.data.staff.anhDaiDien,
  //     });
  //   }

  this.type =this.data.type;
  if (this.type === 'update') {
    this.staffFrom.patchValue(this.data.staff);
  }
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private staffService: StaffService,
    private dialog: MatDialog,
    private fireStorage: AngularFireStorage,
    private fb :FormBuilder
  ) {
    this.type = data.type;
    this.staff = data.staff;


  }

  async onFileChange(event: any) {
    const files = event.target.files;
    console.log('files-log', files);

    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const path = `images/${file.name}`;
        const uploadTask = await this.fireStorage.upload(path, file);
        // const url = await uploadTask.ref.getDownloadURL();
        this.uploadedUrl = await uploadTask.ref.getDownloadURL();

        console.log(`Uploaded file ${i}: ${this.uploadedUrl}`);
      }
    }
  }
  addStaff() {
    // const hotenValue = this.staffFrom.get('hoTen').value;
    // const emailValue = this.staffFrom.get('email').value;
    // const matKhauValue = this.staffFrom.get('matKhau').value;
    // const soDienThoaiValue = this.staffFrom.get('soDienThoai').value;
    // const gioiTinhValue = this.staffFrom.get('gioiTinh').value;
    // const ngaySinhValue = this.staffFrom.get('ngaySinh').value;
    // const diaChiValue = this.staffFrom.get('diaChi').value;
    // const trangThaiValue = this.staffFrom.get('trangThai').value;
      const formValue = this.staffFrom.value;
    this.staff ={
      hoTen: formValue.hoTen,
      email : formValue.email,
      matKhau:formValue.matKhau,
      soDienThoai:formValue.soDienThoai,
     gioiTinh : formValue.gioiTinh,
     ngaySinh :formValue.ngaySinh,
     diaChi:formValue.diaChi,
     trangThai:formValue.trangThai,
     anhDaiDien:formValue.anhDaiDien,
    };
    this.staff.anhDaiDien =this.uploadedUrl;
    this.staffService.createStaff(this.staff).then((res) => {
      console.log('data created', res.content);
      if (res) {
        this.dialog.closeAll();
      }
    });
  }

  updateStaff() {
    const formValue = this.staffFrom.value;
    // this.staff ={
    //   hoTen :formValue.hoTen,
    //   email :formValue.email,
    //   matKhau :formValue.matKhau,
    //   soDienThoai: formValue.soDienThoai,
    //   gioiTinh :formValue.gioiTinh,
    //   ngaySinh:formValue.ngaySinh,
    //   diaChi : formValue.diaChi,
    //   trangThai: formValue.trangThai,
    //   // anhDaiDien :formValue.anhDaiDien,
    // anhDaiDien :this.uploadedUrl || this.staff.anhDaiDien,
    // }
      this.staff.anhDaiDien = this.uploadedUrl || this.staff.anhDaiDien;
    this.staffService.updateStaff(formValue, this.data.staff.id).then((res) => {
      console.log('data updated', res.content);
      if (res) {
        this.dialog.closeAll();
      }
    });
  }

deleteStaff(){
this.staffService.deleteStaff(this.staff.id);
this.dialog.closeAll();
}






}
