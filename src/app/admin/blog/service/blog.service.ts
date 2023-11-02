import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IReqApi } from 'src/libs/common/interface/interfaces';
import { IBlog } from './blog.module';
import { BaseRequestService } from '../../../../libs/service/request/base-request.service';


@Injectable({
    providedIn: 'root',
})
export class BlogService {

    url: string = 'blog';

    constructor(private baseRequestService: BaseRequestService) { }
    getBlog(params?: any): Promise<IReqApi<IBlog[]>> {
        return new Promise<IReqApi<IBlog[]>>((resolve, reject) => {
            this.baseRequestService.get(`${this.url}`, params).subscribe(
                (result) => {
                    return resolve(result);
                },
                (err) => reject(err)
            );
        });
    }
    createBlog(body: any): Promise<IReqApi<IBlog[]>> {
        return new Promise<IReqApi<IBlog[]>>((resolve, reject) => {
            this.baseRequestService.post(`${this.url}`, body).subscribe(
                (result) => {
                    return resolve(result);
                },
                (err) => reject(err)
            );
        });
    }
    updateBlog(body: any, id?: any): Promise<IReqApi<IBlog[]>> {
        return new Promise<IReqApi<IBlog[]>>((resolve, reject) => {
            this.baseRequestService.put(`${this.url}/${id}`, body).subscribe(
                (result) => {
                    return resolve(result);
                },
                (err) => reject(err)
            );
        });
    }
    deleteBlog(id: any): Promise<IReqApi<IBlog[]>> {
        return new Promise<IReqApi<IBlog[]>>((resolve, reject) => {
            this.baseRequestService.delete(`${this.url}/${id}`).subscribe(
                (result) => { },
                (err) => reject(err)
            );
        });
    }
}
