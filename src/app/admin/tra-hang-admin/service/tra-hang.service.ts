import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { IReqApi } from 'src/libs/common/interface/interfaces';
import { BaseRequestAbstractService } from 'src/libs/service/request/abstract-api.service';
import { BaseRequestService } from 'src/libs/service/request/base-request.service';
@Injectable({ providedIn: 'root' })

export class TraHangService {
    constructor(private abstractService: BaseRequestService) { }

    findByMaHoaDon(ma?: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.abstractService.get('invoice/code/' + ma).subscribe(
                (result) => {
                    return resolve(result)
                },
                (err) => reject(err)
            );
        });
    }



    findByIdHDCT(id?: number): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.abstractService.get('invoice/detail/' + id).subscribe(
                (result) => {
                    return resolve(result)
                },
                (err) => reject(err)
            );
        });
    }

    updateTongTien(id?: number): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.abstractService.get('invoice/update-total/' + id).subscribe(
                (result) => {
                    return resolve(result)
                },
                (err) => reject(err)
            );
        });
    }

    findTraHangById(id?: number): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.abstractService.get('return-product/' + id).subscribe(
                (result) => {
                    return resolve(result)
                },
                (err) => reject(err)
            );
        });
    }

    delelteTHCT(id?: number): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.abstractService.delete('return-product/detail/' + id).subscribe(
                (result) => {
                    return resolve(result)
                },
                (err) => reject(err)
            );
        });
    }

    updateQuantityTHCT(id?: number, soLuong?: number): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.abstractService.get(`return-product/detail/${id}/${soLuong}`).subscribe(
                (result) => {
                    return resolve(result);
                },
                (err) => reject(err)
            );
        });
    }

    updateTotalPayments(id?: number, tongTien?: number): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.abstractService.get(`return-product/update-total-payments/${id}/${tongTien}`).subscribe(
                (result) => {
                    return resolve(result);
                },
                (err) => reject(err)
            );
        });
    }

    updateGhiChu(id?: number, ghiChu?: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.abstractService.get(`return-product/update-ghi-chu/${id}/${ghiChu}`).subscribe(
                (result) => {
                    return resolve(result);
                },
                (err) => reject(err)
            );
        });
    }

    updateStatus(id?: number, status?: number): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.abstractService.get(`return-product/update-status/${id}/${status}`).subscribe(
                (result) => {
                    return resolve(result);
                },
                (err) => reject(err)
            );
        });
    }

    addTHCT(body: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.abstractService.post('return-product/detail', body).subscribe(
                (result) => {
                    return resolve(result)
                },
                (err) => reject(err)
            );
        });
    }
    

    findAllByTrangThai(trangThai?: number): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.abstractService.get('return-product/status/' + trangThai).subscribe(
                (result) => {
                    return resolve(result)
                },
                (err) => reject(err)
            );
        });
    }


    huyDon(id?: number): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.abstractService.get('invoice/huy-don/' + id).subscribe(
                (result) => {
                    return resolve(result)
                },
                (err) => reject(err)
            );
        });
    }

    deleteInvoiceDetail(id?: number): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.abstractService.delete('invoice/detail/' + id).subscribe(
                (result) => {
                    return resolve(result)
                },
                (err) => reject(err)
            );
        });
    }

    traHang(body: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.abstractService.post('return-product/shop', body).subscribe(
                (result) => {
                    return resolve(result)
                },
                (err) => reject(err)
            );
        });
    }

    capNhatCTSP(body: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.abstractService.put('return-product/update-quantity', body).subscribe(
                (result) => {
                    return resolve(result)
                },
                (err) => reject(err)
            );
        });
    }

    findTraHangByIdHD(id?: number): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.abstractService.get('return-product/id-invoice/' + id).subscribe(
                (result) => {
                    return resolve(result)
                },
                (err) => reject(err)
            );
        });
    }

    findTraHangByKhachHang(id?: number): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.abstractService.get('return-product/id-customer').subscribe(
                (result) => {
                    return resolve(result)
                },
                (err) => reject(err)
            );
        });
    }
}