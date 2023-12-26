import { Injectable } from '@angular/core';
import { BaseRequestService } from 'src/libs/service/request/base-request.service';

@Injectable({ providedIn: 'root' })
export class DashboardService {
    constructor(
        private baseRequestService: BaseRequestService
    ) { }

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
    doanhThuForDate(params: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.baseRequestService.get('statistic/revenue', params).subscribe(
                (result: any) => {
                    return resolve(result);
                },
                (err) => reject(err)
            )
        })
    }
}