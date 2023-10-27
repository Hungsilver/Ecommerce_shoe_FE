import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IReqApi } from 'src/libs/common/interface/interfaces';
import { IColor } from './color.module';
<<<<<<< HEAD
import { BaseRequestService } from '../../../../libs/service/request/base-request.service';
import { IReqApi } from 'src/libs/common/interface/interfaces';
=======
import { BaseRequestService } from 'src/libs/service/request/base-request.service';
>>>>>>> develop

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  url: string = 'colors';

<<<<<<< HEAD
  constructor(
    private BaseRequestService: BaseRequestService
  ) { }


  getColors(params?: any): Promise<IReqApi<IColor[]>> {
    return new Promise<IReqApi<IColor[]>>((resolve, reject) => {
      this.BaseRequestService.get(`${this.url}`, params).subscribe(
=======
  constructor(private baseRequestService: BaseRequestService) {}
  getColors(params?: any): Promise<IReqApi<IColor[]>> {
    return new Promise<IReqApi<IColor[]>>((resolve, reject) => {
      this.baseRequestService.get(`${this.url}`, params).subscribe(
>>>>>>> develop
        (result) => {
          return resolve(result);
        },
        (err) => reject(err)
      );
    });
  }
<<<<<<< HEAD


  createColor(body: any): Promise<IReqApi<IColor[]>> {
    return new Promise<IReqApi<IColor[]>>((resolve, reject) => {
      this.BaseRequestService.post(`${this.url}`, body).subscribe(
=======
  createColor(body: any): Promise<IReqApi<IColor[]>> {
    return new Promise<IReqApi<IColor[]>>((resolve, reject) => {
      this.baseRequestService.post(`${this.url}`, body).subscribe(
>>>>>>> develop
        (result) => {
          return resolve(result);
        },
        (err) => reject(err)
      );
    });
  }
<<<<<<< HEAD

  updateColor(body: any, id?: any): Promise<IReqApi<IColor[]>> {
    return new Promise<IReqApi<IColor[]>>((resolve, reject) => {
      this.BaseRequestService.put(`${this.url}/${id}`, body).subscribe(
=======
  updateColor(body: any, id?: any): Promise<IReqApi<IColor[]>> {
    return new Promise<IReqApi<IColor[]>>((resolve, reject) => {
      this.baseRequestService.put(`${this.url}/${id}`, body).subscribe(
>>>>>>> develop
        (result) => {
          return resolve(result);
        },
        (err) => reject(err)
      );
    });
  }
<<<<<<< HEAD

  deleteColor(id: any): Promise<IReqApi<IColor[]>> {
    return new Promise<IReqApi<IColor[]>>((resolve, reject) => {
      this.BaseRequestService.delete(`${this.url}/${id}`).subscribe(
        (result) => {
        },
=======
  deleteColor(id: any): Promise<IReqApi<IColor[]>> {
    return new Promise<IReqApi<IColor[]>>((resolve, reject) => {
      this.baseRequestService.delete(`${this.url}/${id}`).subscribe(
        (result) => {},
>>>>>>> develop
        (err) => reject(err)
      );
    });
  }
<<<<<<< HEAD


=======
>>>>>>> develop
}
