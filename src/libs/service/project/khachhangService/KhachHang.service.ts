import { Injectable } from '@angular/core';
import { BaseRequestService } from '../../request/base-request.service';
import { IReqApi } from 'src/libs/common/interface/interfaces';

@Injectable({ providedIn: 'root' })
export class KhachHangService {
    constructor(private BaseRequestService: BaseRequestService
    ) { }
    updateCustomer(params: any, id?: any): Promise<IReqApi<any>> {
        return new Promise<IReqApi<any>>((resolve, reject) => {
            this.BaseRequestService.put(`/${id}`, params).subscribe(
                (result) => {
                    return resolve(result);
                },
                (err) => reject(err)
            );
        });
    }
}