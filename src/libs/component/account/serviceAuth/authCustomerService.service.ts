import { Injectable } from '@angular/core';
import { IBodyLogin, IBodyRegister } from 'src/libs/service/project/login/login.model';
import { BaseRequestService } from 'src/libs/service/request/base-request.service';

@Injectable({ providedIn: 'root' })

export class AuthCustomerService {
    constructor(
        private baseService: BaseRequestService
    ) { }

    loginCustomer(body: IBodyLogin): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.baseService.post('auth/customer/login', body).subscribe(
                (result) => {
                    return resolve(result);
                },
                (err) => reject(err)
            )
        })
    }

    registerCustomer(body: IBodyRegister): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.baseService.post('auth/customer/register', body).subscribe(
                (result) => {
                    return resolve(result);
                },
                (err) => reject(err)
            )
        })
    }

    forgetPassCustomer(email: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.baseService.get('auth/customer/register', email).subscribe(
                (result) => {
                    return resolve(result);
                },
                (err) => reject(err)
            )
        })
    }

    logoutCustomer(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.baseService.get('auth/customer/logout').subscribe(
                (result) => {
                    return resolve(result);
                },
                (err) => reject(err)
            )
        })
    }

    loginAdmin(body: IBodyLogin): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.baseService.get('auth/admin/login', body).subscribe(
                (result) => {
                    return resolve(result);
                },
                (err) => reject(err)
            )
        })
    }

    registerAdmin(body: IBodyRegister): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.baseService.post('auth/customer/register', body).subscribe(
                (result) => {
                    return resolve(result);
                },
                (err) => reject(err)
            )
        })
    }
}