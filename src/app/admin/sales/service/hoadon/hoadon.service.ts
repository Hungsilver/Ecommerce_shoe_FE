import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IHoaDon } from './hoadon.module';
import { BaseRequestService } from '../../../../../libs/service/request/base-request.service';
import { IReqApi } from 'src/libs/common/interface/interfaces';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { IHoaDonChiTiet } from '../hoadonchitiet/hoadonchitiet.module';
import { take } from 'rxjs/operators'; // Thêm import này
import { IVoucher } from 'src/app/admin/voucher/service/voucher.module';

@Injectable({
  providedIn: 'root',
})
export class HoaDonService {
  url: string = 'invoice';

  urls: string = '//localhost:8080/api/invoice/shop/payments';
  testUrl: string = '//localhost:8080/api/invoice';

  constructor(
    private BaseRequestService: BaseRequestService,
    private http: HttpClient // private localStorageService:storageSer
  ) {}

  private currentHoaDonId = new BehaviorSubject<number | null>(null);
  currentHoaDonId$ = this.currentHoaDonId.asObservable();

  setCurrentHoaDonId(id: number): void {
    this.currentHoaDonId.next(id);
  }
  //start code hung
  getAllHd(params?: any): Promise<IReqApi<IHoaDon[]>> {
    return new Promise<IReqApi<IHoaDon[]>>((resolve, reject) => {
      this.BaseRequestService.get('invoice', params).subscribe(
        (result) => {
          return resolve(result);
        },
        (err) => reject(err)
      );
    });
  }

  addHd(params?: any): Promise<IReqApi<IHoaDon[]>> {
    return new Promise<IReqApi<IHoaDon[]>>((resolve, reject) => {
      this.BaseRequestService.post(`invoice/shop/create`, params).subscribe(
        //update here
        (result) => {
          return resolve(result);
        },
        (err) => reject(err)
      );
    });
  }

  cancelInvoice(id: number): Promise<any> {
    return this.BaseRequestService.post(
      `${this.url}/cance-invoice/${id}`,
      {}
    ).toPromise();
  }

  deleteHd(params: any): Promise<IReqApi<IHoaDon[]>> {
    return new Promise<IReqApi<IHoaDon[]>>((resolve, reject) => {
      this.BaseRequestService.get('invoice/update-status', params).subscribe(
        (result) => {
          return resolve(result);
        },
        (err) => reject(err)
      );
    });
  }

