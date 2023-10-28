import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/page/product/service/product.module';
import { ProductService } from 'src/app/page/product/service/product.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  productDetail!: IProduct;
  id!: Number;
  quantity: number = 1;
  selectedSize: string | undefined;
  errorSelected: string | undefined;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }
  ngOnInit(): void {
    this.productService.getProductById(this.id).then((p) => (this.productDetail = p.content));
  }

  addToCart() {
    if (!this.selectedSize) {
      this.errorSelected = 'Vui lòng chọn option';
    } else {
      this.errorSelected = undefined;
      this.router.navigateByUrl('/');
    }
  }
  getSizeSelected(value: string) {
    this.selectedSize = value;
  }
  // getColorSelected(value: string) {
  //   this.selectedColor = value;
  // }
}
