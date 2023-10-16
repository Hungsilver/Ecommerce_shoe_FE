import { Injectable, OnInit } from '@angular/core';
import { RootRequestService } from '../../request/product-request.service';

@Injectable({ providedIn: 'root' })
export class ProductDetailService implements OnInit {
    constructor(
        private rootRequestService: RootRequestService
    ) { }

    ngOnInit(): void {

    }

    // getPro

}