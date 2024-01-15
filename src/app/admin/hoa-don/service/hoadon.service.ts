import { IHoaDon } from './../../sales/service/hoadon/hoadon.module';
import { BaseRequestService } from './../../../../libs/service/request/base-request.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IReqApi } from './../../../../libs/common/interface/interfaces';
import { Injectable } from '@angular/core';
import { IHoaDonChiTiet } from '../../sales/service/hoadonchitiet/hoadonchitiet.module';
import { IHoaDons } from './hoadon.module';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HoaDonService {
  url: string = 'invoice';

  constructor(
    private BaseRequestService: BaseRequestService,
    private http: HttpClient
  ) { }

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

  findByMaHoaDon(ma?: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        this.BaseRequestService.get('invoice/code/' + ma).subscribe(
            (result) => {
                return resolve(result)
            },
            (err) => reject(err)
        );
    });
}

  exportPdf(id: number): Observable<Blob> {
    const url = `${this.url}/export/giao-hang/${id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'text/plain',
      Accept: 'application/pdf',
    });

    return this.http.get(`//localhost:8080/api/invoice/export/giao-hang/${id}`, { headers, responseType: 'blob' });
  }

  getStat(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.BaseRequestService.get('statistic/invoice').subscribe(
        (result: any) => {
          return resolve(result);
        },
        (err) => reject(err)
      )
    })

  }

  findByMaCtsp(ma?: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.BaseRequestService.get('product-detail/code/' + ma).subscribe(
        (result) => {
          return resolve(result)
        },
        (err) => reject(err)
      );
    });
  }

  findTraHangByIdHD(id?: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.BaseRequestService.get('return-product/id-invoice/' + id).subscribe(
        (result) => {
          return resolve(result)
        },
        (err) => reject(err)
      );
    });
  }

  deleteInvoiceDetail(id?: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.BaseRequestService.delete('invoice/detail/' + id).subscribe(
        (result) => {
          return resolve(result)
        },
        (err) => reject(err)
      );
    });
  }

  addHdct(body?: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.BaseRequestService.post('invoice/shop/add-product', body).subscribe(
        (result) => {
          return resolve(result)
        },
        (err) => reject(err)
      );
    });
  }

  updateStatus(id?: number, status?: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.BaseRequestService.get(`${this.url}/update-status/${id}/${status}`).subscribe(
        (result) => {
          return resolve(result)
        },
        (err) => reject(err)
      );
    });
  }

  updateInvoice(body: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        this.BaseRequestService.put('invoice/update', body).subscribe(
            (result) => {
                return resolve(result)
            },
            (err) => reject(err)
        );
    });
}

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