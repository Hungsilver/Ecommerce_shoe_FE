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
  origin: any[] = [];
  brand: any[] = [];
  type: any;

  selectedBrandId: number | null = null;
  selectedOriginId: number | null = null;
  selectedCategoryId: number | null = null;

  ngOnInit(): void {

    if (this.data.product && this.data.product.thuongHieu && this.data.product.xuatXu) {
      // Thiết lập giá trị mặc định cho các trường select
      this.selectedBrandId = this.data.product.thuongHieu.id;
      this.selectedOriginId = this.data.product.xuatXu.id;
      this.selectedCategoryId = this.data.product.danhMuc.id;

    }
  }
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductService,
    private dialog: MatDialog,
    private categoryService: CategoryService,
  ) {
    this.origin = data.origins;
    this.brand = data.brands;
    this.categories = data.categories;
    this.type = data.type;
    this.product = data.product;
  }

  addProduct() {

    this.productService.createProduct(this.product).then(res => {
      console.log('data created', res.content);
      if (res) {
        this.dialog.closeAll();
      }
    });

  }

  updateProduct() {
    const selectedBrand = this.brand.find(brand => brand.id === this.selectedBrandId);
    const selectedOrigin = this.origin.find(origin => origin.id === this.selectedOriginId);
    const selectedCategory = this.categories.find(category => category.id === this.selectedCategoryId);

    if (selectedBrand && selectedOrigin && selectedCategory) {
      this.product.thuongHieu = selectedBrand.id;
      this.product.xuatXu = selectedOrigin.id;
      this.product.danhMuc = selectedCategory.id;

      this.productService.updateProduct(this.product, this.product.id).then(res => {
        console.log('data updated', res.content);
        if (res) {
          this.dialog.closeAll();
        }
      });
    }
  }

  deleteProduct() {
    this.productService.deleteColor(this.product.id);
    this.dialog.closeAll()
  }
}

