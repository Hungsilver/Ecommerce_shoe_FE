import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMaterial } from './size.module';
import { BaseRequestService } from '../../request/base-request.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url: string = 'material-soles';

  constructor(private BaseRequestService: BaseRequestService) {}
  getColors(): Promise<IMaterial[]> {
    return new Promise<IMaterial[]>((resolve, reject) => {
      this.BaseRequestService.get(`${this.url}`).subscribe(
        (result) => {
          return resolve(result);
        },
        (err) => reject(err)
      );
    });
  }

  getColorByName(name: string): Promise<IMaterial> {
    return new Promise<IMaterial>((resolve, reject) => {
      this.BaseRequestService.get(`${this.url}/${name}`).subscribe(
        (result) => {
          return resolve(result);
        },
        (err) => reject(err)
      );
    });
  }
}
