import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IReqApi } from 'src/libs/common/interface/interfaces';
import { ICustomer } from './customer.module';
import { BaseRequestService } from '../../../../libs/service/request/base-request.service';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  urls: string = 'customer/get-all';
  url: string = 'customer';

  constructor(private baseRequestService: BaseRequestService,private notification: ToastrService) {}

  // getByIdCustomer(body: any, id?: any): Promise<IReqApi<ICustomer>> {
  //   return new Promise<IReqApi<ICustomer>>((resolve, reject) => {
  //     this.baseRequestService.get(`${this.url}/${id}`, body).subscribe(
  //       (result) => {
  //         return resolve(result);
  //       },
  //       (err) => reject(err)
  //     );
  //   });
  // }

  checkDuplicate(field: string, value: string): Promise<boolean> {
    return this.baseRequestService
      .get(`${this.url}/check-duplicate?field=${field}&value=${value}`)
      .toPromise();
  }

  getCustomerById(id: number): Promise<ICustomer> {
    return this.baseRequestService.get(`${this.url}/${id}`).toPromise();
  }
  checkDuplicateEmail(email: string): Promise<boolean> {
    return this.baseRequestService.get(`${this.url}/checkEmail/${email}`).toPromise();
  }
  checkDuplicatePhoneNumber(phoneNumber: string): Promise<boolean> {
    return this.baseRequestService.get(`${this.url}/checkPhoneNumberExists/${phoneNumber}`).toPromise();
  }
  getCustomer(params?: any): Promise<IReqApi<ICustomer[]>> {
    return new Promise<IReqApi<ICustomer[]>>((resolve, reject) => {
      this.baseRequestService.get(`${this.url}`, params).subscribe(
        (result) => {
          return resolve(result);
        },
        (err) => reject(err)
      );
    });
  }
  createCustomer(body: any): Promise<IReqApi<ICustomer[]>> {
    return new Promise<IReqApi<ICustomer[]>>((resolve, reject) => {
      this.checkDuplicateEmail(body.email)
      .then(exists =>{
        if(exists){
      this.notification.error("email đã tồn tại");
        }else{

          this.checkDuplicatePhoneNumber(body.soDienThoai)
          .then(existsPhoneNumber =>{
            if(existsPhoneNumber){
              this.notification.error('Số điện thoại đã tồn tại');
            }else{
              this.baseRequestService.post(`${this.url}`, body).subscribe(
                (result) => {
                  return resolve(result);
                },
                (err) => reject(err)
              );
            }
          }).catch((err) => reject(err));


        }
      }).catch((err) => reject(err));

    });
  }
  updateCustomer(body: any, id?: any): Promise<IReqApi<ICustomer[]>> {
    return new Promise<IReqApi<ICustomer[]>>((resolve, reject) => {
      this.baseRequestService.put(`${this.url}/${id}`, body).subscribe(
        (result) => {
          return resolve(result);
        },
        (err) => reject(err)
      );
    });
  }
  deleteCustomer(id: any): Promise<IReqApi<ICustomer[]>> {
    return new Promise<IReqApi<ICustomer[]>>((resolve, reject) => {
      this.baseRequestService.delete(`${this.url}/${id}`).subscribe(
        (result) => {},
        (err) => reject(err)
      );
    });
  }
}
