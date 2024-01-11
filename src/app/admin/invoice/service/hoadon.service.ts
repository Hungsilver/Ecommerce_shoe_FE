import { IHoaDon } from './../../sales/service/hoadon/hoadon.module';
import { BaseRequestService } from './../../../../libs/service/request/base-request.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IHoaDons } from './hoadon.module';
import { IReqApi } from './../../../../libs/common/interface/interfaces';
import { Injectable } from '@angular/core';
import { IHoaDonChiTiet } from '../../sales/service/hoadonchitiet/hoadonchitiet.module';

@Injectable({
    providedIn: 'root',
})
export class InvoiceService {
    url: string = 'invoice';

    constructor(
        private BaseRequestService: BaseRequestService,
        private http: HttpClient
    ) {}

  //   findByIdInvoice(idHoaDon: any): Promise<IReqApi<IHoaDonChiTiet>> {
  //     return new Promise<IReqApi<IHoaDonChiTiet>>((resolve, reject) => {
  //         this.BaseRequestService.get(`${this.url}/${idHoaDon}`).subscribe(
  //             (result) => {
  //               return resolve(result);

  //             },
  //             (err) => reject(err)
  //         );
  //     });
  // }
  findByIdInvoice(idHoaDon: any): Promise<any> {
    // const apiUrl = `${this.url}/code/${ma}`;
    return new Promise<any>((resolve, reject) => {
        this.BaseRequestService.get(`${this.url}/findByIdInvoice/${idHoaDon}`).subscribe(
            (result) => {
                resolve(result);
            },
            (error) => {
                reject(error);
            }
        );
    });
}

        getInvoice(params?: any): Promise<IReqApi<IHoaDons>> {
            return new Promise<IReqApi<IHoaDons>>((resolve, reject) => {
              this.BaseRequestService.get(`${this.url}`, params).subscribe(
                (result) => {
                  return resolve(result);
                },
                (err) => reject(err)
              );
            });
          }

        //   getProduct(params?: any): Promise<IReqApi<IProduct[]>> {
        //     return new Promise<IReqApi<IProduct[]>>((resolve, reject) => {
        //         this.baseRequestService.get(`${this.url}`, params).subscribe(
        //             (result) => {
        //                 return resolve(result);
        //             },
        //             (err) => reject(err)
        //         );
        //     });
        // }

        findByInvice(id: any): Promise<IReqApi<IHoaDons>> {
          return new Promise<IReqApi<IHoaDons>>((resolve, reject) => {
            this.BaseRequestService.get(`${this.url}/${id}`).subscribe(
              (result) => {
                resolve(result);  // Giải quyết Promise với dữ liệu result
              },
              (err) => {
                reject(err);  // Reject Promise nếu có lỗi
              }
            );
          });
        }
        

}