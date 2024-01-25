import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
// import { MessageService } from 'primeng/api';
import { CategoryService } from '../../service/category.service';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';


@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss']
})
export class CategoryDialogComponent implements OnInit {

  category: any = {};
  type: any;


  categoryForm:FormGroup = new FormGroup({});
  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      ten: ['', [Validators.required,Validators.pattern(/[a-zA-Z]+/)]], // Tên là bắt buộc và ít nhất 3 ký tự
      trangThai: [1, Validators.required],
    });

    this.type = this.data.type;

    if (this.type === 'update') {
      this.categoryForm.patchValue(this.data.category);
    }
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private fb:FormBuilder
  ) {
    this.type = data.type;
    this.category = data.category;
  }
  addColor() {
    const categoryData = this.categoryForm.value;
    this.categoryService.createCategory(categoryData).then(res => {
      console.log('data created', res.content);
      if (res) {
        this.dialog.closeAll();
      }
    })
  }
  updateColor() {
    const categoryData = this.categoryForm.value;
    this.categoryService.updateCategory(categoryData, this.category.id).then(res => {
      if (res) {
        this.dialog.closeAll();
      }
      console.log('data updated', res.content);
    })
  }
  deleteColor() {
    this.categoryService.deleteCategory(this.category.id);
    this.dialog.closeAll()
  }

}
