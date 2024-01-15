import { Component, OnInit } from '@angular/core';
import { SlicePipe } from '@angular/common';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { ProductService } from '../../service/product.service';
import { DialogProductComponent } from '../../components/dialog-product/dialog-product.component';
import { CategoryService } from '../../../category/service/category.service';
import { BrandService } from 'src/app/admin/brand/service/brand.service';
import { OriginService } from 'src/libs/service/project/origin/origin.service';
import * as XLSX from 'xlsx';
import { IProductExportExcel } from '../../service/productExportExcel.module';
import { IProductImportExcel } from '../../service/productIportExcel.module';
import { IProductDetailImportExcel } from 'src/app/admin/product-detail/services/ProductDetailImportExcel.module';
@Component({
  selector: 'app-home-product',
  templateUrl: './home-product.component.html',
  styleUrls: ['./home-product.component.scss'],
})
export class HomeProductComponent implements OnInit {
  products!: any;
  category: any = [];
  origin: any = [];
  brand: any = [];
  searchQuery: any = {};
  listTotalPage: any = [];
  sanPham!: IProductExportExcel[];
  // tên mặc định file excel khi xuất
  fileName = 'ExcelSheet.xlsx';
  ExcelData: any;
  selectedStatus: number | null = null;
  selectedBrand: number | null = null;

  chiTietSanPhams!: IProductImportExcel[];
 

