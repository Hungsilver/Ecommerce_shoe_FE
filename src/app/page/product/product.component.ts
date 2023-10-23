import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { IProduct } from 'src/libs/service/project/product/product.module';
import { ProductService } from 'src/libs/service/project/product/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  minPrice!: number;
  maxPrice!: number;
  rangeValues!: number[];
  products!: IProduct[];
  colors!: string[];

  constructor(private productService: ProductService) { }
  items: MenuItem[] | undefined;

  home: MenuItem | undefined;

  ngOnInit(): void {
    // this.productService.getProducts().then((p) => {
    //   this.products = p;
    // });
    this.minPrice = 0;
    this.maxPrice = 10000000;
    this.rangeValues = [this.minPrice, this.maxPrice];
    this.items = [{ label: 'Computer' }, { label: 'Notebook' }];

    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }
  getData() {
    console.log(this.rangeValues[0] + '---' + this, this.rangeValues[1]);
  }
  sortBy(event: any) {
    console.log(event.target.value);
  }
}
