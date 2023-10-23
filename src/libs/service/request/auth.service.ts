import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseRequestAbstractService } from './abstract-api.service';
import { IBodyLogin } from '../project/login/login.model';
import { environment } from 'src/environment/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BaseRequestAuthService extends BaseRequestAbstractService {

  constructor(
    public override http: HttpClient,
    public override route: Router
  ) {
    super(http, route);
    this.refreshAPIUrl();
  }
  refreshAPIUrl() {
    this.baseUrl = `${environment.api.auth}/v${environment.api.version}/`;
  }

  public authenticate(body: IBodyLogin) {
    let url = `${this.baseUrl}auth/login`;
    const bodyMap: any = {};
    const header = {
      'Content-Type': 'application/json',
    };
    const headers = new HttpHeaders(header);

    for (const key in body) {
      if ((body as any)[key]) {
        bodyMap[key] = (body as any)[key].trim();
      }
    }
    return this.http.post(url, bodyMap, { headers });
  }
}
