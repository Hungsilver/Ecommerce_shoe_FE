import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from './product.module';
import { ProductRequestService } from '../../request/product-request.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url: string = 'products-detail';

  constructor(
    private http: HttpClient,
    private productService: ProductRequestService
  ) {}
  getProducts(): Promise<IProduct[]> {
    return new Promise<IProduct[]>((resolve, reject) => {
      this.productService.get(`${this.url}`).subscribe(
        (result) => {
          return resolve(result);
        },
        (err) => reject(err)
      );
    });
  }

  getProductById(id: Number): Promise<IProduct> {
    return new Promise<IProduct>((resolve, reject) => {
      this.productService.get(`${this.url}/${id}`).subscribe(
        (result) => {
          return resolve(result);
        },
        (err) => reject(err)
      );
      // console.log(`${this.url}\`)
    });
  }
}
