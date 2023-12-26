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
  productsNew: IProduct[] = [];
  timeAutoPlay: number = 3000;

  constructor(private productService: ProductService,
  ) { }
  ngOnInit(): void {
    // this.notificationService.error('ok', 'ergr');
    this.productService
      .getProducts()
      .then((p) => {
        this.products = p.content.slice(0, 4)
        this.productsNew = p.content;
      }
      );
  }

}
