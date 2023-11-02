import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IReqApi } from 'src/libs/common/interface/interfaces';
import { IAddress } from './address.module';
import { BaseRequestService } from '../../../../libs/service/request/base-request.service';


@Injectable({
    providedIn: 'root',
})
export class AddressService {
    url: string = 'address';

    constructor(private baseRequestService: BaseRequestService) { }
    getAddress(params?: any): Promise<IReqApi<IAddress[]>> {
        return new Promise<IReqApi<IAddress[]>>((resolve, reject) => {
            this.baseRequestService.get(`${this.url}`, params).subscribe(
                (result) => {
                    return resolve(result);
                },
                (err) => reject(err)
            );
        });
    }
    createAddress(body: any): Promise<IReqApi<IAddress[]>> {
        return new Promise<IReqApi<IAddress[]>>((resolve, reject) => {
            this.baseRequestService.post(`${this.url}`, body).subscribe(
                (result) => {
                    return resolve(result);
                },
                (err) => reject(err)
            );
        });
    }
    updateAdress(body: any, id?: any): Promise<IReqApi<IAddress[]>> {
        return new Promise<IReqApi<IAddress[]>>((resolve, reject) => {
            this.baseRequestService.put(`${this.url}/${id}`, body).subscribe(
                (result) => {
                    return resolve(result);
                },
                (err) => reject(err)
            );
        });
    }
    deleteAddress(id: any): Promise<IReqApi<IAddress[]>> {
        return new Promise<IReqApi<IAddress[]>>((resolve, reject) => {
            this.baseRequestService.delete(`${this.url}/${id}`).subscribe(
                (result) => { },
                (err) => reject(err)
            );
        });
    }
}