import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMaterial } from './material.module';
import { BaseRequestService } from '../../../../libs/service/request/base-request.service';
import { IReqApi } from 'src/libs/common/interface/interfaces';


@Injectable({
    providedIn: 'root',
})
export class MaterialService {
    url: string = 'shoe-material';

    constructor(
        private BaseRequestService: BaseRequestService
    ) { }


    getMaterials(params?: any): Promise<IReqApi<IMaterial[]>> {
        return new Promise<IReqApi<IMaterial[]>>((resolve, reject) => {
            this.BaseRequestService.get(`${this.url}`, params).subscribe(
                (result) => {
                    return resolve(result);
                },
                (err) => reject(err)
            );
        });
    }


    createMaterial(body: any): Promise<IReqApi<IMaterial>> {
        return new Promise<IReqApi<IMaterial>>((resolve, reject) => {
            this.BaseRequestService.post(`${this.url}`, body).subscribe(
                (result) => {
                    return resolve(result);
                },
                (err) => reject(err)
            );
        });
    }

    updateMaterials(body: any, id?: any): Promise<IReqApi<IMaterial>> {
        return new Promise<IReqApi<IMaterial>>((resolve, reject) => {
            this.BaseRequestService.put(`${this.url}/${id}`, body).subscribe(
                (result) => {
                    return resolve(result);
                },
                (err) => reject(err)
            );
        });
    }

    deleteMaterials(id: any): Promise<IReqApi<IMaterial>> {
        return new Promise<IReqApi<IMaterial>>((resolve, reject) => {
            this.BaseRequestService.delete(`${this.url}/${id}`).subscribe(
                (result) => {
                },
                (err) => reject(err)
            );
        });
    }


}
