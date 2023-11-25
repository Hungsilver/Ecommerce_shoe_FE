import { Injectable } from '@angular/core';
import { IBodyLogin } from 'src/libs/service/project/login/login.model';
import { BaseRequestService } from 'src/libs/service/request/base-request.service';

@Injectable({ providedIn: 'root' })
export class authAdminService {
    constructor(
        private baseService: BaseRequestService
    ) { }

    loginAdmin(body: IBodyLogin): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.baseService.post('/auth/admin/login', body).subscribe(
                (result) => {
                    return resolve(result);
                },
                (err) => reject(err)
            )
        })
    }
}