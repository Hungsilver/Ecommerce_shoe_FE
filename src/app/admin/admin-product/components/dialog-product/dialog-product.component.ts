import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { ProductService } from '../../service/product.service';
import { CategoryService } from '../../../category/service/category.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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

  // selectedBrandId: number | null = null;
  // selectedOriginId: number | null = null;
  // selectedCategoryId: number | null = null;
  validUrls: string[] = []; // Mảng để lưu đường dẫn hình ảnh
  uploadedUrl: string | null = null;
  productForm: FormGroup= new FormGroup({});

  ngOnInit(): void {

    this.productForm = this.fb.group({
      ten: ['', [Validators.required,Validators.minLength(10)]],
      moTa: ['',[Validators.required,Validators.minLength(10)]],
      danhMuc: [null, Validators.required],
      thuongHieu: [null, Validators.required],
      xuatXu: [null, Validators.required],
      trangThai: [1, Validators.required],
      // anhChinh:[null,Validators.required],
    });

    if (this.data.product && this.data.product.ten && this.data.product.moTa
       && this.data.product.danhMuc && this.data.product.thuongHieu &&
      this.data.product.xuatXu ) {
        this.uploadedUrl = this.data.product.anhChinh;
      this.productForm.patchValue({
        ten: this.data.product.ten,
        moTa :this.data.product.moTa,
        danhMuc: this.data.product.danhMuc.id,
        thuongHieu: this.data.product.thuongHieu.id,
        xuatXu: this.data.product.xuatXu.id,
        trangThai :this.data.product.trangThai,

      });
    }
    //   this.type =this.data.type;
    //   if (this.type === 'update') {
    //     // this.uploadedUrl =this.data.staff.anhDaiDien;
    //     this.uploadedUrl =this.data.product.anhChinh;
    //   this.productForm.patchValue(this.data.product);
    // }


  }
  constructor(
    @Inject(MAT_DIALOG_DATA) public data : any,
    private productService: ProductService,
    private dialog: MatDialog,
    // private categoryService: CategoryService,
    private fireStorage: AngularFireStorage,
    private fb: FormBuilder,
    private notification: ToastrService,
  ) {
    this.origin = data.origins;
    this.brand = data.brands;
    this.categories = data.categories;

    this.type = data.type;
    this.product = data.product;


  }

  async onFileChange(event: any) {
    const files = event.target.files;
    console.log('files-log', files);

    if (files && files.length > 0) {
      try{
        if(files.length <= 1){
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const path = `images/${file.name}`;
          const uploadTask = await this.fireStorage.upload(path, file);
          // const url = await uploadTask.ref.getDownloadURL();
          this.uploadedUrl = await uploadTask.ref.getDownloadURL();
          console.log(`Uploaded file ${i}: ${this.uploadedUrl}`);
        }
      }else{
        this.notification.error('Chỉ được thêm hoặc cập nhật 1 ảnh');
      }

      } catch(error){
        console.error('Error uploading files:', error);

      }



    }
  }

  addProduct(): void {


    // Gán giá trị vào this.product
    const formValue =this.productForm.value;
    this.product = {
      ten: formValue.ten,
      moTa: formValue.moTa,
      danhMuc: formValue.danhMuc,
      thuongHieu: formValue.thuongHieu,
      xuatXu: formValue.xuatXu,
      trangThai: formValue.trangThai,
    };

    this.product.anhChinh = this.uploadedUrl;
    console.log('Product Image URLs:', this.product.anhChinh);
    if (this.productForm.valid) {
      if (this.product.anhChinh && this.product.anhChinh.length > 0) {
        
        this.productService.createProduct(this.product).then((res) => {
          console.log('Data created', res.content);
          if (res) {
            this.notification.success('Thêm thành công');
            this.dialog.closeAll();
          }
        });
      } else {
        this.notification.error('Ảnh không được để trống');
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
   const formValue =this.productForm.value;

   this.product = {
    ten: formValue.ten,
    moTa: formValue.moTa,
    danhMuc: formValue.danhMuc,
    thuongHieu: formValue.thuongHieu,
    xuatXu: formValue.xuatXu,
    trangThai: formValue.trangThai,
    anhChinh:this.uploadedUrl,
  };

      // Sử dụng đường dẫn ảnh mới nếu có
      // if (this.uploadedUrl) {
      // this.product.anhChinh = this.uploadedUrl;
      //
      // }
      this.product.anhChinh = this.uploadedUrl || this.product.anhChinh;
      this.productService
        .updateProduct(this.product, this.data.product.id)
        .then((res) => {
          console.log('data updated', res.content);
          if (res) {
            this.notification.success('cap nhat thanh cong');
            this.dialog.closeAll();
          }
        });

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
