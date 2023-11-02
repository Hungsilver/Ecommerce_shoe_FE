import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges, } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ColorService } from 'src/app/admin/color/service/color.service';
import { IProduct } from 'src/app/page/product/service/product.module';
import { ProductService } from 'src/app/page/product/service/product.service';
import { OriginService } from 'src/libs/service/project/origin/origin.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  rangeValues!: number[];
  minPrice!: number;
  maxPrice!: number;
  products: IProduct[] = [];
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;
  query: any = {}
  listTotalPage: any = [];
  colors: any[] = []
  origins: any[] = []
  typeSort: any = [];

  constructor(
    private productService: ProductService,
    private colorService: ColorService,
    private originService: OriginService,) {
    this.query.page = 1;
    this.query.pageSize = 10;
    this.query.origin = []
    this.query.color = []
    this.minPrice = 1;
    this.maxPrice = 3000000;
  }

  ngOnInit(): void {
    this.rangeValues = [this.minPrice, this.maxPrice];
    this.items = [];
    this.home = { label: 'Home', routerLink: '/' };
    this.typeSort = [
      { name: 'Giá tăng dần', value: false },
      { name: 'Giá giảm dần', value: true },
    ]
    // this.query.minPrice = this.minPrice;
    // this.query.maxPrice = this.maxPrice;
    this.initData()
    this.getAll();
  }



  initData() {
    //call api getminmax price
    //
    // this.productService.getProducts(this.query).then(res => {
    //   if (res) {
    //     this.products = res.content;
    //   }
    // })
    this.colorService.getColors().then(res => {
      if (res) {
        this.colors = res.content;
      }
    })
    this.originService.getOrigins().then(res => {
      if (res) {
        this.origins = res.content;
      }
    })
  }


  getAll(action?: 'prev' | 'next'): void {
    this.query.minPrice = this.rangeValues[0];
    this.query.maxPrice = this.rangeValues[1];
    let params = { ...this.query }
    if (action) {
      if (action === 'prev' && Number(params.page) > 1) {
        params.page = params.page - 1
      }
      if (action === 'next' &&
        Number(params.page) + 1 <= this.listTotalPage.length) {
        params.page = params.page + 1
      }
    }

    Object.keys(params).forEach(key => {
      let value = params[key]
      if (value === null || value === undefined || value === '') {
        delete params[key];
      } else if (Array.isArray(value)) {
        if (value.length > 0) {
          params[key] = value.join(',');
        } else {
          delete params[key];
        }
      }
    });

    this.productService.filter(params).then(product => {
      if (product && product.content) {
        this.products = product.content;
        this.listTotalPage = this.getTotalPage(product.totalPages)
      }
    })
  }
  getTotalPage(totalPages: number) {
    let listTotalPage = []
    for (let i = 1; i <= totalPages; i++) {
      listTotalPage.push(i);
    }
    return listTotalPage;
  }
}
