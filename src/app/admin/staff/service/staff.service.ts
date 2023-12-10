import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IReqApi } from 'src/libs/common/interface/interfaces';
import { IStaff } from './staff.module';
import { BaseRequestService } from '../../../../libs/service/request/base-request.service';



@Injectable({
    providedIn: 'root',
})
export class StaffService {
    url: string = 'staff';

    constructor(private baseRequestService: BaseRequestService) { }
    getStaff(params?: any): Promise<IReqApi<IStaff>> {
        return new Promise<IReqApi<IStaff>>((resolve, reject) => {
            this.baseRequestService.get(`${this.url}`, params).subscribe(
                (result) => {
                    return resolve(result);
                },
                (err) => reject(err)
            );
        });
    }

    // getNhanVien(params?: any): Promise<IStaff[]> {
    //     return new Promise<IStaff[]>((resolve, reject) => {
    //         this.baseRequestService.get(`${this.url}`, params).subscribe(
    //             (result: IStaff[]) => {
    //                 resolve(result);
    //             },
    //             (err) => reject(err)
    //         );
    //     });
    // }

    getNhanVien(params?: any): Promise<IReqApi<IStaff[]>> {
        return this.baseRequestService.get(`${this.url}`, params).toPromise();
    }


    createStaff(body: any): Promise<IReqApi<IStaff[]>> {
        return new Promise<IReqApi<IStaff[]>>((resolve, reject) => {
            this.baseRequestService.post(`${this.url}`, body).subscribe(
                (result) => {
                    return resolve(result);
                },
                (err) => reject(err)
            );
        });
    }
    updateStaff(body: any, id?: any): Promise<IReqApi<IStaff[]>> {
        return new Promise<IReqApi<IStaff[]>>((resolve, reject) => {
            this.baseRequestService.put(`${this.url}/${id}`, body).subscribe(
                (result) => {
                    return resolve(result);
                },
                (err) => reject(err)
            );
        });
    }
    deleteStaff(id: any): Promise<IReqApi<IStaff[]>> {
        return new Promise<IReqApi<IStaff[]>>((resolve, reject) => {
            this.baseRequestService.delete(`${this.url}/${id}`).subscribe(
                (result) => { },
                (err) => reject(err)
            );
        });
    }
}
