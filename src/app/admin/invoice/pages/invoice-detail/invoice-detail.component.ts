import { InvoiceService } from './../../service/hoadon.service';
import { IHoaDon } from './../../../sales/service/hoadon/hoadon.module';
import { IHoaDonChiTiet } from './../../../sales/service/hoadonchitiet/hoadonchitiet.module';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { IHoaDons } from '../../service/hoadon.module';
import { ProductDetailService } from 'src/app/admin/product-detail/services/product.service';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.scss']
})
export class InvoiceDetailComponent implements OnInit{

  detailData: any;
  activeStep: number = 1;
  invoiceDetail: IHoaDonChiTiet[] = []; 
  idInvoice !:number;
  productsDetail!: any;
  searchQuery: any = {};
  listTotalPage: any = [];

  constructor(private route: ActivatedRoute,
    private invoiceService: InvoiceService,
    private productDetailService: ProductDetailService
    ) {
      this.searchQuery.page = 1;
      this.searchQuery.pageSize = 8;
  }

  ngOnInit(): void {
    this.test()
    this.getAll()
  }

  test(){
    this.route.params.subscribe(params => {
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

  findByIdInvoice(){
    this.idInvoice=this.detailData.id;
    console.log("id hoa don: "+this.detailData.id)
    console.log("test id "+this.idInvoice)
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
      if (action === 'active') {
        this.searchQuery.page = 1;
      }
      Object.keys(this.searchQuery).forEach((key) => {
        if (this.searchQuery[key] === null || this.searchQuery[key] === '') {
          delete this.searchQuery[key];
        }
      });
    }
    this.productDetailService.getProducts(this.searchQuery).then((product) =>{
      if (product && product.content) {
        this.productsDetail = product.content;
        this.listTotalPage = this.getTotalPage(product.totalPages);
        console.log(product);
      }
    });
    console.log(this.searchQuery);
  }
  
  getTotalPage(totalPages: number) {
    let listTotalPage = [];

    for (let i = 1; i <= totalPages; i++) {
      listTotalPage.push(i);
    }
    return listTotalPage;
  }


  
}
