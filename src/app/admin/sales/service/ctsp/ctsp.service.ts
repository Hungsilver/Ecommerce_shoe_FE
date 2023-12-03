import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IChiTietSanPham } from './ctsp.module';
import { BaseRequestService } from '../../../../../libs/service/request/base-request.service';
import { IReqApi } from 'src/libs/common/interface/interfaces';
import Config from 'chart.js/dist/core/core.config';


@Injectable({
    providedIn: 'root',
})

export class CTSPService {
    url: string = 'product-detail';

    constructor(
        private BaseRequestService: BaseRequestService
    ) { }

    getctspByKeyword(param: any): Promise<IChiTietSanPham | null> {
        return new Promise<IChiTietSanPham | null>((resolve, reject) => {
            this.BaseRequestService.get(`${this.url}/findByMa`, param).subscribe(
                (result: any) => {
                    console.log("result " + result)
                    if (result) {
                        resolve(result);
                    }
                },
                (err) => reject(err)
            );
        });
    }

    createCtsp(body: any): Promise<IReqApi<IChiTietSanPham>> {
        return new Promise<IReqApi<IChiTietSanPham>>((resolve, reject) => {
            this.BaseRequestService.post(`${this.url}`, body).subscribe(
                (result) => {
                    return resolve(result);
                },
                (err) => reject(err)
            );
        });
    }


    getCtsp(params?: any): Promise<IReqApi<IChiTietSanPham>> {
        return new Promise<IReqApi<IChiTietSanPham>>((resolve, reject) => {
            this.BaseRequestService.get(`${this.url}`, params).subscribe(
                (result) => {
                    return resolve(result);
                },
                (err) => reject(err)
            );
        });
    }

    updateCtsp(body: any, id?: any): Promise<IReqApi<IChiTietSanPham>> {
        return new Promise<IReqApi<IChiTietSanPham>>((resolve, reject) => {
            this.BaseRequestService.put(`${this.url}/${id}`, body).subscribe(
                (result) => {
                    return resolve(result);
                },
                (err) => reject(err)
            );
        });
    }

    deleteCtsp(id: any): Promise<IReqApi<IChiTietSanPham>> {
        return new Promise<IReqApi<IChiTietSanPham>>((resolve, reject) => {
            this.BaseRequestService.delete(`${this.url}/${id}`).subscribe(
                (result) => {
                },
                (err) => reject(err)
            );
        });
    }


}
