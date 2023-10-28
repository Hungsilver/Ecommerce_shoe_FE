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
  objectParams: any = {}
  colors: any[] = []
  origins: any[] = []

  constructor(
    private productService: ProductService,
    private colorService: ColorService,
    private originService: OriginService,) {
    this.objectParams.origin = []
    this.objectParams.color = []
  }

  ngOnInit(): void {
    this.objectParams.page = 1;
    this.objectParams.pageSize = 10;
    this.initData()
    this.minPrice = 1;
    this.maxPrice = 3000000;
    // this.rangeValues = [this.objectParams.minPrice, this.objectParams.maxPrice];
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
    this.productService.getProducts(this.objectParams).then(res => {
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
    this.objectParams.minPrice = this.rangeValues[0];
    this.objectParams.maxPrice = this.rangeValues[1];
    let objParams = { ...this.objectParams };
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

}
