import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IReqApi } from 'src/libs/common/interface/interfaces';
import { IColor } from './color.module';
import { BaseRequestService } from '../../../../libs/service/request/base-request.service';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  url: string = 'colors';

  constructor(private baseRequestService: BaseRequestService) { }
  getColors(params?: any): Promise<IReqApi<IColor[]>> {
    return new Promise<IReqApi<IColor[]>>((resolve, reject) => {
      this.baseRequestService.get(`${this.url}`, params).subscribe(
        (result) => {
          return resolve(result);
        },
        (err) => reject(err)
      );
    });
  }
  createColor(body: any): Promise<IReqApi<IColor[]>> {
    return new Promise<IReqApi<IColor[]>>((resolve, reject) => {
      this.baseRequestService.post(`${this.url}`, body).subscribe(
        (result) => {
          return resolve(result);
        },
        (err) => reject(err)
      );
    });
  }
  updateColor(body: any, id?: any): Promise<IReqApi<IColor[]>> {
    return new Promise<IReqApi<IColor[]>>((resolve, reject) => {
      this.baseRequestService.put(`${this.url}/${id}`, body).subscribe(
        (result) => {
          return resolve(result);
        },
        (err) => reject(err)
      );
    });
  }
  deleteColor(id: any): Promise<IReqApi<IColor[]>> {
    return new Promise<IReqApi<IColor[]>>((resolve, reject) => {
      this.baseRequestService.delete(`${this.url}/${id}`).subscribe(
        (result) => { },
        (err) => reject(err)
      );
    });
  }
}
