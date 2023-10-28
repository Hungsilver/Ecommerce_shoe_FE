import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMaterial } from './material.module';
import { BaseRequestService } from '../../request/base-request.service';
import { IReqApi } from 'src/libs/common/interface/interfaces';
@Injectable({
  providedIn: 'root',
})
<<<<<<< HEAD
export class MaterialService {
  url: string = 'material';

  constructor(
    private BaseRequestService: BaseRequestService
  ) { }

  getMaterials(params?: any): Promise<IReqApi<IMaterial[]>> {
    return new Promise<IReqApi<IMaterial[]>>((resolve, reject) => {
      this.BaseRequestService.get(`${this.url}`, params).subscribe(
=======
export class ProductService {
  url: string = 'material';

  constructor(private BaseRequestService: BaseRequestService) {}
  getColors(): Promise<IMaterial[]> {
    return new Promise<IMaterial[]>((resolve, reject) => {
      this.BaseRequestService.get(`${this.url}`).subscribe(
>>>>>>> develop
        (result) => {
          return resolve(result);
        },
        (err) => reject(err)
      );
    });
  }
  createMaterial(body: any): Promise<IReqApi<IMaterial[]>> {
    return new Promise<IReqApi<IMaterial[]>>((resolve, reject) => {
      this.BaseRequestService.post(`${this.url}`, body).subscribe(
        (result) => {
          return resolve(result);
        },
        (err) => reject(err)
      );
    });
  }
  updateMaterial(body: any, id?: any): Promise<IReqApi<IMaterial[]>> {
    return new Promise<IReqApi<IMaterial[]>>((resolve, reject) => {
      this.BaseRequestService.put(`${this.url}/${id}`, body).subscribe(
        (result) => {
          return resolve(result);
        },
        (err) => reject(err)
      );
    });
  }
  deleteMaterial(id: any): Promise<IReqApi<IMaterial[]>> {
    return new Promise<IReqApi<IMaterial[]>>((resolve, reject) => {
      this.BaseRequestService.delete(`${this.url}/${id}`).subscribe(
        (result) => {
        },
        (err) => reject(err)
      );
    });
  }
}
