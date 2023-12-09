import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IHoaDonChiTiet } from './hoadonchitiet.module';
import { BaseRequestService } from '../../../../../libs/service/request/base-request.service';
import { IReqApi } from 'src/libs/common/interface/interfaces';


@Injectable({
    providedIn: 'root',
})
export class HDChiTiet {
    url: string = 'invoice';

    constructor(
        private BaseRequestService: BaseRequestService,
        private httpClient: HttpClient,
    ) { }
    // thêm ctsp vào hđct
    getHDCT(params?: any): Promise<IReqApi<IHoaDonChiTiet>> {
        return new Promise<IReqApi<IHoaDonChiTiet>>((resolve, reject) => {
            this.BaseRequestService.get(`${this.url}`, params).subscribe(
                (result) => {
                    return resolve(result);
                },
                (err) => reject(err)
            );
        });
    }

    updateSoLuong(idHDCT: number, soLuongMoi: number): Promise<IHoaDonChiTiet> {
        // const url = `${this.url};

        return this.BaseRequestService.put(`${this.url}/shop/update-invoice-detail/${idHDCT}`, { soLuong: soLuongMoi })
            .toPromise()
            .then(updatedChiTiet => {
                if (updatedChiTiet !== undefined) {
                    return updatedChiTiet;
                } else {
                    throw new Error('Dữ liệu trả về từ API là undefined.');
                }
            });
    }




    // updateSoLuong(id: number, soLuong: number): Promise<IHoaDonChiTiet> {
    //     const params = { id: id.toString(), soLuong: soLuong.toString() };

    //     return new Promise<IHoaDonChiTiet>((resolve, reject) => {
    //         this.httpClient.put<IHoaDonChiTiet>(`${this.url}/shop/update-invoice-detail`, { params })
    //             .subscribe(
    //                 updatedChiTiet => resolve(updatedChiTiet),
    //                 error => reject(error)
    //             );
    //     });
    // }

    addCtsp(body?: any): Promise<IReqApi<IHoaDonChiTiet>> {
        return this.BaseRequestService.post(`${this.url}/shop/add-product`, body)
            .toPromise()
            .then((result: IReqApi<IHoaDonChiTiet>) => result)
            .catch((error) => Promise.reject(error));
    }


    deleteHdct(id: number): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.BaseRequestService.delete(`${this.url}/shop/delete-invoice-detail/${id}`).subscribe(
                () => {
                    // Gọi hàm resolve khi xóa thành công
                    resolve();
                },
                (err) => {
                    // Gọi hàm reject khi có lỗi xảy ra
                    reject(err);
                }
            );
        });
    }


    createHdct(body: any): Promise<IReqApi<IHoaDonChiTiet>> {
        return new Promise<IReqApi<IHoaDonChiTiet>>((resolve, reject) => {
            this.BaseRequestService.post(`${this.url}`, body).subscribe(
                (result) => {
                    return resolve(result);
                },
                (err) => reject(err)
            );
        });
    }

    updateHdtc(body: any, id?: any): Promise<IReqApi<IHoaDonChiTiet>> {
        return new Promise<IReqApi<IHoaDonChiTiet>>((resolve, reject) => {
            this.BaseRequestService.put(`${this.url}/${id}`, body).subscribe(
                (result) => {
                    return resolve(result);
                },
                (err) => reject(err)
            );
        });
    }

    // deleteHdct(id: any): Promise<IReqApi<IHoaDonChiTiet>> {
    //     return new Promise<IReqApi<IHoaDonChiTiet>>((resolve, reject) => {
    //         this.BaseRequestService.delete(`${this.url}/${id}`).subscribe(
    //             (result) => {
    //             },
    //             (err) => reject(err)
    //         );
    //     });
    // }


}
