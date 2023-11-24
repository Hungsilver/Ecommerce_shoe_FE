import { Injectable } from '@angular/core';
import { IReqApi } from 'src/libs/common/interface/interfaces';
import { BaseRequestAbstractService } from 'src/libs/service/request/abstract-api.service';
import { IProductDetail } from './detail.module';

@Injectable({ providedIn: 'root' })
export class DetailService {
    constructor(private abtractService: BaseRequestAbstractService) { }

    addToCart(params?: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.abtractService.get('jdka', params).subscribe(
                (result) => {
                    return resolve(result);
                },
                (err) => reject(err)
            );
        });
    }
}