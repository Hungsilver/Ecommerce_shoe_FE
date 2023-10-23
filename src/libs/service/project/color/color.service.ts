import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IColor } from './color.module';
import { BaseRequestService } from '../../request/base-request.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url: string = 'color';

  constructor(
    private BaseRequestService: BaseRequestService
  ) { }
  getColors(): Promise<IColor[]> {
    return new Promise<IColor[]>((resolve, reject) => {
      this.BaseRequestService.get(`${this.url}`).subscribe(
        (result) => {
          return resolve(result);
        },
        (err) => reject(err)
      );
    });
  }

  getColorByName(name: string): Promise<IColor> {
    return new Promise<IColor>((resolve, reject) => {
      this.BaseRequestService.get(`${this.url}/${name}`).subscribe(
        (result) => {
          return resolve(result);
        },
        (err) => reject(err)
      );
    });
  }
}
