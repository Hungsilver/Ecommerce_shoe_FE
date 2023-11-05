import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
// import { MessageService } from 'primeng/api';
import { CategoryService } from '../../service/category.service';


@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss']
})
export class CategoryDialogComponent implements OnInit {

  category: any = {};
  type: any;
  ngOnInit(): void {

  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoryService: CategoryService,
    private dialog: MatDialog,
  ) {
    this.type = data.type;
    this.category = data.category;
  }
  addColor() {
    this.categoryService.createCategory(this.category).then(res => {
      console.log('data created', res.content);
      if (res) {
        this.dialog.closeAll();
      }
    })
  }
  updateColor() {
    this.categoryService.updateCategory(this.category, this.category.id).then(res => {
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
