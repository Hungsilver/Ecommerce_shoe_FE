import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { IProductDetails } from './product-detail.module';
import { BaseRequestService } from '../../request/base-request.service';
import { IReqApi } from 'src/libs/common/interface/interfaces';

@Injectable({ providedIn: 'root' })
export class ProductDetailService implements OnInit {

    url: string = 'product-detail';

    constructor(
        private BaseRequestService: BaseRequestService
    ) { }

    ngOnInit(): void {

    }

    getProductDetails(params?: any): Promise<IReqApi<IProductDetails[]>> {
        return new Promise<IReqApi<IProductDetails[]>>((resolve, reject) => {
            this.BaseRequestService.get(`${this.url}`, params).subscribe(
                (result) => {
                    return resolve(result);
                },
                (err) => reject(err)
            );
        });
    }
    createProductDetail(body: any): Promise<IReqApi<IProductDetails[]>> {
        return new Promise<IReqApi<IProductDetails[]>>((resolve, reject) => {
            this.BaseRequestService.post(`${this.url}`, body).subscribe(
                (result) => {
                    return resolve(result);
                },
                (err) => reject(err)
            );
        });
    }
    updateProductDetail(body: any, id?: any): Promise<IReqApi<IProductDetails[]>> {
        return new Promise<IReqApi<IProductDetails[]>>((resolve, reject) => {
            this.BaseRequestService.put(`${this.url}/${id}`, body).subscribe(
                (result) => {
                    return resolve(result);
                },
                (err) => reject(err)
            );
        });
    }
    deleteProductDetail(id: any): Promise<IReqApi<IProductDetails[]>> {
        return new Promise<IReqApi<IProductDetails[]>>((resolve, reject) => {
            this.BaseRequestService.delete(`${this.url}/${id}`).subscribe(
                (result) => {
                },
                (err) => reject(err)
            );
        });
    }

}