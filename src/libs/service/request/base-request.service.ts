import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environment/environment';
import { BaseRequestAbstractService } from './abstract-api.service';

@Injectable({
  providedIn: 'root',
})
export class BaseRequestService extends BaseRequestAbstractService {
  constructor(public override http: HttpClient, public override route: Router) {
    super(http, route);
    this.refreshAPIUrl();
  }

  refreshAPIUrl() {
    this.baseUrl = `${environment.api.main}/`;
  }
}
