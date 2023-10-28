import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IColor } from './color.module';
import { BaseRequestService } from '../../../../libs/service/request/base-request.service';
import { IReqApi } from 'src/libs/common/interface/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  url: string = 'colors';

  constructor(
    private BaseRequestService: BaseRequestService
  ) { }
  getColors(): Promise<IReqApi<IColor[]>> {
    return new Promise<IReqApi<IColor[]>>((resolve, reject) => {
      this.BaseRequestService.get(`${this.url}`).subscribe(
        (result) => {
          return resolve(result);
        },
        (err) => reject(err)
      );
    });
  }

  getColorByName(name: string): Promise<IReqApi<IColor>> {
    return new Promise<IReqApi<IColor>>((resolve, reject) => {
      this.BaseRequestService.get(`${this.url}/${name}`).subscribe(
        (result) => {
          return resolve(result);
        },
        (err) => reject(err)
      );
    });
  }
}
