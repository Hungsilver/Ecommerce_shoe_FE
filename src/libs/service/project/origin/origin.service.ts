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

  // getOriginByName(name: string): Promise<IColor> {
  //   return new Promise<IColor>((resolve, reject) => {
  //     this.BaseRequestService.get(`${this.url}/${name}`).subscribe(
  //       (result) => {
  //         return resolve(result);
  //       },
  //       (err) => reject(err)
  //     );
  //   });
  // }
}