  iconSortName = 'pi pi-sort-amount-up';
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private originService: OriginService,
    private brandService: BrandService,
    private dialog: MatDialog
  ) {
    this.searchQuery.page = 1;
    this.searchQuery.pageSize = 5;
  }

  ngOnInit(): void {
    this.getAll();
    this.getAllByExcel();
    // this.selectedStatus = null;
    this.categoryService.getCategory().then((data) => {
      this.category = data.content;
    });
    this.originService.getOrigins().then((data) => {
      this.origin = data.content;
    });
    this.brandService.getBrand().then((data) => {
      this.brand = data.content;
    });
  }
  onPageChange() {
    this.getAll();
    this.getAllByExcel();
  }

  filterByStatus(): void {
    this.searchQuery.status = this.selectedStatus;
    this.getAll();
  }
  filterByBrand(): void {
    if (this.selectedBrand !== null) {
      this.searchQuery.brand = this.selectedBrand;
      console.log('id brand' + this.brand.id);
    } else {
      delete this.searchQuery.brand;
    }
    this.getAll();
  }

  private getAllByExcel() {
    this.productService.getAll().subscribe((data) => {
      console.log(data);
      this.sanPham = data;
    });
  }

  // ReadExcel(event: any) {
  //   // Khởi tạo danh sách (list) để lưu trữ các đối tượng ChiTietSanPham
  //   const danhSachSanPham: IProductImportExcel[] = [];
  //   // lấy file được chọn bên view
  //   let file = event.target.files[0];
  //   // Lấy đuôi của file
  //   const extension = file.name.split('.').pop().toLowerCase();
  //   // Kiểm tra đuôi có phải là .xlsx không
  //   if (extension === 'xlsx') {
  //     // đọc dữ liệu file
  //     let fileReader = new FileReader();
  //     fileReader.readAsBinaryString(file);

  //     fileReader.onload = (e) => {
  //       //  chuyển đổi fileReader thành một đối tượng Workbook
  //       var workBook = XLSX.read(fileReader.result, { type: 'binary' });
  //       // đọc tiêu đề của Workbook
  //       var sheetNames = workBook.SheetNames;

  //       // chuyển đổi sang json
  //       this.ExcelData = XLSX.utils.sheet_to_json(
  //         workBook.Sheets[sheetNames[0]]
  //       );

  //       // sử dụng for để chuyển đổi sang đối tượng chitietsanpham
  //       for (let i = 0; i < this.ExcelData.length; i++) {
  //         const sanpham: IProductImportExcel = {
  //           stt: this.ExcelData[i].stt,
  //           tenSanPham: this.ExcelData[i].ten,
  //           anhChinh: this.ExcelData[i].anhChinh,
  //           moTa: this.ExcelData[i].moTa,
  //           trangThai: this.ExcelData[i].trangThai,
  //           thuongHieu: this.ExcelData[i].thuongHieu,
  //           xuatXu: this.ExcelData[i].xuatXu,
  //           danhMuc: this.ExcelData[i].danhMuc,
  //         };
  //         // Thêm đối tượng vào danh sách
  //         danhSachSanPham.push(sanpham);
  //       }
  //       // call api
  //       this.productService.create(danhSachSanPham).subscribe(
  //         (data) => {
  //           // kiểm tra nếu có data có phải là array
  //           if (Array.isArray(data)) {
  //             // gán data = this.chiTietSanPhams
  //             this.sanPham = data;
  //           }

  //           // kiểm tra this.chiTietSanPhams nếu > 0 thì xuất file excel sản phẩm lỗi
  //           if (this.sanPham.length > 0) {
  //             // get data
  //             const wr: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.sanPham);

  //             //generate workbook and add the worksheet
  //             const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //             XLSX.utils.book_append_sheet(wb, wr, 'Sheet1');

  //             // save to file
  //             XLSX.writeFile(wb, 'productImportError.xlsx');
  //           }
  //         },
  //         (error) => console.log(error)
  //       );
  //     };
  //   } else {
  //     // Nếu đuôi không phải .xlsx, thông báo
  //     alert('Chỉ được chọn file có đuôi .xlsx');
  //   }
  // }

  // xuất dữ liệu ra file excel
  exportexcel() {
    // get data
    const wr: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.sanPham);

    //generate workbook and add the worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, wr, 'Sheet1');

    // save to file
    XLSX.writeFile(wb, this.fileName);
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

  getAll(action?: 'prev' | 'next'): void {
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
    }

    Object.keys(this.searchQuery).forEach((key) => {
      if (this.searchQuery[key] === null || this.searchQuery[key] === '') {
        delete this.searchQuery[key];
      }
    });

    this.productService.getProduct(this.searchQuery).then((product) => {
      if (product && product.content) {
        this.products = product.content;
        this.listTotalPage = this.getTotalPage(product.totalPages);
        console.log(product);
      }
    });

    // Thêm trạng thái đã chọn vào searchQuery
    if (this.selectedStatus !== null) {
      this.searchQuery.status = this.selectedStatus;
    }
    if (this.selectedBrand !== null) {
      this.searchQuery.brand = this.selectedBrand;
    }

    console.log(this.searchQuery);
    console.log('tét ' + this.selectedBrand);
  }

  // getAll(action?: 'prev' | 'next'): void {
  //   if (action) {
  //     if (action === 'prev' && Number(this.searchQuery.page) > 1) {
  //       this.searchQuery.page = this.searchQuery.page - 1
  //     }
  //     if (action === 'next' &&
  //       Number(this.searchQuery.page) + 1 <= this.listTotalPage.length) {
  //       this.searchQuery.page = this.searchQuery.page + 1
  //     }

  //     Object.keys(this.searchQuery).forEach(key => {
  //       if (this.searchQuery[key] === null || this.searchQuery[key] === '') {
  //         delete this.searchQuery[key];
  //       }
  //     });
  //   }
  //   this.productService.getProduct(this.searchQuery).then(product => {
  //     if (product && product.content) {
  //       this.products = product.content;
  //       this.listTotalPage = this.getTotalPage(product.totalPages)
  //       console.log(product)
  //     }

  //   })
  //   console.log(this.searchQuery)
  // }

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

  ReadExcel(event: any) {
    // Khởi tạo danh sách (list) để lưu trữ các đối tượng ChiTietSanPham

    const danhSachChiTietSanPham: IProductImportExcel[] = [];


    // lấy file được chọn bên view
    let file = event.target.files[0];

    // Lấy đuôi của file
    const extension = file.name.split('.').pop().toLowerCase();

    // Kiểm tra đuôi có phải là .xlsx không
    if (extension === 'xlsx') {
      // đọc dữ liệu file
      let fileReader = new FileReader();
      fileReader.readAsBinaryString(file);

      fileReader.onload = (e) => {
        //  chuyển đổi fileReader thành một đối tượng Workbook
        var workBook = XLSX.read(fileReader.result, { type: 'binary' });
        // đọc tiêu đề của Workbook
        var sheetNames = workBook.SheetNames;

        // chuyển đổi sang json
        this.ExcelData = XLSX.utils.sheet_to_json(
          workBook.Sheets[sheetNames[0]]
        );

        // sử dụng for để chuyển đổi sang đối tượng chitietsanpham
        for (let i = 0; i < this.ExcelData.length; i++) {
          const chitietsanpham: IProductDetailImportExcel = {
            stt: this.ExcelData[i].stt,
            // tenSanPham: this.ExcelData[i].tenSanPham,
            soLuong: this.ExcelData[i].soLuong,
            giaBan: this.ExcelData[i].giaBan,
            mauSac: this.ExcelData[i].mauSac,
            kichCo: this.ExcelData[i].kichCo,
            chatLieuGiay: this.ExcelData[i].chatLieuGiay,
            chatLieuDeGiay: this.ExcelData[i].chatLieuDeGiay,
          };
          // Thêm đối tượng vào danh sách
          danhSachChiTietSanPham.push(chitietsanpham);
        }

        // call api
        this.productService.create(danhSachChiTietSanPham).subscribe(
          (data) => {
            // kiểm tra nếu có data có phải là array
            if (Array.isArray(data)) {
              // gán data = this.chiTietSanPhams
              this.chiTietSanPhams = data;
            }

            // kiểm tra this.chiTietSanPhams nếu > 0 thì xuất file excel sản phẩm lỗi
            if (this.chiTietSanPhams.length > 0) {
              // get data
              const wr: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
                this.chiTietSanPhams
              );

              //generate workbook and add the worksheet
              const wb: XLSX.WorkBook = XLSX.utils.book_new();
              XLSX.utils.book_append_sheet(wb, wr, 'Sheet1');

              // save to file
              XLSX.writeFile(wb, 'productImportError.xlsx');
            }
          },
          (error) => console.log(error)
        );
      };
    } else {
      // Nếu đuôi không phải .xlsx, thông báo
      alert('Chỉ được chọn file có đuôi .xlsx');
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogProductComponent, {
      width: '1200px',
      height: '600px',
      data: {
        type: 'add',
        product: {},
        categories: this.category,
        brands: this.brand,
        origins: this.origin,
      },
    });
    dialogRef.afterClosed().subscribe((data) => {
      this.getAll();
    });
  }
  openDialogEdit(product: any) {
    const dialogRef = this.dialog.open(DialogProductComponent, {
      width: '1300px',
      height: '600px',
      data: {
        type: 'update',
        product: product,
        categories: this.category,
        brands: this.brand,
        origins: this.origin,

        selectedCategoryId: product.danhMuc ? product.danhMuc.id : null,
        selectedBrandId: product.thuongHieu ? product.thuongHieu.id : null,
        selectedOriginId: product.xuatXu ? product.xuatXu.id : null,
      },
    });
    dialogRef.afterClosed().subscribe((data) => {
      this.getAll();
    });
  }
  openDialogDelete(product: any) {
    const dialogRef = this.dialog.open(DialogProductComponent, {
      width: '400px',
      height: '500px',
      data: {
        type: 'delete',
        product: product,
      },
    });
    dialogRef.afterClosed().subscribe((data) => {
      this.getAll();
    });
  }
}
