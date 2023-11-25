import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IHoaDonChiTiet } from './hoadonchitiet.module';
import { BaseRequestService } from '../../../../../libs/service/request/base-request.service';
import { IReqApi } from 'src/libs/common/interface/interfaces';


@Injectable({
    providedIn: 'root',
})
export class HDChiTiet {
    url: string = 'invoice';

    constructor(
        private BaseRequestService: BaseRequestService
    ) { }


    getCtsp(params?: any): Promise<IReqApi<IHoaDonChiTiet[]>> {
        return new Promise<IReqApi<IHoaDonChiTiet[]>>((resolve, reject) => {
            this.BaseRequestService.get(`${this.url}`, params).subscribe(
                (result) => {
                    return resolve(result);
                },
                (err) => reject(err)
            );
        });
    }


    createHdct(body: any): Promise<IReqApi<IHoaDonChiTiet>> {
        return new Promise<IReqApi<IHoaDonChiTiet>>((resolve, reject) => {
            this.BaseRequestService.post(`${this.url}`, body).subscribe(
                (result) => {
                    return resolve(result);
                },
                (err) => reject(err)
            );
        });
    }

    updateHdtc(body: any, id?: any): Promise<IReqApi<IHoaDonChiTiet>> {
        return new Promise<IReqApi<IHoaDonChiTiet>>((resolve, reject) => {
            this.BaseRequestService.put(`${this.url}/${id}`, body).subscribe(
                (result) => {
                    return resolve(result);
                },
                (err) => reject(err)
            );
        });
    }

    deleteHdct(id: any): Promise<IReqApi<IHoaDonChiTiet>> {
        return new Promise<IReqApi<IHoaDonChiTiet>>((resolve, reject) => {
            this.BaseRequestService.delete(`${this.url}/${id}`).subscribe(
                (result) => {
                },
                (err) => reject(err)
            );
        });
    }


}
