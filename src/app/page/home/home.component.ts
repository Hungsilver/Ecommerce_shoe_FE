import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/page/product/service/product.module';
import { ProductService } from 'src/app/page/product/service/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products: IProduct[] = [];
  constructor(private productService: ProductService) { }
  ngOnInit(): void {
    // this.productService
    //   .getProducts()
    //   .then((p) => (this.products = p.slice(0, 4)));
    this.products = this.productService.getProducts().slice(0, 4);
  }
}
