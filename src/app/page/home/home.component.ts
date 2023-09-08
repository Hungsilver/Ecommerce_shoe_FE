import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/libs/service/project/product/product.module';
import { ProductService } from 'src/libs/service/project/product/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products: IProduct[] = [];
  constructor(private productService: ProductService) {}
  ngOnInit(): void {
    this.productService
      .getProducts()
      .then((p) => (this.products = p.slice(0, 4)));
  }
}
