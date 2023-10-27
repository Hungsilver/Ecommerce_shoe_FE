import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISize } from './size.module';
import { BaseRequestService } from '../../request/base-request.service';
import { IReqApi } from 'src/libs/common/interface/interfaces';

@Injectable({
  providedIn: 'root',
})
export class SizeService {
  url: string = 'size';

  constructor(
    private BaseRequestService: BaseRequestService
  ) { }
  getSizes(params?: any): Promise<IReqApi<ISize[]>> {
    return new Promise<IReqApi<ISize[]>>((resolve, reject) => {
      this.BaseRequestService.get(`${this.url}`, params).subscribe(
        (result) => {
          return resolve(result);
        },
        (err) => reject(err)
      );
    });
  }
  createSize(body: any): Promise<IReqApi<ISize[]>> {
    return new Promise<IReqApi<ISize[]>>((resolve, reject) => {
      this.BaseRequestService.post(`${this.url}`, body).subscribe(
        (result) => {
          return resolve(result);
        },
        (err) => reject(err)
      );
    });
  }
  updateSize(body: any, id?: any): Promise<IReqApi<ISize[]>> {
    return new Promise<IReqApi<ISize[]>>((resolve, reject) => {
      this.BaseRequestService.put(`${this.url}/${id}`, body).subscribe(
        (result) => {
          return resolve(result);
        },
        (err) => reject(err)
      );
    });
  }
  deleteSize(id: any): Promise<IReqApi<ISize[]>> {
    return new Promise<IReqApi<ISize[]>>((resolve, reject) => {
      this.BaseRequestService.delete(`${this.url}/${id}`).subscribe(
        (result) => {
        },
        (err) => reject(err)
      );
    });
  }
}
