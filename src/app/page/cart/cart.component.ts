import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  products!: any[];
  subTotal: number = 21000;
  constructor(
    private router: Router
  ) {

  }
  ngOnInit(): void {
    this.products = [{
      id: '1000',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 435365,
      size: 'L',
      color: 'red',
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5,
      total: 120000
    }]
  }
  checkout() {
    this.router.navigate(['/checkout'])
  }
}
