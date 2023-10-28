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

  constructor(
    private productService: ProductService,
    private colorService: ColorService,
    private originService: OriginService,) {
    this.query.origin = []
    this.query.color = []
  }

  ngOnInit(): void {
    this.query.page = 1;
    this.query.pageSize = 10;
    this.initData()
    this.minPrice = 1;
    this.maxPrice = 3000000;
    // this.rangeValues = [this.query.minPrice, this.query.maxPrice];
    this.rangeValues = [this.minPrice, this.maxPrice];
    this.items = [];
    this.home = { label: 'Home', routerLink: '/' };
  }

  getData() {

  }
  sortBy(event: any) {
    console.log(event.target.value);
  }

  initData() {
    //call api getminmax price
    //
    this.productService.getProducts(this.query).then(res => {
      if (res) {
        this.products = res.content;
      }
    })
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
  filter() {
    this.query.minPrice = this.rangeValues[0];
    this.query.maxPrice = this.rangeValues[1];
    let objParams = { ...this.query };
    Object.keys(objParams).forEach(key => {
      let value = objParams[key];
      if (!value || value?.length === 0 || value === '') {
        delete objParams[key];
      } else if (Array.isArray(value) && value.length > 0) {
        objParams[key] = objParams[key].join(',');
      }
    })
    this.productService.filter(objParams).then(res => {
      if (res) {
        this.products = res.content;
      }
    })
  }
  onPageChange() { }
  getAll(action?: 'prev' | 'next'): void {
    if (action) {
      if (action === 'prev' && Number(this.query.page) > 1) {
        this.query.page = this.query.page - 1
      }
      if (action === 'next' &&
        Number(this.query.page) + 1 <= this.listTotalPage.length) {
        this.query.page = this.query.page + 1
      }
      Object.keys(this.query).forEach(key => {
        if (this.query[key] === null || this.query[key] === '') {
          delete this.query[key];
        }
      });
    }
    this.originService.getOrigins(this.query).then(origin => {
      if (origin && origin.content) {
        this.origins = origin.content;
        this.listTotalPage = this.getTotalPage(origin.totalPages)
        console.log(origin)
      }

    })
    console.log(this.query)
  }
  getTotalPage(totalPages: number) {
    let listTotalPage = []

    for (let i = 1; i <= totalPages; i++) {
      listTotalPage.push(i);
    }
    return listTotalPage;
  }
}
