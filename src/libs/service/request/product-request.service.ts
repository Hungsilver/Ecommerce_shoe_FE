import { Injectable } from "@angular/core";
import { AbstractAPIService } from "./abstract-api.service";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "src/environment/environment";


@Injectable({
    providedIn: "root"
})

export class RootRequestService extends AbstractAPIService {

    constructor(
        public override http: HttpClient,
        public override route: Router,
    ) {
        super(http, route);
        this.refreshAPIUrl();
    }

    refreshAPIUrl() {
        this.baseUrl = `${environment.api.productsDetail}/`;
    }
}