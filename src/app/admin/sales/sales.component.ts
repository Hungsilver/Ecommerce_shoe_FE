import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { NgToastService } from 'ng-angular-popup';
import { MatDividerModule } from '@angular/material/divider';
import { CTSPService } from '../sales/service/ctsp/ctsp.service';
import { HoaDonService } from './service/hoadon/hoadon.service';
import { StaffService } from '../staff/service/staff.service';
import { IHoaDon } from './service/hoadon/hoadon.module';
import { IReqApi } from 'src/libs/common/interface/interfaces';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { IChiTietSanPham } from './service/ctsp/ctsp.module';
import { of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject, from } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

export interface PeriodicElement {

  name: string;
  position: number;
  weight: number;
  symbol: string;

}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
];


@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
})

export class SalesComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  ctsps!: any;
  hoadons!: any;
  nhanViens!: any;
  searchQuery: any = {};
  listTotalPage: any = [];

  productCode: any = {};
  searchResult: IChiTietSanPham | null = null;
  errorMessage: string | null = null;

  ngOnInit(): void {
  }
  onPageChange() {
  }

  iconSortName = 'pi pi-sort-amount-up';
  constructor(
    private toast: NgToastService,
    private ctspService: CTSPService,
    private hoadonService: HoaDonService,
    private nhanVienService: StaffService,

  ) {
    this.searchQuery.page = 1;
    this.searchQuery.pageSize = 10;
  }

  searchProductByKeyword() {
    this.ctspService.getctspByKeyword(this.productCode).then(
      (result) => {
        console.log("result " + result)
        if (result) {
          this.searchResult = result;
          this.errorMessage = null;
        } else {
          this.searchResult = null;
          this.errorMessage = 'Sản phẩm không tồn tại';
        }
      },
      (error) => {
        this.searchResult = null;
        this.errorMessage = 'Đã xảy ra lỗi khi tìm kiếm sản phẩm';
      }
    );
  }




  // searchProduct() {
  //   this.ctspService.getCtsp({ ma: this.productCode }).then(
  //     (result) => {
  //       if (result.data) {
  //         this.searchResult = result.data; // Sử dụng dữ liệu trực tiếp
  //         this.errorMessage = null;
  //       } else {
  //         this.searchResult = null;
  //         this.errorMessage = 'Sản phẩm không tồn tại';
  //       }
  //     },
  //     (error) => {
  //       this.searchResult = null;
  //       this.errorMessage = 'Đã xảy ra lỗi khi tìm kiếm sản phẩm';
  //     }
  //   );
  // }


  tabs: string[] = [];
  maxTabs: number = 5; // Số lượng tab tối đa được phép
  currentInvoiceCodes: string[] = [];

  //////////////////////////////////////////////////////////////////

  // addTab() {
  //   if (this.tabs.length < this.maxTabs) {
  //     this.hoadonService.createHoadon({}).then(
  //       (result: IReqApi<IHoaDon>) => {
  //         const newInvoice: IHoaDon = result as IHoaDon;
  //         this.tabs.push(`Tab ${this.tabs.length + 1}`);
  //         // Kiểm tra giá trị maHoaDon trước khi gán
  //         if (newInvoice.maHoaDon !== undefined) {
  //           const newInvoiceCode = newInvoice.maHoaDon;
  //           this.currentInvoiceCodes.push(newInvoiceCode);
  //           // Gán giá trị mã hóa đơn vào ô input
  //           this.setInputValue(newInvoiceCode);
  //         }
  //       },
  //       (error) => {
  //         console.error('Lỗi khi tạo hóa đơn:', error);
  //         this.toast.error({
  //           detail: 'Có lỗi xảy ra khi tạo hóa đơn',
  //           summary: 'Lỗi',
  //           duration: 3000,
  //         });
  //       }
  //     );
  //   } else {
  //     this.toast.error({
  //       detail: 'False',
  //       summary: 'Tối đa chỉ được 5 hóa đơn',
  //       duration: 3000,
  //     });
  //   }
  // }

  setInputValue(value: string): void {
    // Gán giá trị vào ô input theo ID của input
    // const inputElement = document.getElementById('exampleInputHD') as HTMLInputElement;
    // if (inputElement) {
    //   inputElement.value = value;
    // }
  }

  removeTab(tab: string) {
    const tabIndex = this.tabs.indexOf(tab);
    if (tabIndex !== -1) {
      this.tabs.splice(tabIndex, 1);
    }
  }

  searchChiTietSanPham(): void {
    // this.getAll();
  }

  addTab() {
    if (this.tabs.length < this.maxTabs) {
      const newTab = `Tab ${this.tabs.length + 1}`;
      this.tabs.push(newTab);
    } else {
      this.toast.error({ detail: "False", summary: "Tối đa chỉ được 5 hóa đơn", duration: 3000 })
    }
  }


  getAll(action?: 'prev' | 'next'): void {
    if (action) {
      if (action === 'prev' && Number(this.searchQuery.page) > 1) {
        this.searchQuery.page = this.searchQuery.page - 1
      }
      if (action === 'next' &&
        Number(this.searchQuery.page) + 1 <= this.listTotalPage.length) {
        this.searchQuery.page = this.searchQuery.page + 1
      }
      Object.keys(this.searchQuery).forEach(key => {
        if (this.searchQuery[key] === null || this.searchQuery[key] === '') {
          delete this.searchQuery[key];
        }
      });
    }
    this.ctspService.getCtsp(this.searchQuery).then(ctsp => {
      if (ctsp && ctsp.content) {
        this.ctsps = ctsp.content;
        this.listTotalPage = this.getTotalPage(ctsp.totalPages)
        console.log(ctsp)
      }

    })
    console.log(this.searchQuery)
  }


  getTotalPage(totalPages: number) {
    let listTotalPage = []

    for (let i = 1; i <= totalPages; i++) {
      listTotalPage.push(i);
    }
    return listTotalPage;
  }


}
