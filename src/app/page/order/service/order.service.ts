import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { IReqApi } from 'src/libs/common/interface/interfaces';
import { BaseRequestAbstractService } from 'src/libs/service/request/abstract-api.service';
import { BaseRequestService } from 'src/libs/service/request/base-request.service';
@Injectable({ providedIn: 'root' })

export class OrderService {
    constructor(private abstractService: BaseRequestService) { }



    findOrderByKhachHangAndTrangThai(params?: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.abstractService.get('invoice/status/' + params).subscribe(
                (result) => {
                    return resolve(result)
                },
                (err) => reject(err)
            );
        });
    }

    findById(id?: number): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.abstractService.get('invoice/' + id).subscribe(
                (result) => {
                    return resolve(result)
                },
                (err) => reject(err)
            );
        });
    }

    updateInvoice(body: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.abstractService.put('invoice/update', body).subscribe(
                (result) => {
                    return resolve(result)
                },
                (err) => reject(err)
            );
        });
    }

    findByIdHDCT(id?: number): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.abstractService.get('invoice/detail/' + id).subscribe(
                (result) => {
                    return resolve(result)
                },
                (err) => reject(err)
            );
        });
    }

    huyDon(id?: number): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.abstractService.get('invoice/huy-don/' + id).subscribe(
                (result) => {
                    return resolve(result)
                },
                (err) => reject(err)
            );
        });
    }

    deleteInvoiceDetail(id?: number): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.abstractService.delete('invoice/detail/' + id).subscribe(
                (result) => {
                    return resolve(result)
                },
                (err) => reject(err)
            );
        });
    }

    traHang(body: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.abstractService.post('return-product', body).subscribe(
                (result) => {
                    return resolve(result)
                },
                (err) => reject(err)
            );
        });
    }

    findTraHangByIdHD(id?: number): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.abstractService.get('return-product/id-invoice/' + id).subscribe(
                (result) => {
                    return resolve(result)
                },
                (err) => reject(err)
            );
        });
    }

    findTraHangByKhachHang(id?: number): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.abstractService.get('return-product/id-customer').subscribe(
                (result) => {
                    return resolve(result)
                },
                (err) => reject(err)
            );
        });
    }
}