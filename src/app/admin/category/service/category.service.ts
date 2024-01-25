import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IReqApi } from 'src/libs/common/interface/interfaces';
import { ICategory } from './category.module';
import { BaseRequestService } from '../../../../libs/service/request/base-request.service';


@Injectable({
    providedIn: 'root',
})
export class CategoryService {
    url: string = 'category';

    constructor(private baseRequestService: BaseRequestService) { }
    getCategory(params?: any): Promise<IReqApi<ICategory>> {
        return new Promise<IReqApi<ICategory>>((resolve, reject) => {
            this.baseRequestService.get(`${this.url}`, params).subscribe(
                (result) => {
                    return resolve(result);
                },
                (err) => reject(err)
            );
        });
    }
    createCategory(body: any): Promise<IReqApi<ICategory>> {
        return new Promise<IReqApi<ICategory>>((resolve, reject) => {
            this.baseRequestService.post(`${this.url}`, body).subscribe(
                (result) => {
                    return resolve(result);
                },
                (err) => reject(err)
            );
        });
    }
    updateCategory(body: any, id?: any): Promise<IReqApi<ICategory>> {
        return new Promise<IReqApi<ICategory>>((resolve, reject) => {
            this.baseRequestService.put(`${this.url}/${id}`, body).subscribe(
                (result) => {
                    return resolve(result);
                },
                (err) => reject(err)
            );
        });
    }
    deleteCategory(id: any): Promise<IReqApi<ICategory[]>> {
        return new Promise<IReqApi<ICategory[]>>((resolve, reject) => {
            this.baseRequestService.delete(`${this.url}/${id}`).subscribe(
                (result) => { },
                (err) => reject(err)
            );
        });
    }
}
