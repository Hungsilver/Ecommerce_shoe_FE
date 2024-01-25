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