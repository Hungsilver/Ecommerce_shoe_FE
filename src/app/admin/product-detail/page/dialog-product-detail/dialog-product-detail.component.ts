import { Component, Inject, OnInit } from '@angular/core';
import { ProductDetailService } from '../../services/product.service';
import { AngularFireStorage } from "@angular/fire/compat/storage"
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder,Validators,FormGroup,AbstractControl,ValidationErrors } from '@angular/forms';




@Component({

  selector: 'app-dialog-product-detail',
  templateUrl: './dialog-product-detail.component.html',
  styleUrls: ['./dialog-product-detail.component.scss'],


})
export class dialogProductDetailComponent implements OnInit {
  productDetail: any ={};
  product: any[] = [];
  size: any[] = [];
  color: any[] = [];
  shoeMaterial: any[] = [];
  shoeSoleMaterial: any[] = [];

   validUrls: string[] = []; // Mảng để lưu đường dẫn hình ảnh
  // validUrls: string[] = new Array(4);

  uploadedUrl: string | null = null;

  type :any;

  productDetailForm: FormGroup = new FormGroup({}) ;

  ngOnInit(): void {


    this.productDetailForm = this.fb.group({
      soLuong: ['', [Validators.required, Validators.pattern(/^[1-9]\d{0,2}$/)]],
      giaBan: ['', [Validators.required, Validators.pattern(/^[1-9]\d{0,9}(\.\d{1,3})?$/), Validators.min(1000)]],
      sanPham: [null, Validators.required],
      kichCo: [null, Validators.required],
      mauSac: [null, Validators.required],
      chatLieuGiay: [null, Validators.required],
      chatLieuDeGiay: [null, Validators.required],
      trangThai: [1, Validators.required],
      // anhSanPhams :[null,Validators.required],
    });

    if (this.data.productDetail && this.data.productDetail.soLuong && this.data.productDetail.giaBan && this.data.productDetail.sanPham && this.data.productDetail.mauSac &&
      this.data.productDetail.kichCo && this.data.productDetail.chatLieuGiay && this.data.productDetail.chatLieuDeGiay) {
          console.log("anh",this.data.productDetail.anhSanPhams );
        this.validUrls = this.data.productDetail.anhSanPhams.ten;
        console.log("validUrls:",this.validUrls);
        this.productDetailForm.patchValue({
        soLuong: this.data.productDetail.soLuong,
        giaBan :this.data.productDetail.giaBan,
        sanPham: this.data.productDetail.sanPham.id,
        kichCo: this.data.productDetail.kichCo.id,
        mauSac: this.data.productDetail.mauSac.id,
        chatLieuGiay: this.data.productDetail.chatLieuGiay.id,
        chatLieuDeGiay: this.data.productDetail.chatLieuDeGiay.id,
        trangThai:this.data.productDetail.trangThai,
      });

  }
}


  constructor(
    @Inject(MAT_DIALOG_DATA) public data :any,
    private productDetailService: ProductDetailService,
    private fireStorage: AngularFireStorage,
    private dialog :MatDialog,
    private fb : FormBuilder,

  ) {

    this.shoeMaterial = data.shoeMaterials;
    this.size = data.sizes;
    this.color = data.colors;
    this.shoeSoleMaterial = data.shoeSoleMaterials;
    this.product = data.products;

    this.type = data.type;
    this.productDetail = data.productDetail;
    // console.log("messge "+this.sanPham)




  }
  formatGiaBanInput() {
    const giaBanControl = this.productDetailForm.get('giaBan');
    if (giaBanControl?.value) {
      // Chuyển đổi giá trị nhập vào
      let formattedValue = giaBanControl.value.toString().replace(/[^\d]/g, '');

      // Kiểm tra nếu chuỗi không bắt đầu bằng số 0 và không rỗng
      if (!formattedValue.startsWith('0') && formattedValue.length > 0) {
        // Nếu giá trị không bắt đầu bằng số 0, thực hiện các bước định dạng
        if (formattedValue.length > 8) {
          formattedValue = formattedValue.substring(0, 8);
        }

        // Thay thế dấu phẩy bằng dấu chấm
        formattedValue = formattedValue.replace(/,/g, '.');

        giaBanControl.setValue(formattedValue);
      }
      //  else {
      //   // Nếu giá trị bắt đầu bằng số 0 hoặc là chuỗi rỗng, đặt giá trị của control về null
      //   giaBanControl.setValue(null);
      // }
    }
  }


