import { Injectable } from '@angular/core';
import { BaseRequestService } from 'src/libs/service/request/base-request.service';

@Injectable({ providedIn: 'root' })
export class DashboardService {
    constructor(
        private baseRequestService: BaseRequestService
    ) { }

    getStat(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.baseRequestService.get('statistic/invoice').subscribe(
                (result: any) => {
                    return resolve(result);
                },
                (err) => reject(err)
            )
        })
    }

    getDataForAboutDate(params: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.baseRequestService.get('statistic/revenue', params).subscribe(
                (result: any) => {
                    return resolve(result);
                },
                (err) => reject(err)
            )
        })
    }

    doanhThu7day(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.baseRequestService.get('statistic/revenue/last-seven-day').subscribe(
                (result: any) => {
                    return resolve(result);
                },
                (err) => reject(err)
            )
        })
    }
    getAllHD(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.baseRequestService.get('invoice').subscribe(
                (result: any) => {
                    return resolve(result);
                },
                (err) => reject(err)
            )
        })
    }

    doanhThu28day(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.baseRequestService.get('statistic/revenue/last-one-month').subscribe(
                (result: any) => {
                    return resolve(result);
                },
                (err) => reject(err)
            )
        })
    }
    doanhThu6month(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.baseRequestService.get('statistic/revenue/last-six-month').subscribe(
                (result: any) => {
                    return resolve(result);
                },
                (err) => reject(err)
            )
        })
    }
    doanhThu1year(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.baseRequestService.get('statistic/revenue/last-year').subscribe(
                (result: any) => {
                    return resolve(result);
                },
                (err) => reject(err)
            )
        })
    }
    doanhThuForDate(params?: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.baseRequestService.get('statistic/revenue', params).subscribe(
                (result: any) => {
                    return resolve(result);
                },
                (err) => reject(err)
            )
        })
    }

    productFor7Date(params?: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.baseRequestService.get('statistic/product/last-seven-day', params).subscribe(
                (result: any) => {
                    return resolve(result);
                },
                (err) => reject(err)
            )
        })
    }
    productFor28Date(params?: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.baseRequestService.get('statistic/product/last-one-month', params).subscribe(
                (result: any) => {
                    return resolve(result);
                },
                (err) => reject(err)
            )
        })
    }
    productFor6month(params?: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.baseRequestService.get('statistic/product/last-six-month', params).subscribe(
                (result: any) => {
                    return resolve(result);
                },
                (err) => reject(err)
            )
        })
    }
    productFor1year(params?: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.baseRequestService.get('statistic/product/last-year', params).subscribe(
                (result: any) => {
                    return resolve(result);
                },
                (err) => reject(err)
            )
        })
    }
}