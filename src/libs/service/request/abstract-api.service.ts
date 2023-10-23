import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs';

export class BaseRequestAbstractService {
  baseUrl!: string;
  constructor(protected http: HttpClient, protected route: Router) { }

  protected options(params: HttpParams): {
    headers: HttpHeaders;
    params: HttpParams;
  } {
    const header = {
      'Content-Type': 'application/json',
    };
    const headers = new HttpHeaders(header);
    return { headers, params };
  }

  protected handlerResponse(res: any) {
    return res;
  }

  get(path: string, param?: any) {
    return this.http
      .get<any>(`${this.baseUrl}${path ? path : ''}`, this.options(param))
      .pipe(map((res) => this.handlerResponse(res)));
  }

  post(path: string, body: any, param?: any) {
    return this.http
      .post<any>(
        `${this.baseUrl}/${path ? path : ''}`,
        body,
        this.options(param)
      )
      .pipe(map((res) => this.handlerResponse(res)));
  }

  put(path: string, body: any, param?: any) {
    return this.http
      .put<any>(
        `${this.baseUrl}/${path ? path : ''}`,
        body,
        this.options(param)
      )
      .pipe(map((res) => this.handlerResponse(res)));
  }

  delete(path: string, param: any) {
    return this.http.delete(`${this.baseUrl}/${path}`, this.options(param));
  }
}
