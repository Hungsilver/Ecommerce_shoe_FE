import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IReqApi } from 'src/libs/common/interface/interfaces';
import { IProduct } from './product.module';
import { BaseRequestService } from '../../../../libs/service/request/base-request.service';
import { CategoryService } from '../../category/service/category.service';
import { Observable } from 'rxjs';
import { ICategory } from '../../category/service/category.module';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    url: string = 'product';

    constructor(private baseRequestService: BaseRequestService) { }
    getProduct(params?: any): Promise<IReqApi<IProduct[]>> {
        return new Promise<IReqApi<IProduct[]>>((resolve, reject) => {
            this.baseRequestService.get(`${this.url}`, params).subscribe(
                (result) => {
                    return resolve(result);
                },
                (err) => reject(err)
            );
        });
    }

    getCategory(params?: any): Promise<IReqApi<ICategory[]>> {
        return new Promise<IReqApi<ICategory[]>>((resolve, reject) => {
            this.baseRequestService.get(`${this.url}`, params).subscribe(
                (result) => {
                    return resolve(result);
                },
                (err) => reject(err)
            );
        });
    }

    createProduct(body: any): Promise<IReqApi<IProduct[]>> {
        return new Promise<IReqApi<IProduct[]>>((resolve, reject) => {
            this.baseRequestService.post(`${this.url}`, body).subscribe(
                (result) => {
                    return resolve(result);
                },
                (err) => reject(err)
            );
        });
    }
    updateProduct(body: any, id?: any): Promise<IReqApi<IProduct[]>> {
        return new Promise<IReqApi<IProduct[]>>((resolve, reject) => {
            this.baseRequestService.put(`${this.url}/${id}`, body).subscribe(
                (result) => {
                    return resolve(result);
                },
                (err) => reject(err)
            );
        });
    }
    deleteColor(id: any): Promise<IReqApi<IProduct[]>> {
        return new Promise<IReqApi<IProduct[]>>((resolve, reject) => {
            this.baseRequestService.delete(`${this.url}/${id}`).subscribe(
                (result) => { },
                (err) => reject(err)
            );
        });
    }



    // getDanhMuc(): Observable<DanhMuc[]> {
    //     return this.http.get<DanhMuc[]>('/api/danhmuc'); // Replace with your danhMuc API endpoint
    //   }
}