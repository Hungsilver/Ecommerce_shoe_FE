import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { ProductService } from '../../service/product.service';
import { CategoryService } from '../../../category/service/category.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-product',
  templateUrl: './dialog-product.component.html',
  styleUrls: ['./dialog-product.component.scss'],
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
  validUrls: string[] = []; // Mảng để lưu đường dẫn hình ảnh
  uploadedUrl: string | null = null;
  productForm: any;

  ngOnInit(): void {
    if (
      this.data.product &&
      this.data.product.thuongHieu &&
      this.data.product.xuatXu
    ) {
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
    private fireStorage: AngularFireStorage,
    private fb: FormBuilder
  ) {
    this.origin = data.origins;
    this.brand = data.brands;
    this.categories = data.categories;
    this.type = data.type;
    this.product = data.product;

    this.productForm = this.fb.group({
      ten: ['', Validators.required],
      moTa: ['', Validators.required],
      danhMuc: [null, Validators.required],
      thuongHieu: [null, Validators.required],
      xuatXu: [null, Validators.required],
      trangThai: [1, Validators.required],
    });
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

  addProduct(): void {
    // console.log('Valid URLs in addProduct:', this.validUrls);
    // Gán giá trị vào this.product.anhChinh
    const tenValue = this.productForm.get('ten').value;
    const moTaValue = this.productForm.get('moTa').value;
    const danhMucId = this.productForm.get('danhMuc').value;
    const thuongHieuId = this.productForm.get('thuongHieu').value;
    const xuatXuId = this.productForm.get('xuatXu').value;
    const trangThaiValue = this.productForm.get('trangThai').value;

    // Gán giá trị vào this.product
    this.product = {
      ten: tenValue,
      moTa: moTaValue,
      danhMuc: danhMucId,
      thuongHieu: thuongHieuId,
      xuatXu: xuatXuId,
      trangThai: trangThaiValue,
    };

    this.product.anhChinh = this.uploadedUrl;
    console.log('Product Image URLs:', this.product.anhChinh);
    if (this.productForm.valid) {
      if (this.product.anhChinh.length > 0) {
        this.productService.createProduct(this.product).then((res) => {
          console.log('Data created', res.content);
          if (res) {
            this.dialog.closeAll();
          }
        });
      } else {
        console.error('Image URLs are null or empty. Product not added.');
      }
    } else {
      console.log('Dữ liệu không hợp lệ.');
    }
  }

  deleteImage(imagePath: string) {
    // Xóa ảnh bằng đường dẫn imagePath
    this.fireStorage.storage
      .refFromURL(imagePath)
      .delete()
      .then(() => {
        console.log('Ảnh đã được xóa thành công');
      })
      .catch((error) => {
        console.error('Lỗi xóa ảnh:', error);
      });
  }

  updateProduct() {
    const selectedBrand = this.brand.find(
      (brand) => brand.id === this.selectedBrandId
    );
    const selectedOrigin = this.origin.find(
      (origin) => origin.id === this.selectedOriginId
    );
    const selectedCategory = this.categories.find(
      (category) => category.id === this.selectedCategoryId
    );

    if (selectedBrand && selectedOrigin && selectedCategory) {
      this.product.thuongHieu = selectedBrand.id;
      this.product.xuatXu = selectedOrigin.id;
      this.product.danhMuc = selectedCategory.id;

      // Sử dụng đường dẫn ảnh mới nếu có
      // if (this.uploadedUrl) {
      // this.product.anhChinh = this.uploadedUrl;
      this.product.anhChinh = this.uploadedUrl || this.product.anhChinh;
      // }

      this.productService
        .updateProduct(this.product, this.product.id)
        .then((res) => {
          console.log('data updated', res.content);
          if (res) {
            this.dialog.closeAll();
          }
        });
    }
  }

  // updateProduct() {
  //   const selectedBrand = this.brand.find(brand => brand.id === this.selectedBrandId);
  //   const selectedOrigin = this.origin.find(origin => origin.id === this.selectedOriginId);
  //   const selectedCategory = this.categories.find(category => category.id === this.selectedCategoryId);

  //   if (selectedBrand && selectedOrigin && selectedCategory) {
  //     this.product.thuongHieu = selectedBrand.id;
  //     this.product.xuatXu = selectedOrigin.id;
  //     this.product.danhMuc = selectedCategory.id;

  //     this.productService.updateProduct(this.product, this.product.id).then(res => {
  //       console.log('data updated', res.content);
  //       if (res) {
  //         this.dialog.closeAll();
  //       }
  //     });
  //   }
  // }

  deleteProduct() {
    this.productService.deleteColor(this.product.id);
    this.dialog.closeAll();
  }
}
