import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOrigin } from './origin.module';
import { BaseRequestService } from '../../request/base-request.service';
import { IReqApi } from 'src/libs/common/interface/interfaces';

@Injectable({
  providedIn: 'root',
})
export class OriginService {
  url: string = 'origin';

  constructor(
    private BaseRequestService: BaseRequestService
  ) { }
  getOrigins(params?: any): Promise<IReqApi<IOrigin[]>> {
    return new Promise<IReqApi<IOrigin[]>>((resolve, reject) => {
      this.BaseRequestService.get(`${this.url}`, params).subscribe(
        (result) => {
          return resolve(result);
        },
        (err) => reject(err)
      );
    });
  }
  createOrigin(body: any): Promise<IReqApi<IOrigin[]>> {
    return new Promise<IReqApi<IOrigin[]>>((resolve, reject) => {
      this.BaseRequestService.post(`${this.url}`, body).subscribe(
        (result) => {
          return resolve(result);
        },
        (err) => reject(err)
      );
    });
  }
  updateOrigin(body: any, id?: any): Promise<IReqApi<IOrigin[]>> {
    return new Promise<IReqApi<IOrigin[]>>((resolve, reject) => {
      this.BaseRequestService.put(`${this.url}/${id}`, body).subscribe(
        (result) => {
          return resolve(result);
        },
        (err) => reject(err)
      );
    });
  }
  deleteOrigin(id: any): Promise<IReqApi<IOrigin[]>> {
    return new Promise<IReqApi<IOrigin[]>>((resolve, reject) => {
      this.BaseRequestService.delete(`${this.url}/${id}`).subscribe(
        (result) => {
        },
        (err) => reject(err)
      );
    });
  }

}
