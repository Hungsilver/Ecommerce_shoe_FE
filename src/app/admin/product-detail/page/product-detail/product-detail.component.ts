import { IProductDetailImportExcel } from 'src/app/admin/product-detail/services/ProductDetailImportExcel.module';
import { Component, OnInit } from '@angular/core';
import { ProductDetailService } from '../../services/product.service';
import { MatDialog } from '@angular/material/dialog';

import { dialogProductDetailComponent } from '../dialog-product-detail/dialog-product-detail.component';
import { ProductService } from 'src/app/admin/admin-product/service/product.service';
import { ColorService } from 'src/app/admin/color/service/color.service';
import { SizeService } from 'src/app/admin/size/service/size.service';
import { MaterialService } from 'src/app/admin/material/service/material.service';
import { MaterialSolesService } from 'src/app/admin/material-soles/service/material-soles.service';
import { IProductDetailExportExcel } from '../../services/ProductDetailExportExcel.module';
import * as XLSX from 'xlsx';
// import { IProductDetailImportExcel } from '../../services/ProductDetailImportExcel.module';


// import { ProductDetailImportExcel } from '../../services/ProductDetailImportExcel.module';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  productsDetails!: any;
  product: any = [];
  giaBan: any = [];
  color: any = [];
  size: any = [];
  shoeSoleMaterial: any = [];
  shoeMaterial: any = [];

  searchQuery: any = {};
  listTotalPage: any = [];

  selectedProduct: number | null = null;

  selectedSize: number | null = null;
  selectedColor: number | null = null;
  ChiTietSanPham!: IProductDetailExportExcel[];
  fileName = 'ExcelSheet.xlsx';
  ExcelData: any;

  // iconSortName = 'pi pi-sort-amount-down-alt';
  iconSortName = 'pi pi-sort-amount-up';
  constructor(
    private productDetailService: ProductDetailService,
    private productService: ProductService,
    private colorService: ColorService,
    private sizeService: SizeService,
    private shoesSoleMService: MaterialSolesService,
    private shoesMService: MaterialService,
    private dialog: MatDialog
  ) {
    this.searchQuery.page = 1;
    this.searchQuery.pageSize = 10;
  }

  ngOnInit(): void {
    this.getAll();
    this.getAllByexcel();
    this.productService.getProduct().then((data) => {
      this.product = data.content;
    });
    this.colorService.getColors().then((data) => {
      this.color = data.content;
    });
    this.sizeService.getSize().then((data) => {
      this.size = data.content;
    });
    this.shoesSoleMService.getMaterials().then((data) => {
      this.shoeSoleMaterial = data.content;
    });
    this.shoesMService.getMaterials().then((data) => {
      this.shoeMaterial = data.content;
    });
  }
  onPageChange() {
    this.getAll();
    this.getAllByexcel();
  }

  private getAllByexcel() {
    this.productDetailService.getAll().subscribe((data) => {
      this.ChiTietSanPham = data;
    });
  }
  exportexcel() {
    const wr: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.ChiTietSanPham);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, wr, 'Sheet1');
    XLSX.writeFile(wb, this.fileName);
  }
  readExcel(event: any) {
    // Khởi tạo danh sách (list) để lưu trữ các đối tượng ChiTietSanPham
    const danhSachCTSanPham: IProductDetailImportExcel[] = [];
    // lấy file được chọn bên view
    let file = event.target.files[0];
    const extension = file.name.split('.').pop().toLowerCase();
    if (extension === 'xlsx') {
      let fileReader = new FileReader();
      fileReader.readAsBinaryString(file);

      fileReader.onload = (e) => {
        var workBook = XLSX.read(fileReader.result, { type: 'binary' });
        var sheetNames = workBook.SheetNames;

        this.ExcelData = XLSX.utils.sheet_to_json(
          workBook.Sheets[sheetNames[0]]
        );

        for (let i = 0; i < this.ExcelData.length; i++) {
          const chitietsanpham: IProductDetailImportExcel = {
            stt: this.ExcelData[i].stt,
            // maSanPham:this.ExcelData[i].ma,
            // tenSanPham:this.ExcelData[i].ten,
            soLuong: this.ExcelData[i].soLuong,
            giaBan: this.ExcelData[i].giaBan,
            ngayTao: this.ExcelData[i].ngayTao,
            ngayCapNhat: this.ExcelData[i].ngayCapNhat,
            trangThai: this.ExcelData[i].trangThai,
            mauSac: this.ExcelData[i].mauSac,
            kichCo: this.ExcelData[i].kichCo,
            chatLieuGiay: this.ExcelData[i].chatLieuGiay,
            chatLieuDeGiay: this.ExcelData[i].chatLieuDeGiay,
            // xuatXu:this.ExcelData[i].xuatXu,
            // thuongHieu:this.ExcelData[i].thuongHieu
            sanPham: this.ExcelData[i].sanPham,
          };
          danhSachCTSanPham.push(chitietsanpham);
        }
        this.productDetailService.create(danhSachCTSanPham).subscribe(
          (data) => {
            if (Array.isArray(data)) {
              this.ChiTietSanPham = data;
            }
            if (this.ChiTietSanPham.length > 0) {
              const wr: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
                this.ChiTietSanPham
              );
              const wb: XLSX.WorkBook = XLSX.utils.book_new();
              XLSX.utils.book_append_sheet(wb, wr, 'Sheet1');

              XLSX.writeFile(wb, 'productdetailImportError.xlsx');
            }
          },
          (error) => console.log(error)
        );
      };
    } else {
      alert('chỉ được chọn file có đuôi .xlsx');
    }
  }

  sortByName() {
    if (this.iconSortName === 'pi pi-sort-amount-up') {
      this.searchQuery['sortField'] = 'ten';
      this.searchQuery['isSortDesc'] = false;
      this.getAll();
      this.iconSortName = 'pi pi-sort-amount-down-alt';
    } else if (this.iconSortName === 'pi pi-sort-amount-down-alt') {
      this.searchQuery['sortField'] = 'ten';
      this.searchQuery['isSortDesc'] = true;
      this.getAll();
      this.iconSortName = 'pi pi-sort-amount-up';
    }
  }

  // activeTab: string = 'active'; // Mặc định là tab Hoạt Động

  // changeTab(tab: string): void {
  //   this.activeTab = tab;
  // }

  getAll(action?: 'prev' | 'next' | 'active'): void {
    if (action) {
      if (action === 'prev' && Number(this.searchQuery.page) > 1) {
        this.searchQuery.page = this.searchQuery.page - 1;
      }
      if (
        action === 'next' &&
        Number(this.searchQuery.page) + 1 <= this.listTotalPage.length
      ) {
        this.searchQuery.page = this.searchQuery.page + 1;
      }
      // Thêm trạng thái hoạt động là 1
      // if (action === 'active') {
      //   this.searchQuery.page = 1;
      // }
      Object.keys(this.searchQuery).forEach((key) => {
        if (this.searchQuery[key] === null || this.searchQuery[key] === '') {
          delete this.searchQuery[key];
        }
      });
    }
    this.productDetailService.getProducts(this.searchQuery).then((product) => {
      if (product && product.content) {
        this.productsDetails = product.content;
        this.listTotalPage = this.getTotalPage(product.totalPages);
        console.log('ctsp', product);
      }
    });

    if (this.selectedProduct !== null) {
      this.searchQuery.product = this.selectedProduct;
    }
    if (this.selectedSize !== null) {
      this.searchQuery.size = this.selectedSize;
    }
    if (this.selectedColor !== null) {
      this.searchQuery.color = this.selectedColor;
    }
    console.log(this.searchQuery);
  }

  getTotalPage(totalPages: number) {
    let listTotalPage = [];

    for (let i = 1; i <= totalPages; i++) {
      listTotalPage.push(i);
    }
    return listTotalPage;
  }
  searchByName() {
    this.searchQuery['keyword'] = this.searchQuery.keyword;
    this.getAll();
  }

  filterByProduct(): void {
    if (this.selectedProduct !== null) {
      this.searchQuery.product = this.selectedProduct;
    } else {
      delete this.searchQuery.product;
    }
    this.getAll();
  }

  // updateProductDetail() {
  //   this.newProduct.anhSanPhams = this.validUrls
  //   this.productDetailService.updateProduct(this.newProduct).then(
  //     (data) => {
  //       console.log("data " + data);
  //     },
  //     (error) => console.log(error)
  //   );
  // }
  // filterBySize(): void{
  //   if(this.selectedSize !== null){
  //   }
  // }

  filterBySize(): void {
    if (this.selectedSize !== null) {
      this.searchQuery.size = this.selectedSize;
    } else {
      delete this.searchQuery.size;
    }
    this.getAll();
  }
  filterByColors(): void {
    if (this.selectedColor !== null) {
      this.searchQuery.color = this.selectedColor;
    } else {
      delete this.searchQuery.color;
    }
    this.getAll();
  }

  openDialog() {
    const dialogRef = this.dialog.open(dialogProductDetailComponent, {
      width: '1100px',
      height: '600px',
      data: {
        type: 'add',
        productDetail: {},
        products: this.product,
        sizes: this.size,
        colors: this.color,
        shoeMaterials: this.shoeMaterial,
        shoeSoleMaterials: this.shoeSoleMaterial,
      },
    });
    dialogRef.afterClosed().subscribe((data) => {
      this.getAll();
    });
  }
  openDialogEdit(productDetail: any) {
    const dialogRef = this.dialog.open(dialogProductDetailComponent, {
      width: '1300px',
      height: '600px',
      data: {
        type: 'update',
        productDetail: productDetail,
        products: this.product,
        sizes: this.size,
        colors: this.color,
        shoeMaterials: this.shoeMaterial,
        shoeSoleMaterials: this.shoeSoleMaterial,
        // giaBan:this.giaBan,

        selectedProductId: productDetail.sanPham
          ? productDetail.sanPham.id
          : null,
        selectedSizeId: productDetail.kichCo ? productDetail.kichCo.id : null,
        selectedColorId: productDetail.mauSac ? productDetail.mauSac.id : null,
        selectedShoeMaterialId: productDetail.chatLieuGiay
          ? productDetail.chatLieuGiay.id
          : null,
        selectedShoeSoleMaterialId: productDetail.chatLieuDeGiay
          ? productDetail.chatLieuDeGiay.id
          : null,
      },
    });
    dialogRef.afterClosed().subscribe((data) => {
      this.getAll();
    });
  }
  openDialogDelete(productDetail: any) {
    const dialogRef = this.dialog.open(dialogProductDetailComponent, {
      width: '400px',
      height: '500px',
      data: {
        type: 'delete',
        productDetail: productDetail,
      },
    });
    dialogRef.afterClosed().subscribe((data) => {
      this.getAll();
    });
  }
}
