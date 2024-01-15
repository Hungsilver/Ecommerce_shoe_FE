import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IReqApi } from 'src/libs/common/interface/interfaces';
import { ICustomer } from './customer.module';
import { BaseRequestService } from '../../../../libs/service/request/base-request.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  urls: string = 'customer/get-all';
  url: string = 'customer';

  constructor(private baseRequestService: BaseRequestService) {}

  // getByIdCustomer(body: any, id?: any): Promise<IReqApi<ICustomer>> {
  //   return new Promise<IReqApi<ICustomer>>((resolve, reject) => {
  //     this.baseRequestService.get(`${this.url}/${id}`, body).subscribe(
  //       (result) => {
  //         return resolve(result);
  //       },
  //       (err) => reject(err)
  //     );
  //   });
  // }
  getCustomerById(id: number): Promise<ICustomer> {
    return this.baseRequestService.get(`${this.url}/${id}`).toPromise();
  }

  getCustomer(params?: any): Promise<IReqApi<ICustomer[]>> {
    return new Promise<IReqApi<ICustomer[]>>((resolve, reject) => {
      this.baseRequestService.get(`${this.url}`, params).subscribe(
        (result) => {
          return resolve(result);
        },
        (err) => reject(err)
      );
    });
  }
  createCustomer(body: any): Promise<IReqApi<ICustomer[]>> {
    return new Promise<IReqApi<ICustomer[]>>((resolve, reject) => {
      this.baseRequestService.post(`${this.url}`, body).subscribe(
        (result) => {
          return resolve(result);
        },
        (err) => reject(err)
      );
    });
  }
  updateCustomer(body: any, id?: any): Promise<IReqApi<ICustomer[]>> {
    return new Promise<IReqApi<ICustomer[]>>((resolve, reject) => {
      this.baseRequestService.put(`${this.url}/${id}`, body).subscribe(
        (result) => {
          return resolve(result);
        },
        (err) => reject(err)
      );
    });
  }
  deleteCustomer(id: any): Promise<IReqApi<ICustomer[]>> {
    return new Promise<IReqApi<ICustomer[]>>((resolve, reject) => {
      this.baseRequestService.delete(`${this.url}/${id}`).subscribe(
        (result) => {},
        (err) => reject(err)
      );
    });
  }
}
