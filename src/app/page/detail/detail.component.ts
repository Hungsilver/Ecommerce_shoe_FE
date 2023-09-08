import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/libs/service/project/product/product.module';
import { ProductService } from 'src/libs/service/project/product/product.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  product: IProduct = {};
  id!: Number;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }
  ngOnInit(): void {
    this.productService.getProductById(this.id).then((p) => (this.product = p));
  }
}
