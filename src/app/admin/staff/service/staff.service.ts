import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IReqApi } from 'src/libs/common/interface/interfaces';
import { IStaff } from './staff.module';
import { BaseRequestService } from '../../../../libs/service/request/base-request.service';
import { IPosition } from './position.module';
import { ToastrService } from 'ngx-toastr';


@Injectable({
    providedIn: 'root',
})
export class StaffService {
    url: string = 'staff';
    urlPosition = 'position';

    constructor(private baseRequestService: BaseRequestService,private notification: ToastrService,private http: HttpClient,) { }

    checkDuplicateEmail(email: string): Promise<boolean> {
      return this.baseRequestService.get(`${this.url}/checkEmailExists/${email}`).toPromise();
    }

    checkDuplicatePhoneNumber(phoneNumber: string): Promise<boolean> {
      return this.baseRequestService.get(`${this.url}/checkPhoneNumberExists/${phoneNumber}`).toPromise();
    }

    getStaff(params?: any): Promise<IReqApi<IStaff>> {
        return new Promise<IReqApi<IStaff>>((resolve, reject) => {
            this.baseRequestService.get(`${this.url}`, params).subscribe(
                (result) => {
                    return resolve(result);
                },
                (err) => reject(err)
            );
        });
    }

    getNhanVien(params?: any): Promise<IReqApi<IStaff[]>> {
        return this.baseRequestService.get(`${this.url}`, params).toPromise();
    }




    createStaff(body: any): Promise<IReqApi<IStaff[]>> {
        return new Promise<IReqApi<IStaff[]>>((resolve, reject) => {
          this.checkDuplicateEmail(body.email)
          .then(exists =>{
            if(exists){
                this.notification.error('email đã tồn tại');
            }else{

                  this.checkDuplicatePhoneNumber(body.soDienThoai)
                  .then(existsPhoneNumber =>{
                      if(existsPhoneNumber){
                          this.notification.error('Số điện thoại trùng');
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
    updateStaff(body: any, id?: any): Promise<IReqApi<IStaff[]>> {
        return new Promise<IReqApi<IStaff[]>>((resolve, reject) => {
            this.checkDuplicateEmail(body.email)
            .then(exists =>{
              if(exists){
                this.notification.error('email đã tồn tại');

              }else{
                    this.checkDuplicatePhoneNumber(body.soDienThoai)
                    .then(existsPhoneNumber =>{
                      if(existsPhoneNumber){
                        this.notification.error('Số điện thoại đã trùng');
                      }else{
                        this.baseRequestService.put(`${this.url}/${id}`, body).subscribe(
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
    deleteStaff(id: any): Promise<IReqApi<IStaff[]>> {
        return new Promise<IReqApi<IStaff[]>>((resolve, reject) => {
            this.baseRequestService.delete(`${this.url}/${id}`).subscribe(
                (result) => { },
                (err) => reject(err)
            );
        });
    }
}
