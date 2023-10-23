import { Injectable, OnInit } from '@angular/core';
import { BaseRequestService } from '../../request/base-request.service';

@Injectable({ providedIn: 'root' })
export class ProductDetailService implements OnInit {
    constructor(
        private BaseRequestService: BaseRequestService
    ) { }

    ngOnInit(): void {

    }

    // getPro

}