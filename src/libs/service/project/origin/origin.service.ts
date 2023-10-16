import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IColor } from './origin.module';
import { RootRequestService } from '../../request/product-request.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url: string = 'color';

  constructor(
    private rootRequestService: RootRequestService
  ) { }
  getColors(): Promise<IColor[]> {
    return new Promise<IColor[]>((resolve, reject) => {
      this.rootRequestService.get(`${this.url}`).subscribe(
        (result) => {
          return resolve(result);
        },
        (err) => reject(err)
      );
    });
  }

  getColorByName(name: string): Promise<IColor> {
    return new Promise<IColor>((resolve, reject) => {
      this.rootRequestService.get(`${this.url}/${name}`).subscribe(
        (result) => {
          return resolve(result);
        },
        (err) => reject(err)
      );
    });
  }
}
