import { Injectable } from '@angular/core';
import { BaseRequestService } from '../../request/base-request.service';
import { IReqApi } from 'src/libs/common/interface/interfaces';

@Injectable({ providedIn: 'root' })
export class KhachHangService {
    constructor(private BaseRequestService: BaseRequestService
    ) { }

    updateCustomer(params: any, id: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.BaseRequestService.put(`customer/v1/${id}`, params).subscribe(
                (result) => {
                    return resolve(result);
                },
                (err) => reject(err)
            );
        });
    }

    changePass(body: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.BaseRequestService.post(`auth/customer/change-password`, body).subscribe(
                (result) => {
                    return resolve(result);
                },
                (err) => reject(err)
            );
        });
    }
}