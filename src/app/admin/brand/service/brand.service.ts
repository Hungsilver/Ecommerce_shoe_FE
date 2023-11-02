import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IReqApi } from 'src/libs/common/interface/interfaces';
import { IBrand } from './brand.module';
import { BaseRequestService } from '../../../../libs/service/request/base-request.service';


@Injectable({
    providedIn: 'root',
})
export class BrandService {
    url: string = 'trademark';

    constructor(private baseRequestService: BaseRequestService) { }
    getBrand(params?: any): Promise<IReqApi<IBrand[]>> {
        return new Promise<IReqApi<IBrand[]>>((resolve, reject) => {
            this.baseRequestService.get(`${this.url}`, params).subscribe(
                (result) => {
                    return resolve(result);
                },
                (err) => reject(err)
            );
        });
    }
    createBrand(body: any): Promise<IReqApi<IBrand>> {
        return new Promise<IReqApi<IBrand>>((resolve, reject) => {
            this.baseRequestService.post(`${this.url}`, body).subscribe(
                (result) => {
                    return resolve(result);
                },
                (err) => reject(err)
            );
        });
    }
    updateBrand(body: any, id?: any): Promise<IReqApi<IBrand>> {
        return new Promise<IReqApi<IBrand>>((resolve, reject) => {
            this.baseRequestService.put(`${this.url}/${id}`, body).subscribe(
                (result) => {
                    return resolve(result);
                },
                (err) => reject(err)
            );
        });
    }
    deleteBrand(id: any): Promise<IReqApi<IBrand[]>> {
        return new Promise<IReqApi<IBrand[]>>((resolve, reject) => {
            this.baseRequestService.delete(`${this.url}/${id}`).subscribe(
                (result) => { },
                (err) => reject(err)
            );
        });
    }
}