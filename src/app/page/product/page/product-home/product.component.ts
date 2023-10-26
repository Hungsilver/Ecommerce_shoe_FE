import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { IProduct } from 'src/app/page/product/service/product.module';
import { ProductService } from 'src/app/page/product/service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  minPrice!: number;
  maxPrice!: number;
  rangeValues!: number[];
  products: IProduct[] = []
  colors!: string[];
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;
  constructor(private productService: ProductService, private http: HttpClient) { }

  ngOnInit(): void {
    this.products = this.productService.getProducts();
    this.minPrice = 0;
    this.maxPrice = 10000000;
    this.rangeValues = [this.minPrice, this.maxPrice];
    this.items = [];
    this.home = { label: 'Home', routerLink: '/' };
  }
  getData() {
    console.log(this.rangeValues[0] + '---' + this, this.rangeValues[1]);
  }
  sortBy(event: any) {
    console.log(event.target.value);
  }

}
