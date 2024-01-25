import { Injectable } from '@angular/core';
import { IReqApi } from 'src/libs/common/interface/interfaces';
import { BaseRequestService } from 'src/libs/service/request/base-request.service';
import { IVoucher } from './voucher.module';

@Injectable({
  providedIn: 'root',
})
export class VoucherSevice {
  url: string = 'voucher';

  constructor(private baseRequestService: BaseRequestService) {}

  getVoucher(params?: any): Promise<IReqApi<IVoucher>> {
    return new Promise<IReqApi<IVoucher>>((resolve, reject) => {
      this.baseRequestService.get(`${this.url}`, params).subscribe(
        (result) => {
          return resolve(result);
        },
        (err) => reject(err)
      );
    });
  }

  getVoucherWithInvoice(params?: any): Promise<IReqApi<IVoucher>> {
    return this.baseRequestService.get(`${this.url}`, params).toPromise();
  }

  createVoucher(body: any): Promise<IReqApi<IVoucher[]>> {
    return new Promise<IReqApi<IVoucher[]>>((resolve, reject) => {
      this.baseRequestService.post(`${this.url}`, body).subscribe(
        (result) => {
          return resolve(result);
        },
        (err) => reject(err)
      );
    });
  }
  updateVoucher(body: any, id?: any): Promise<IReqApi<IVoucher[]>> {
    return new Promise<IReqApi<IVoucher[]>>((resolve, reject) => {
      this.baseRequestService.put(`${this.url}/${id}`, body).subscribe(
        (result) => {
          return resolve(result);
        },
        (err) => reject(err)
      );
    });
  }
  deleteVoucher(id: any): Promise<IReqApi<IVoucher[]>> {
    return new Promise<IReqApi<IVoucher[]>>((resolve, reject) => {
      this.baseRequestService.delete(`${this.url}/${id}`).subscribe(
        (result) => {},
        (err) => reject(err)
      );
    });
  }
}
