import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IHoaDon } from './hoadon.module';
import { BaseRequestService } from '../../../../../libs/service/request/base-request.service';
import { IReqApi } from 'src/libs/common/interface/interfaces';


@Injectable({
    providedIn: 'root',
})
export class HoaDonService {
    url: string = 'invoice';

    constructor(
        private BaseRequestService: BaseRequestService
    ) { }

    createHoadon(body: any): Promise<IReqApi<IHoaDon>> {
        return new Promise<IReqApi<IHoaDon>>((resolve, reject) => {
            this.BaseRequestService.post(`${this.url + `/shop/create`}`, body).subscribe(
                (result: IReqApi<IHoaDon>) => {  // Chỉ định kiểu dữ liệu của 'result'
                    return resolve(result);
                },
                (err) => reject(err)
            );
        });
    }

    // createHoadon(body: any): Promise<IReqApi<IHoaDon>> {
    //     return new Promise<IReqApi<IHoaDon>>((resolve, reject) => {
    //         this.BaseRequestService.post(`${this.url + `/shop/create`}`, body).subscribe(
    //             (result) => {
    //                 return resolve(result);
    //             },
    //             (err) => reject(err)
    //         );
    //     });
    // }


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
                (result) => {
                },
                (err) => reject(err)
            );
        });
    }


}
