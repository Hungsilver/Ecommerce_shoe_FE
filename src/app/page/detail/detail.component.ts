import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  quantity: number = 1;
  selectedSize: string | undefined;
  selectedColor: string | undefined;
  errorSelected: string | undefined;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }
  ngOnInit(): void {
    this.productService.getProductById(this.id).then((p) => (this.product = p));
  }

  addToCart() {
    if (!this.selectedColor || !this.selectedSize) {
      this.errorSelected = 'Vui lòng chọn option';
    } else {
      this.errorSelected = undefined;
      this.router.navigateByUrl('/');
    }
  }
  getSizeSelected(value: string) {
    this.selectedSize = value;
  }
  getColorSelected(value: string) {
    this.selectedColor = value;
  }
}
