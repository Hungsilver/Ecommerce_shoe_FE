import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { ProductService } from '../../service/product.service';
import { CategoryService } from '../../../category/service/category.service';

@Component({
  selector: 'app-dialog-product',
  templateUrl: './dialog-product.component.html',
  styleUrls: ['./dialog-product.component.scss']
})
export class DialogProductComponent implements OnInit {

  product: any = {};
  categories: any[] = [];
  type: any;

  ngOnInit(): void {
    // this.loadCategories(); // Gọi hàm loadCategories khi component được khởi tạo
  }
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductService,
    private dialog: MatDialog,
    private categoryService: CategoryService,
  ) {
    this.categories = data.categories;
    this.type = data.type;
    this.product = data.product;
  }

  loadCategories() {
    this.productService.getCategory().then((res) => {
      this.categories = res.content; // Gán danh sách danh mục vào biến categories
      console.log(res);
    });
  }

  addProduct() {
    this.productService.createProduct(this.product).then(res => {
      console.log('data created', res.content);
      if (res) {
        this.dialog.closeAll();
      }
    })
  }

  updateProduct() {
    this.productService.updateProduct(this.product, this.product.id).then(res => {
      if (res) {
        this.dialog.closeAll();
      }
      console.log('data updated', res.content);
    })
  }
  deleteProduct() {
    this.productService.deleteColor(this.product.id);
    this.dialog.closeAll()
  }
}
