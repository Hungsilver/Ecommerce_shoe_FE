import { Injectable } from '@angular/core';
import { IReqApi } from 'src/libs/common/interface/interfaces';
import { BaseRequestAbstractService } from 'src/libs/service/request/abstract-api.service';
import { BaseRequestService } from 'src/libs/service/request/base-request.service';

@Injectable({ providedIn: 'root' })

export class DetailService {
    constructor(private abstractService: BaseRequestService) { }

    addToCart(params?: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.abstractService.get('cart-detail/addToCart', params).subscribe(
                (result) => {
                    return resolve(result)
                },
                (err) => reject(err)
            );
        });
    }
}