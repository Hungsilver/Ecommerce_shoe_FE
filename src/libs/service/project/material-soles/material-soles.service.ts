import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMaterialSoles } from './material-soles.module';
import { BaseRequestService } from '../../request/base-request.service';
import { IReqApi } from 'src/libs/common/interface/interfaces';
@Injectable({
  providedIn: 'root',
})
export class MaterialSolesService {
  url: string = 'material-soles';

  constructor(
    private BaseRequestService: BaseRequestService
  ) { }

  getMaterials(params?: any): Promise<IReqApi<IMaterialSoles[]>> {
    return new Promise<IReqApi<IMaterialSoles[]>>((resolve, reject) => {
      this.BaseRequestService.get(`${this.url}`, params).subscribe(
        (result) => {
          return resolve(result);
        },
        (err) => reject(err)
      );
    });
  }
  createMaterial(body: any): Promise<IReqApi<IMaterialSoles[]>> {
    return new Promise<IReqApi<IMaterialSoles[]>>((resolve, reject) => {
      this.BaseRequestService.post(`${this.url}`, body).subscribe(
        (result) => {
          return resolve(result);
        },
        (err) => reject(err)
      );
    });
  }
  updateMaterial(body: any, id?: any): Promise<IReqApi<IMaterialSoles[]>> {
    return new Promise<IReqApi<IMaterialSoles[]>>((resolve, reject) => {
      this.BaseRequestService.put(`${this.url}/${id}`, body).subscribe(
        (result) => {
          return resolve(result);
        },
        (err) => reject(err)
      );
    });
  }
  deleteMaterial(id: any): Promise<IReqApi<IMaterialSoles[]>> {
    return new Promise<IReqApi<IMaterialSoles[]>>((resolve, reject) => {
      this.BaseRequestService.delete(`${this.url}/${id}`).subscribe(
        (result) => {
        },
        (err) => reject(err)
      );
    });
  }

}