  // load anh
  async onFileChange(event: any) {
    const files = event.target.files;
    console.log('files-log', files);

    if (files && files.length > 0) {
      try {

        if(files.length < 5){


        // this.validUrls = [];
        for (let i = 0; i < files.length ; i++) {
          const file = files[i];
          const path = `images/${file.name}`;
          const uploadTask = await this.fireStorage.upload(path, file);
          const url = await uploadTask.ref.getDownloadURL();
          if (!this.validUrls) {
            this.validUrls = []; // Khởi tạo mảng nếu chưa tồn tại
          }
          this.validUrls.push(url);
          console.log(`Uploaded file ${i}: ${url}`);
        }
      }else{
        alert('chi dc them 5 anh');
      }

      } catch (error) {
        console.error('Error uploading files:', error);
        // Xử lý lỗi tải lên nếu cần
      }
    }
  }

  addProduct(): void {
    // const trangThaiValue = this.productDetailForm.get('trangThai').value;
    const formValue = this.productDetailForm.value;
    // Gán giá trị vào this.product
    this.productDetail = {
      soLuong: formValue.soLuong,
      giaBan: formValue.giaBan,
      sanPham: formValue.sanPham,
      kichCo: formValue.kichCo,
      mauSac: formValue.mauSac,
      chatLieuGiay:formValue.chatLieuGiay,
      chatLieuDeGiay :formValue.chatLieuDeGiay,
      trangThai: formValue.trangThai,
      anhSanPhams: this.validUrls ? [...this.validUrls] : [],
    };



    this.productDetail.anhSanPhams = this.validUrls
  // console.log('Product Image URLs:', this.product.anhChinh);
    if (this.productDetailForm.valid) {
      if(this.productDetail.anhSanPhams.length >0){
        this.productDetailService.createProduct(this.productDetail).then(res => {
          console.log('Data created', res.content);
          if (res) {
            this.dialog.closeAll();
          }
        });
      }else{
        console.log("Ảnh sản phẩm null:");
      }
    } else {
        console.error('Image URLs are null or empty. Product not added.');
      }

  }
    updateProduct() {
      const formValue = this.productDetailForm.value;
      console.log("anh cap nhat:",this.validUrls);

      this.productDetail = {
        soLuong: formValue.soLuong,
        giaBan: formValue.giaBan,
        sanPham: formValue.sanPham,
        kichCo: formValue.kichCo,
        mauSac: formValue.mauSac,
        chatLieuGiay: formValue.chatLieuGiay,
        chatLieuDeGiay: formValue.chatLieuDeGiay,
        trangThai: formValue.trangThai,
        anhSanPhams: this.validUrls ? [...this.validUrls] : [],

      };

        // Sử dụng đường dẫn ảnh mới nếu có
        // if (this.uploadedUrl) {
        // this.product.anhChinh = this.uploadedUrl;


        this.validUrls = new Array(3);
        if(this.validUrls.length < 4 ){
        this.productDetail.anhSanPhams.ten = [];
        // // this.productDetail.anhSanPhams = [];

        this.productDetail.anhSanPhams.ten = this.validUrls;
        console.log("ảnh 1228",this.productDetail.anhSanPhams);

        this.productDetailService.updateProduct(this.productDetail, this.data.productDetail.id).then(res => {
          console.log('data updated', res.content);
          if (res) {
            this.dialog.closeAll();
          }
        });
      }else{
        alert('Chỉ được cập nhật thêm 4 ảnh !');
      }
    }
      deleteProduct() {
        console.log("xoa");
        this.productDetailService.deleteProduct(this.productDetail.id);
        this.dialog.closeAll()
      }

    }



  // }