  findByMaPhieuGiamGia(params?: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.BaseRequestService.get('voucher/code', params).subscribe(
        (result) => {
          return resolve(result);
        },
        (err) => reject(err)
      );
    });
  }

  addPhieuGiamGiaToHoaDon(
    idHoaDon: number,
    maPhieu: string
  ): Promise<IVoucher> {
    const url = `${this.url}/add-phieu-giam-gia/${idHoaDon}?maPhieuGiamGia=${maPhieu}`;
    return this.BaseRequestService.post(url, {}).toPromise();
  }
  //end code hung
  private updateTabs(tabs: string[]): void {
    // this.tabsSubject.next(tabs);
  }

  addTab(tab: string): void {
    // this.tabs$.pipe(take(1)).subscribe((tabs) => {
    //   const updatedTabs = [...tabs, tab];
    //   this.updateTabs(updatedTabs);
    // });
  }

  private printInvoiceSubject = new BehaviorSubject<boolean>(false);
  printInvoice$ = this.printInvoiceSubject.asObservable();

  private printInvoice: boolean = false;

  setPrintInvoice(value: boolean): void {
    console.log('Setting printInvoice:', value);
    this.printInvoiceSubject.next(value);
  }

  getLatestHoaDonWithTrangThai1(): Observable<any> {
    const url = `${this.url}/new-invoice`;
    return this.BaseRequestService.get(url);
  }

  getNewInvoice(): Observable<any> {
    const url = `${this.url}/getInvoice-new`;
    return this.BaseRequestService.get(url);
  }

  updateInvoiceDetail(
    idHDCT: number,
    hoaDonChiTietRequest: IHoaDonChiTiet
  ): Observable<any> {
    const urlInvoiceDetail = `${this.url}/shop/update-invoice-detail/${idHDCT}`;
    return this.BaseRequestService.put(urlInvoiceDetail, hoaDonChiTietRequest);
  }

  getData(id: number): Observable<any> {
    return this.BaseRequestService.get(`${this.url}/export/${id}`, {
      responseType: 'blob',
    });
  }

  exportPdf(id: number): Observable<Blob> {
    const url = `${this.testUrl}/export/${id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'text/plain',
      Accept: 'application/pdf',
    });

    return this.http.get(url, { headers, responseType: 'blob' });
  }

  shopPaymentsCast(id: number, hoaDonRequest: IHoaDon): Observable<any> {
    return this.BaseRequestService.post(
      `${this.url}/shop/payments/cast/${id}`,
      hoaDonRequest
    );
  }

  shopPaymentsVnpay(id: number, hoaDonRequest: IHoaDon): Observable<string> {
    return this.BaseRequestService.post(
      `${this.url}/shop/payments/vnpay/${id}`,
      hoaDonRequest
    ).pipe(
      map((response: any) => {
        if (response && response.vnpPaymentUrl) {
          return response.vnpPaymentUrl;
        } else {
          throw new Error('No payment URL in the response');
        }
      })
    );
  }
  vnPayShopService(idHoaDon: number, hoaDonRequest: any): Observable<any> {
    return this.http.post<any>(`${this.urls}/vnpay/${idHoaDon}`, hoaDonRequest);
  }

  createHoadon(body: any): Promise<IReqApi<IHoaDon>> {
    return new Promise<IReqApi<IHoaDon>>((resolve, reject) => {
      this.BaseRequestService.post(
        `${this.url + `/shop/create`}`,
        body
      ).subscribe(
        (result: IReqApi<IHoaDon>) => {
          return resolve(result);
        },
        (err) => reject(err)
      );
    });
  }

  getHoaDon(params?: any): Promise<IReqApi<IHoaDon[]>> {
    return new Promise<IReqApi<IHoaDon[]>>((resolve, reject) => {
      this.BaseRequestService.get(`${this.url}`, params).subscribe(
        (result) => {
          return resolve(result);
        },
        (err) => reject(err)
      );
    });
  }

  getINvoice(params?: any): Promise<IReqApi<IHoaDon[]>> {
    return this.BaseRequestService.get(`${this.url}`, { params }).toPromise();
  }

  updateHoaDon(body: any, id?: any): Promise<IReqApi<IHoaDon>> {
    return new Promise<IReqApi<IHoaDon>>((resolve, reject) => {
      this.BaseRequestService.put(`${this.url}/${id}`, body).subscribe(
        (result) => {
          return resolve(result);
        },
        (err) => reject(err)
      );
    });
  }

  deleteHoaDon(id: any): Promise<IReqApi<IHoaDon>> {
    return new Promise<IReqApi<IHoaDon>>((resolve, reject) => {
      this.BaseRequestService.delete(`${this.url}/${id}`).subscribe(
        (result) => {},
        (err) => reject(err)
      );
    });
  }

  findByIdInvoice(id: any): Promise<IReqApi<IHoaDon>> {
    return new Promise<IReqApi<IHoaDon>>((resolve, reject) => {
      this.BaseRequestService.get(`${this.url}/${id}`).subscribe(
        (result) => {},
        (err) => reject(err)
      );
    });
  }

  getInvoiceDetailsById(id: any): Promise<IReqApi<IHoaDonChiTiet>> {
    return new Promise<IReqApi<IHoaDonChiTiet>>((resolve, reject) => {
      this.BaseRequestService.get(`${this.url}detail/${id}`).subscribe(
        (result: IReqApi<IHoaDonChiTiet>) => resolve(result),
        (err) => reject(err)
      );
    });
  }

  // getInvoiceDetailsById(id: number): Observable<any> {
  //   return this.BaseRequestService.get(`${this.url}/${id}`);
  // }
  // getInvoiceDetailsById(id: number): Promise<IHoaDonChiTiet> {
  //   return this.BaseRequestService.get(`${this.url}/${id}`).toPromise();
  // }
}
