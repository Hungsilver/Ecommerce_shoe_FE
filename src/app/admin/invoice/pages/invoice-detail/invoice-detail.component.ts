import { InvoiceService } from './../../service/hoadon.service';
import { IHoaDon } from './../../../sales/service/hoadon/hoadon.module';
import { IHoaDonChiTiet } from './../../../sales/service/hoadonchitiet/hoadonchitiet.module';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { IHoaDons } from '../../service/hoadon.module';
import { ProductDetailService } from 'src/app/admin/product-detail/services/product.service';
import { ProductService } from 'src/app/admin/admin-product/service/product.service';
import { ColorService } from 'src/app/admin/color/service/color.service';
import { SizeService } from 'src/app/admin/size/service/size.service';
import { HDChiTiet } from 'src/app/admin/sales/service/hoadonchitiet/hoadonchitiet.service';
import { IChiTietSanPham } from 'src/app/admin/sales/service/ctsp/ctsp.module';
@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.scss'],
})
export class InvoiceDetailComponent implements OnInit {
  detailData: any;
  activeStep: number = 1;
  invoiceDetail: IHoaDonChiTiet[] = [];
  idInvoice!: number;
  productsDetail!: any;
  searchQuery: any = {};
  listTotalPage: any = [];

  product: any = [];
  color: any = [];
  size: any = [];
  selectedProduct: number | null = null;
  selectedSize: number | null = null;
  selectedColor: number | null = null;
  quantityInvoice!: number;
  constructor(
    private route: ActivatedRoute,
    private invoiceService: InvoiceService,
    private productDetailService: ProductDetailService,
    private productService: ProductService,
    private colorService: ColorService,
    private sizeService: SizeService,
    private hoaDonChiTiet: HDChiTiet
  ) {
    this.searchQuery.page = 1;
    this.searchQuery.pageSize = 8;
  }

  ngOnInit(): void {
    this.test();
    this.getAll();
    this.productService.getProduct().then((data) => {
      this.product = data.content;
    });
    this.colorService.getColors().then((data) => {
      this.color = data.content;
    });
    this.sizeService.getSize().then((data) => {
      this.size = data.content;
    });
  }

  onPageChange() {
    this.getAll();
  }

  test() {
    this.route.params.subscribe((params) => {
      const objectId = params['id'];
      this.detailData = history.state.detailData;

      console.log('Object ID:', objectId);
      console.log('Detail Data:', this.detailData);
      if (this.detailData) {
        console.log('Detail Data exists:', this.detailData);
      } else {
        console.error('Detail Data is undefined or null.');
      }
    });
    this.findByIdInvoice();
  }

  findByIdInvoice() {
    this.idInvoice = this.detailData.id;
    console.log('id hoa don: ' + this.detailData.id);
    console.log('test id ' + this.idInvoice);
    if (this.idInvoice !== null) {
      this.invoiceService.findByIdInvoice(this.idInvoice).then(
        (InvoiceId) => {
          console.log('ID của sản phẩm là:', InvoiceId.id);
          this.invoiceDetail = InvoiceId;
        },
        (error) => {
          console.error('Lỗi khi tìm kiếm sản phẩm:', error);
        }
      );
    }
  }
  setActiveStep(step: number): void {
    this.activeStep = step;
  }

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
    this.productDetailService
      .getProductDetail(this.searchQuery)
      .then((product) => {
        if (product && product.content) {
          this.productsDetail = product.content;
          this.listTotalPage = this.getTotalPage(product.totalPages);
          console.log(product);
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
    console.log('test ' + this.selectedSize);
  }

  getTotalPage(totalPages: number) {
    let listTotalPage = [];

    for (let i = 1; i <= totalPages; i++) {
      listTotalPage.push(i);
    }
    return listTotalPage;
  }

  filterByProduct(): void {
    if (this.selectedProduct !== null) {
      this.searchQuery.product = this.selectedProduct;
    } else {
      delete this.searchQuery.product;
    }
    this.getAll();
  }
  filterBySize(): void {
    if (this.selectedSize !== null) {
      this.searchQuery.size = this.selectedSize;
      this.getAll();
    }
    delete this.searchQuery.size;

    console.log('fsalfjlas ' + this.selectedSize);
    this.getAll();
  }
  filterByColors(): void {
    if (this.selectedColor !== null) {
      this.searchQuery.color = this.selectedColor;
      this.getAll();
    }
    delete this.searchQuery.color;
    this.getAll();
  }

  addProductToOrderDetail(chiTietSanPham: IChiTietSanPham): void {
    const existingItemIndexs = this.invoiceDetail.findIndex(
      (item) => item.chiTietSanPham?.id === chiTietSanPham.id
    );
    // if (chiTietSanPham.soLuong === 0) {
    //   this.notification.error('Số lượng sản phẩm không hợp lệ!');
    //   return;
    // }
    this.quantityInvoice = 1;
    const productBody = {
      idHoaDon: this.idInvoice,
      donGia: chiTietSanPham.giaBan,
      soLuong: this.quantityInvoice,
      idChiTietSanPham: chiTietSanPham.id,
    };
    this.hoaDonChiTiet
      .addProductToInvoice(productBody)
      .then((result) => {
        if (this.invoiceDetail[existingItemIndexs]) {
          // this.invoiceDetail[existingItemIndexs].soLuong +=
          this.quantityInvoice;
        } else {
          // this.invoiceDetail.push(result);
        }
        console.log('Product added to order:', result);
        this.getAll();
        // this.getAllInvoces();
        // this.loadHoaDonChiTiet();
        // this.calculateGrandTotal();
      })
      .catch((error) => {
        console.error('Error adding product to order:', error);
      });
  }
}
