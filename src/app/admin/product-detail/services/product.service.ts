import { Injectable } from '@angular/core';
import { BaseRequestService } from 'src/libs/service/request/base-request.service';
import { IProductDetail } from './product.module';
import { IReqApi } from 'src/libs/common/interface/interfaces';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailService {
  url: string = 'product-detail';

  constructor(private baseRequestService: BaseRequestService) {}
  getProducts(
    params?: any,
    activeStatus: number = 0
  ): Promise<IReqApi<IProductDetail[]>> {
    // Thêm trạng thái hoạt động vào params nếu activeStatus là 1
    if (activeStatus === 1) {
      params = { ...params, active: 1 };
    }

    return new Promise<IReqApi<IProductDetail[]>>((resolve, reject) => {
      this.baseRequestService.get(`${this.url}/filter`, params).subscribe(
        (result) => {
          return resolve(result);
        },
        (err) => reject(err)
      );
    });
  }

  getProductDetail(params?: any): Promise<IReqApi<IProductDetail[]>> {
    return new Promise<IReqApi<IProductDetail[]>>((resolve, reject) => {
      this.baseRequestService.get(`${this.url}/filter`, params).subscribe(
        (result) => {
          return resolve(result);
        },
        (err) => reject(err)
      );
    });
  }

  getTop1Price(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.baseRequestService.get(`${this.url}/pricemax`).subscribe(
        (result: any) => {
          return resolve(result);
        },
        (err) => reject(err)
      );
    });
  }

  getProductByParam(
    params?: any,
    activeStatus: number = 0
  ): Promise<IReqApi<IProductDetail[]>> {
    // Thêm trạng thái hoạt động vào params nếu activeStatus là 1
    if (activeStatus === 1) {
      params = { ...params, active: 1 };
    }

    return new Promise<IReqApi<IProductDetail[]>>((resolve, reject) => {
      this.baseRequestService.get(`${this.url}/filter`, params).subscribe(
        (result) => {
          return resolve(result);
        },
        (err) => reject(err)
      );
    });
  }

  createProduct(body: any): Promise<IReqApi<IProductDetail>> {
    return new Promise<IReqApi<IProductDetail>>((resolve, reject) => {
      this.baseRequestService.post(`${this.url}`, body).subscribe(
        (result) => {
          return resolve(result);
        },
        (err) => reject(err)
      );
    });
  }
  updateProduct(body: any, id?: any): Promise<IReqApi<IProductDetail[]>> {
    return new Promise<IReqApi<IProductDetail[]>>((resolve, reject) => {
      this.baseRequestService.put(`${this.url}/${id}`, body).subscribe(
        (result) => {
          return resolve(result);
        },
        (err) => reject(err)
      );
    });
  }
  deleteProduct(id: any): Promise<IReqApi<IProductDetail[]>> {
    return new Promise<IReqApi<IProductDetail[]>>((resolve, reject) => {
      this.baseRequestService.delete(`${this.url}/${id}`).subscribe(
        (result) => {},
        (err) => reject(err)
      );
    });
  }
}
