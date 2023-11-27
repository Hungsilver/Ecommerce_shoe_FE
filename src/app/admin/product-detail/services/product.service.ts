import { Injectable } from '@angular/core';
import { BaseRequestService } from 'src/libs/service/request/base-request.service';
import { IProduct } from './product.module';
import { IReqApi } from 'src/libs/common/interface/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailService {
  url: string = 'product-detail';

  constructor(private baseRequestService: BaseRequestService) {}
  getProducts(params?: any): Promise<IReqApi<IProduct[]>> {
    return new Promise<IReqApi<IProduct[]>>((resolve, reject) => {
      this.baseRequestService.get(`${this.url}`, params).subscribe(
        (result) => {
          return resolve(result);
        },
        (err) => reject(err)
      );
    });
  }
  createProduct(body: any): Promise<IReqApi<IProduct>> {
    return new Promise<IReqApi<IProduct>>((resolve, reject) => {
      this.baseRequestService.post(`${this.url}`, body).subscribe(
        (result) => {
          return resolve(result);
        },
        (err) => reject(err)
      );
    });
  }
  updateProduct(body: any, id?: any): Promise<IReqApi<IProduct[]>> {
    return new Promise<IReqApi<IProduct[]>>((resolve, reject) => {
      this.baseRequestService.put(`${this.url}/${id}`, body).subscribe(
        (result) => {
          return resolve(result);
        },
        (err) => reject(err)
      );
    });
  }
  deleteProduct(id: any): Promise<IReqApi<IProduct[]>> {
    return new Promise<IReqApi<IProduct[]>>((resolve, reject) => {
      this.baseRequestService.delete(`${this.url}/${id}`).subscribe(
        (result) => {},
        (err) => reject(err)
      );
    });
  }
}
