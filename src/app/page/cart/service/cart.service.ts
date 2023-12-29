import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { IReqApi } from 'src/libs/common/interface/interfaces';
import { BaseRequestAbstractService } from 'src/libs/service/request/abstract-api.service';
import { BaseRequestService } from 'src/libs/service/request/base-request.service';

@Injectable({ providedIn: 'root' })

export class CartService {
    constructor(
        private abstractService: BaseRequestService
        ) { }

    getAll(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.abstractService.get('cart-detail/ofcart').subscribe(
                (result) => {
                    return resolve(result)
                },
                (err) => reject(err)
            );
        });
    }

    findById(params?: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.abstractService.get('cart-detail/findById',params).subscribe(
                (result) => {
                    return resolve(result)
                },
                (err) => reject(err)
            );
        });
    }

    checkout(body:any): Promise<any> {
        if (body.phuongThucThanhToan==='0') {
            console.log(123);
            return new Promise<any>((resolve, reject) => {
                this.abstractService.post('invoice/online/payment',body)
                .subscribe(
                    (result) => {
                        return resolve(result)
                    },
                    (err) => reject(err)
                );
            });
        }
        else{
            return new Promise<any>((resolve, reject) => {
                this.abstractService.post('invoice/online/payment',body)
                .subscribe(
                    (result) => {
                        console.log(result);
                        
                        return resolve(result)
                    },
                    (err) => reject(err)
                );
            });
        }
        
    }

    findByMaPhieuGiamGia(params?: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.abstractService.get('voucher/code',params).subscribe(
                (result) => {
                    return resolve(result)
                },
                (err) => reject(err)
            );
        });
    }

    updateQuantity(params?: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.abstractService.get('cart-detail/update/quantity',params).subscribe(
                (result) => {
                    return resolve(result)
                },
                (err) => reject(err)
            );
        });
    }

    deleteAllCart(params?: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.abstractService.delete('cart-detail/remove', params).subscribe(
                (result) => {
                    return resolve(result)
                },
                (err) => reject(err)
            );
        });
    }
}