import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseRequestAbstractService } from './abstract-api.service';
import { IBodyLogin } from '../project/login/login.model';
import { environment } from 'src/environment/environment';
import { Router } from '@angular/router';
import { IReqApi } from 'src/libs/common/interface/interfaces';

@Injectable({
  providedIn: 'root'
})
export class BaseAuthService extends BaseRequestAbstractService {

  constructor(
    public override http: HttpClient,
    public override route: Router
  ) {
    super(http, route);
    this.refreshAPIUrl();
  }
  refreshAPIUrl() {
    this.baseUrl = `${environment.api.auth}`;
  }

  public authenticateAdmin(body: IBodyLogin) {
    let url = `${this.baseUrl}/admin`;
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

  public authenticateUser(body: IBodyLogin) {
    let url = `${this.baseUrl}/user`;
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
