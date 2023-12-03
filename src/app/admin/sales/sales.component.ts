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
import { MatTabChangeEvent } from '@angular/material/tabs';
import { HDChiTiet } from './service/hoadonchitiet/hoadonchitiet.service';
import { IHoaDonChiTiet } from './service/hoadonchitiet/hoadonchitiet.module';
import { NgxScannerQrcodeModule, LOAD_WASM } from 'ngx-scanner-qrcode';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
})

export class SalesComponent implements OnInit {

  ctsps!: any;
  hoadons!: any;
  nhanViens!: any;
  searchQuery: any = {};
  listTotalPage: any = [];

  productCode: any = {};
  searchResults: { [tab: string]: IChiTietSanPham[] } = {};
  selectedTab: string = '';
  errorMessage: string | null = null;
  searchKeywords: { [tab: string]: any } = {};

  // hoaDonChiTiet!: any;
  hoaDonChiTiet: { [tab: string]: IHoaDonChiTiet[] } = {};
  currentHoaDonId: number | undefined = undefined; // Lưu trữ ID hóa đơn hiện tại
  currentHoaDonCode: string = ''; // Lưu trữ mã hóa đơn hiện tại
  newlyAddedItems: any[] = [];
  currentCustomerName: string = 'Khách Lẻ';
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
    private hdctService: HDChiTiet,
    private snackBar: MatSnackBar
  ) {
    this.searchQuery.page = 1;
    this.searchQuery.pageSize = 10;
  }

  showScanner = false;

  toggleScanner() {
    this.showScanner = !this.showScanner;
  }

  tabs: string[] = [];
  maxTabs: number = 5; // Số lượng tab tối đa được phép
  currentInvoiceCodes: string[] = [];

  // tạo 1 tab mới đồng thời tạo hóa đơn mới
  addTab() {
    if (this.tabs.length < this.maxTabs) {
      this.hoadonService.createHoadon({}).then(
        (result: IReqApi<IHoaDon>) => {
          const newInvoice: IHoaDon = result as IHoaDon;
          this.tabs.push(`Tab ${this.tabs.length + 1}`);
          // Kiểm tra giá trị maHoaDon trước khi gán
          if (newInvoice.maHoaDon !== undefined) {
            const newInvoiceCode = newInvoice.maHoaDon;

            if (newInvoice.khachHang === null) {
              this.currentCustomerName = 'Khách Lẻ';
            } else if (newInvoice.khachHang?.hoTen) {
              this.currentCustomerName = newInvoice.khachHang.hoTen;
            }

            this.currentInvoiceCodes.push(newInvoiceCode);
            this.currentHoaDonCode = newInvoiceCode; // Gán giá trị mã hóa đơn
            this.currentHoaDonId = newInvoice.id;// gán giá trị id hóa đơn
            // Gán giá trị mã hóa đơn vào ô input
            this.setInputValue(newInvoiceCode);
            this.searchResults[this.selectedTab] = this.searchResults[this.selectedTab] || [];
            this.hoaDonChiTiet[this.selectedTab] = this.hoaDonChiTiet[this.selectedTab] || [];
          }
        },
        (error) => {
          console.error('Lỗi khi tạo hóa đơn:', error);
          this.toast.error({
            detail: 'Có lỗi xảy ra khi tạo hóa đơn',
            summary: 'Lỗi',
            duration: 3000,
          });
        }
      );
    } else {
      this.toast.error({
        detail: 'False',
        summary: 'Tối đa chỉ được 5 hóa đơn',
        duration: 3000,
      });
    }
  }

  setInputValue(value: string): void {
    // Gán giá trị vào ô input theo ID của input
    const inputElement = document.getElementById('exampleInputHD') as HTMLInputElement;
    if (inputElement) {
      inputElement.value = value;
    }
  }

  searchProductByKeyword() {
    this.ctspService.getctspByKeyword(this.productCode).then(
      (result) => {
        console.log("result " + result)
        if (result) {
          // this.searchResult = result;
          this.searchResults[this.selectedTab] = this.searchResults[this.selectedTab] || [];
          this.searchResults[this.selectedTab].push(result);
          this.searchKeywords[this.selectedTab] = this.productCode;
        }
      },
      (error) => {
      }
    );
  }
  onTabChange(event: MatTabChangeEvent): void {
    this.selectedTab = this.tabs[event.index];
  }

  addToCart(searchResult: IChiTietSanPham): void {
    const hoaDonId = this.currentHoaDonId;
    const chiTietSanPhamId = searchResult.id;
    const soLuong = 1;

    // Kiểm tra xem searchResult và searchResult.soLuong có tồn tại không
    if (searchResult && searchResult.soLuong !== undefined) {
      // Kiểm tra xem số lượng có lớn hơn 0 hay không trước khi giảm
      if (searchResult.soLuong > 0) {
        // Kiểm tra xem searchResult.soLuong có tồn tại không trước khi cộng
        if (searchResult.soLuong !== undefined) {
          searchResult.soLuong -= 1; // Giảm số lượng trực tiếp
        }

        // Kiểm tra kiểu dữ liệu của giaBan
        if (searchResult && typeof searchResult.giaBan === 'number') {
          const donGia = searchResult.giaBan * soLuong;

          const existingItemIndex = this.hoaDonChiTiet[this.selectedTab]?.findIndex(
            (item) => item.chiTietSanPham?.id === chiTietSanPhamId
          );

          const request = {
            idHoaDon: hoaDonId,
            idChiTietSanPham: chiTietSanPhamId,
            soLuong: soLuong,
            donGia: donGia,
          };

          // Nếu sản phẩm chưa có trong hóa đơn chi tiết, thêm mới
          this.hdctService.addCtsp(request)
            .then((result) => {
              // Kiểm tra xem hoaDonChiTiet[selectedTab] có phải là một mảng không, nếu không, khởi tạo nó
              if (!Array.isArray(this.hoaDonChiTiet[this.selectedTab])) {
                this.hoaDonChiTiet[this.selectedTab] = [];
              }
              if (this.isIHoaDonChiTiet(result)) {
                // Thêm vào giỏ hàng
                const existingItem = this.hoaDonChiTiet[this.selectedTab][existingItemIndex];
                if (existingItem) {
                  // Kiểm tra xem existingItem.soLuong có tồn tại không trước khi cộng
                  if (existingItem.soLuong !== undefined) {
                    existingItem.soLuong += soLuong;
                    if (searchResult && typeof searchResult.giaBan === 'number') {
                      existingItem.donGia = searchResult.giaBan * existingItem.soLuong;  // Gán giá trị đơn giá hiển thị
                    }
                  } else {
                    console.error('existingItem.soLuong không tồn tại.');
                  }
                } else {
                  // Nếu chưa có, thêm mới vào giỏ hàng
                  this.hoaDonChiTiet[this.selectedTab].push(result);
                }
                console.log('Sản phẩm đã được thêm vào hóa đơn chi tiết.', result);
              } else {
                console.error('Kết quả không phải là kiểu IHoaDonChiTiet:', result);
              }
            })
            .catch((error) => {
              // Nếu có lỗi, phục hồi số lượng
              if (searchResult.soLuong !== undefined) {
                searchResult.soLuong += 1;
              }
              console.error('Lỗi khi thêm sản phẩm vào hóa đơn chi tiết:', error);
            });
        } else {
          console.log('Số lượng không hợp lệ.');
        }
      } else {
        console.log('Sản phẩm không hợp lệ.');
      }
    }
  }

  // addToCart(searchResult: IChiTietSanPham): void {
  //   const hoaDonId = this.currentHoaDonId;
  //   const chiTietSanPhamId = searchResult.id;
  //   const soLuong = 1;
  //   const donGia = (searchResult && searchResult.giaBan) ? searchResult.giaBan * soLuong : 0;
  //   console.log("hoaDonId " + hoaDonId + "chiTietSanPhamId " + chiTietSanPhamId);

  //   // Kiểm tra xem searchResult và searchResult.soLuong có tồn tại không
  //   if (searchResult && searchResult.soLuong !== undefined) {
  //     // Kiểm tra xem số lượng có lớn hơn 0 hay không trước khi giảm
  //     if (searchResult.soLuong > 0) {
  //       // Kiểm tra xem searchResult.soLuong có tồn tại không trước khi cộng
  //       if (searchResult.soLuong !== undefined) {
  //         searchResult.soLuong -= 1; // Giảm số lượng trực tiếp
  //       }

  //       const existingItemIndex = this.hoaDonChiTiet[this.selectedTab]?.findIndex(
  //         (item) => item.chiTietSanPham?.id === chiTietSanPhamId
  //       );

  //       const request = {
  //         idHoaDon: hoaDonId,
  //         idChiTietSanPham: chiTietSanPhamId,
  //         soLuong: soLuong,
  //         donGia: donGia,
  //       };

  //       this.hdctService.addCtsp(request)
  //         .then((result) => {
  //           if (!Array.isArray(this.hoaDonChiTiet[this.selectedTab])) {
  //             this.hoaDonChiTiet[this.selectedTab] = [];
  //           }
  //           if (this.isIHoaDonChiTiet(result)) {
  //             // Thêm vào giỏ hàng
  //             this.hoaDonChiTiet[this.selectedTab].push(result);
  //             console.log('Sản phẩm đã được thêm vào hóa đơn chi tiết.', result);
  //           } else {
  //             console.error('Kết quả không phải là kiểu IHoaDonChiTiet:', result);
  //           }
  //         })
  //         .catch((error) => {
  //           // Nếu có lỗi, phục hồi số lượng
  //           if (searchResult.soLuong !== undefined) {
  //             searchResult.soLuong -= 1;
  //           }
  //           console.error('Lỗi khi thêm sản phẩm vào hóa đơn chi tiết:', error);
  //         });
  //     } else {
  //       console.log('Số lượng không hợp lệ.');
  //     }
  //   } else {
  //     console.log('Sản phẩm không hợp lệ.');
  //   }
  // }

  isIHoaDonChiTiet(obj: any): obj is IHoaDonChiTiet {
    return obj && typeof obj === 'object' && 'chiTietSanPham' in obj;
  }

  // removeItemFromInvoice(chiTietId: number | undefined): void {
  //   if (chiTietId !== undefined) {
  //     this.hdctService.deleteHdct(chiTietId).then(
  //       () => {
  //         // Xóa thành công, cập nhật lại danh sách
  //         this.hoaDonChiTiet[this.selectedTab] = this.hoaDonChiTiet[this.selectedTab].filter(
  //           (chiTiet) => chiTiet.id !== chiTietId
  //         );
  //         // Thực hiện các bước cập nhật UI khác nếu cần
  //       },
  //       (error) => {
  //         console.error('Lỗi khi xóa hóa đơn chi tiết:', error);
  //       }
  //     );
  //   } else {
  //     console.error('ID của chi tiết không được phép là undefined.');
  //   }
  // }


  // removeItemFromInvoice(chiTietId: number | undefined): void {
  //   if (chiTietId !== undefined) {
  //     // Trước khi xóa, lấy thông tin chi tiết để biết số lượng
  //     const chiTietToRemove = this.hoaDonChiTiet[this.selectedTab].find(
  //       (chiTiet) => chiTiet.id === chiTietId
  //     );
  //     // Gọi hàm xóa hóa đơn chi tiết từ service
  //     this.hdctService.deleteHdct(chiTietId).then(
  //       () => {
  //         // Xóa thành công, cập nhật lại danh sách
  //         this.hoaDonChiTiet[this.selectedTab] = this.hoaDonChiTiet[this.selectedTab].filter(
  //           (chiTiet) => chiTiet.id !== chiTietId
  //         );
  //         // Kiểm tra và cập nhật số lượng sản phẩm
  //         if (chiTietToRemove) {
  //           const chiTietSanPham = chiTietToRemove.chiTietSanPham;
  //           if (chiTietSanPham) {
  //             // Cộng lại số lượng vào chi tiết sản phẩm
  //             chiTietSanPham.soLuong += chiTietToRemove.soLuong;
  //             // Gọi hàm cập nhật số lượng trong bảng chi tiết sản phẩm trên view
  //             this.updateSoLuongInTable(chiTietSanPham.id, chiTietSanPham.soLuong);
  //           }
  //         }
  //       },
  //       (error) => {
  //         console.error('Lỗi khi xóa hóa đơn chi tiết:', error);
  //       }
  //     );
  //   } else {
  //     console.error('ID của chi tiết không được phép là undefined.');
  //   }
  // }

  // Trong component.ts

  removeItemFromInvoice(chiTietId: number | undefined): void {
    if (chiTietId !== undefined) {
      // Trước khi xóa, lấy thông tin chi tiết để biết số lượng
      const chiTietToRemove = this.hoaDonChiTiet[this.selectedTab].find(
        (chiTiet) => chiTiet.id === chiTietId
      );
      // Gọi hàm xóa hóa đơn chi tiết từ service
      this.hdctService.deleteHdct(chiTietId).then(
        () => {
          // Xóa thành công, cập nhật lại danh sách
          this.hoaDonChiTiet[this.selectedTab] = this.hoaDonChiTiet[this.selectedTab].filter(
            (chiTiet) => chiTiet.id !== chiTietId
          );
          // Kiểm tra và cập nhật số lượng sản phẩm
          if (chiTietToRemove) {
            const chiTietSanPham = chiTietToRemove.chiTietSanPham;
            if (chiTietSanPham) {
              // Cộng lại số lượng vào chi tiết sản phẩm
              chiTietSanPham.soLuong += chiTietToRemove.soLuong;
              // Gọi hàm cập nhật số lượng trong bảng chi tiết sản phẩm trên view
              this.updateSoLuongInTable(chiTietSanPham.id, chiTietSanPham.soLuong);
            }
          }
        },
        (error) => {
          console.error('Lỗi khi xóa hóa đơn chi tiết:', error);
        }
      );
    } else {
      console.error('ID của chi tiết không được phép là undefined.');
    }
  }

  // Hàm cập nhật số lượng
  updateSoLuong(chiTiet: IHoaDonChiTiet, soLuong: number): void {
    // Giả sử chiTiet là một đối tượng có thuộc tính id và soLuong
    if (chiTiet && chiTiet.id !== undefined) {
      // Kiểm tra xem chiTiet.id có tồn tại và không phải là undefined
      this.hdctService.updateSoLuong(chiTiet.id, soLuong)
        .then((updatedChiTiet) => {
          // Xử lý kết quả sau khi cập nhật thành công
          console.log('Số lượng đã được cập nhật:', updatedChiTiet);
          // Cập nhật số lượng trên view hoặc thực hiện các bước cần thiết khác
        })
        .catch((error) => {
          // Xử lý lỗi khi cập nhật không thành công
          console.error('Lỗi khi cập nhật số lượng:', error);
        });
    } else {
      console.error('ID của chi tiết không hợp lệ hoặc không tồn tại.');
    }

  }

  updateSoLuongInTable(chiTietSanPhamId: number, soLuong: number): void {
    // Tìm và cập nhật số lượng trong bảng chi tiết sản phẩm trên view
    const chiTietIndex = this.hoaDonChiTiet[this.selectedTab].findIndex(
      (chiTiet) => chiTiet.chiTietSanPham?.id === chiTietSanPhamId
    );

    if (chiTietIndex !== -1) {
      this.hoaDonChiTiet[this.selectedTab][chiTietIndex].chiTietSanPham.soLuong = soLuong;
    }
  }

  removeTab(tab: string) {
    const tabIndex = this.tabs.indexOf(tab);
    if (tabIndex !== -1) {
      this.tabs.splice(tabIndex, 1);
    }
  }
  // removeItemFromInvoice(chiTietId: number | undefined): void {
  //   if (chiTietId !== undefined) {
  //     // Trước khi xóa, lấy thông tin chi tiết để biết số lượng
  //     const chiTietToRemove = this.hoaDonChiTiet[this.selectedTab].find(
  //       (chiTiet) => chiTiet.id === chiTietId
  //     );

  //     // Gọi hàm xóa hóa đơn chi tiết từ service
  //     this.hdctService.deleteHdct(chiTietId).then(
  //       () => {
  //         // Xóa thành công, cập nhật lại danh sách
  //         this.hoaDonChiTiet[this.selectedTab] = this.hoaDonChiTiet[this.selectedTab].filter(
  //           (chiTiet) => chiTiet.id !== chiTietId
  //         );

  //         // Kiểm tra và cập nhật số lượng sản phẩm
  //         if (chiTietToRemove) {
  //           const chiTietSanPham = chiTietToRemove.chiTietSanPham;
  //           if (chiTietSanPham) {
  //             chiTietSanPham.soLuong += chiTietToRemove.soLuong;
  //             // Gọi hàm cập nhật số lượng sản phẩm từ service nếu cần
  //             // this.ctspService.updateSoLuong(chiTietSanPham.id, chiTietSanPham.soLuong);
  //           }
  //         }
  //       },
  //       (error) => {
  //         console.error('Lỗi khi xóa hóa đơn chi tiết:', error);
  //       }
  //     );
  //   } else {
  //     console.error('ID của chi tiết không được phép là undefined.');
  //   }
  // }

  // addTab() {
  //   if (this.tabs.length < this.maxTabs) {
  //     const newTab = `Tab ${this.tabs.length + 1}`;
  //     this.tabs.push(newTab);
  //   } else {
  //     this.toast.error({ detail: "False", summary: "Tối đa chỉ được 5 hóa đơn", duration: 3000 })
  //   }
  // }


  // searchProductByKeyword() {
  //   this.ctspService.getctspByKeyword(this.productCode).then(
  //     (result) => {
  //       console.log("result " + result)
  //       if (result) {
  //         this.searchResult = result;
  //       } else {
  //         this.searchResult = null;
  //       }
  //     },
  //     (error) => {
  //       this.searchResult = null;
  //     }
  //   );
  // }
  // Kiểm tra xem searchResult có giá trị và searchResult.giaBan có giá trị không


  // addToCart(searchResult: IChiTietSanPham): void {
  //   const hoaDonId = this.currentHoaDonId  // id hóa đơn hiện tại
  //   const chiTietSanPhamId = searchResult.id; // Sử dụng ID của chi tiết sản phẩm từ kết quả tìm kiếm
  //   const soLuong = 1; // Số lượng mặc định là 1 
  //   const donGia = (searchResult && searchResult.giaBan) ? searchResult.giaBan * soLuong : 0;
  //   console.log("hoaDonId " + hoaDonId + "chiTietSanPhamId " + chiTietSanPhamId);

  //   const existingItemIndex = this.hoaDonChiTiet[this.selectedTab]?.findIndex(
  //     (item) => item.chiTietSanPham?.id === chiTietSanPhamId
  //   );

  //   const request = {
  //     idHoaDon: hoaDonId,
  //     idChiTietSanPham: chiTietSanPhamId,
  //     soLuong: soLuong,
  //     donGia: donGia,
  //   };

  //   this.hdctService.addCtsp(request)
  //     .then((result) => {
  //       if (!Array.isArray(this.hoaDonChiTiet[this.selectedTab])) {
  //         this.hoaDonChiTiet[this.selectedTab] = [];
  //       }
  //       if (this.isIHoaDonChiTiet(result)) {
  //         // Thêm vào giỏ hàng
  //         this.hoaDonChiTiet[this.selectedTab].push(result);
  //         console.log('Sản phẩm đã được thêm vào hóa đơn chi tiết.', result);
  //       } else {
  //         console.error('Kết quả không phải là kiểu IHoaDonChiTiet:', result);
  //       }
  //     })
  //     .catch((error) => {
  //       // Xử lý lỗi nếu cần
  //       console.error('Lỗi khi thêm sản phẩm vào hóa đơn chi tiết:', error);
  //     });
  // }

  // removeItemFromInvoice(chiTietId: number | undefined): void {
  //   // Kiểm tra nếu chiTietId không phải là undefined mới tiếp tục
  //   if (chiTietId !== undefined) {
  //     // Gọi hàm xóa hóa đơn chi tiết từ service
  //     this.hdctService.deleteHdct(chiTietId).then(
  //       () => {
  //         // Xóa thành công, cập nhật lại danh sách hoặc thực hiện các thao tác khác nếu cần
  //         this.hoaDonChiTiet[this.selectedTab] = this.hoaDonChiTiet[this.selectedTab].filter(
  //           (chiTiet) => chiTiet.id !== chiTietId
  //         );
  //       },
  //       (error) => {
  //         // Xử lý lỗi nếu cần
  //         console.error('Lỗi khi xóa hóa đơn chi tiết:', error);
  //       }
  //     );
  //   } else {
  //     // Xử lý trường hợp khi chiTietId là undefined
  //     console.error('ID của chi tiết không được phép là undefined.');
  //   }
  // }
}
