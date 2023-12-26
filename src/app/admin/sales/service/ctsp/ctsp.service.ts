import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IChiTietSanPham } from './ctsp.module';
import { BaseRequestService } from '../../../../../libs/service/request/base-request.service';
import { IReqApi } from 'src/libs/common/interface/interfaces';
import Config from 'chart.js/dist/core/core.config';
import { ActivatedRoute } from '@angular/router';


@Injectable({
    providedIn: 'root',
})

export class CTSPService {
    url: string = 'product-detail';
    // decodedValues: { [key: string]: string } = {};

    constructor(
        private BaseRequestService: BaseRequestService,
    ) {
        // this.route.queryParams.subscribe((params) => {
        //     this.decodedValues = this.decodeQueryString(params);
        // });
    }

    // decodeQueryString(params: { [key: string]: string }): { [key: string]: string } {
    //     const decodedValues: { [key: string]: string } = {};

    //     Object.keys(params).forEach((key) => {
    //         const decodedValue = decodeURIComponent(params[key]);
    //         decodedValues[key] = decodedValue;
    //     });

    //     return decodedValues;
    // }

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

    getId(param: any): Promise<IChiTietSanPham | null> {
        return new Promise<IChiTietSanPham | null>((resolve, reject) => {
            this.BaseRequestService.get(`${this.url}/findByMa`, param).subscribe(
                (result: IChiTietSanPham | null) => {
                    console.log("result " + result)
                    if (result) {
                        resolve(result);
                    }
                },
                (err) => reject(err)
            );
        });
    }

    findByMa(ma: string): Promise<any> {
        // const apiUrl = `${this.url}/code/${ma}`;
        return new Promise<any>((resolve, reject) => {
            this.BaseRequestService.get(`${this.url}/code/${ma}`).subscribe(
                (result) => {
                    resolve(result);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    // Trong CTSPService
    // getProductIdByProductCode(param: any): Promise<IChiTietSanPham | null> {
    //     return new Promise<IChiTietSanPham | null>((resolve, reject) => {
    //         this.BaseRequestService.get(`${this.url}/findByMa`, param).subscribe(
    //             (result: IChiTietSanPham | null) => {
    //                 console.log("result ", result);
    //                 if (result) {
    //                     resolve(result);
    //                 }
    //             },
    //             (err) => reject(err)
    //         );
    //     });
    // }
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
