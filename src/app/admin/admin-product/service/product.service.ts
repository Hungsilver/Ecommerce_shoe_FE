import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IReqApi } from 'src/libs/common/interface/interfaces';
import { IProduct } from './product.module';
import { BaseRequestService } from '../../../../libs/service/request/base-request.service';
import { CategoryService } from '../../category/service/category.service';
import { Observable } from 'rxjs';
import { ICategory } from '../../category/service/category.module';
import { IProductExportExcel } from './productExportExcel.module';
import { IProductImportExcel } from './productIportExcel.module';
// import { AngularFireStorage } from "@angular/fire/compat/storage"

@Injectable({
    providedIn: 'root',
})
export class ProductService {

    url: string = 'product';
    private baseURL = 'http://localhost:8080/api/product/excel/export';
    private importUrl = "http://localhost:8080/api/product/excel/import";


    constructor(private baseRequestService: BaseRequestService,
        private httpClient: HttpClient
    ) { }

    private getHttpOptions() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        };
    }

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

    getAll(): Observable<IProductExportExcel[]> {
        return this.httpClient.get<IProductExportExcel[]>(`${this.baseURL}`)
    }

    create(sanpham: IProductImportExcel[]) {
        return this.httpClient.post(`${this.importUrl}`, sanpham);
    }

    createProduct(body: any): Promise<IReqApi<IProduct>> {
        return new Promise<IReqApi<IProduct>>((resolve, reject) => {
            this.baseRequestService.post(`${this.url}`, body, this.getHttpOptions).subscribe(
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

    updateProduct(body: any, id?: any): Promise<IReqApi<IProduct>> {
        return new Promise<IReqApi<IProduct>>((resolve, reject) => {
            this.baseRequestService.put(`${this.url}/${id}`, body, this.getHttpOptions).subscribe(
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

}