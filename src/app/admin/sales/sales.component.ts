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
import { IStaff } from '../staff/service/staff.module';
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
  id?: number;
  newSoLuong: number = 1;
  staffName: string = '';
  totalAmount: number = 0;
  money: number | undefined;
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
            this.staffName = newInvoice.nhanVien.hoTen;

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

  // Hàm được gọi khi thêm chi tiết sản phẩm vào hóa đơn chi tiết
  addToCart(searchResult: IChiTietSanPham): void {
    const hoaDonId = this.currentHoaDonId;
    const chiTietSanPhamId = searchResult.id;
    const soLuong = 1;
    // Kiểm tra xem searchResult và searchResult.soLuong có tồn tại không
    this.money = searchResult.giaBan;


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

          // Cập nhật tổng giá trị sau khi thêm chi tiết sản phẩm vào hóa đơn chi tiết
          this.totalAmount += donGia;

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
                      existingItem.donGia = searchResult.giaBan * existingItem.soLuong;
                      // this.totalAmount += existingItem.donGia;
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

  //   // Kiểm tra xem searchResult và searchResult.soLuong có tồn tại không
  //   if (searchResult && searchResult.soLuong !== undefined) {
  //     // Kiểm tra xem số lượng có lớn hơn 0 hay không trước khi giảm
  //     if (searchResult.soLuong > 0) {
  //       // Kiểm tra xem searchResult.soLuong có tồn tại không trước khi cộng
  //       if (searchResult.soLuong !== undefined) {
  //         searchResult.soLuong -= 1; // Giảm số lượng trực tiếp
  //       }

  //       // Kiểm tra kiểu dữ liệu của giaBan
  //       if (searchResult && typeof searchResult.giaBan === 'number') {
  //         const donGia = searchResult.giaBan * soLuong;

  //         const existingItemIndex = this.hoaDonChiTiet[this.selectedTab]?.findIndex(
  //           (item) => item.chiTietSanPham?.id === chiTietSanPhamId
  //         );

  //         const request = {
  //           idHoaDon: hoaDonId,
  //           idChiTietSanPham: chiTietSanPhamId,
  //           soLuong: soLuong,
  //           donGia: donGia,
  //         };

  //         // Nếu sản phẩm chưa có trong hóa đơn chi tiết, thêm mới
  //         this.hdctService.addCtsp(request)
  //           .then((result) => {
  //             // Kiểm tra xem hoaDonChiTiet[selectedTab] có phải là một mảng không, nếu không, khởi tạo nó
  //             if (!Array.isArray(this.hoaDonChiTiet[this.selectedTab])) {
  //               this.hoaDonChiTiet[this.selectedTab] = [];
  //             }
  //             if (this.isIHoaDonChiTiet(result)) {
  //               // Thêm vào giỏ hàng
  //               const existingItem = this.hoaDonChiTiet[this.selectedTab][existingItemIndex];
  //               if (existingItem) {
  //                 // Kiểm tra xem existingItem.soLuong có tồn tại không trước khi cộng
  //                 if (existingItem.soLuong !== undefined) {
  //                   existingItem.soLuong += soLuong;
  //                   if (searchResult && typeof searchResult.giaBan === 'number') {
  //                     existingItem.donGia = searchResult.giaBan * existingItem.soLuong;
  //                   }
  //                 } else {
  //                   console.error('existingItem.soLuong không tồn tại.');
  //                 }
  //               } else {
  //                 // Nếu chưa có, thêm mới vào giỏ hàng
  //                 this.hoaDonChiTiet[this.selectedTab].push(result);
  //               }
  //               console.log('Sản phẩm đã được thêm vào hóa đơn chi tiết.', result);
  //             } else {
  //               console.error('Kết quả không phải là kiểu IHoaDonChiTiet:', result);
  //             }
  //           })
  //           .catch((error) => {
  //             // Nếu có lỗi, phục hồi số lượng
  //             if (searchResult.soLuong !== undefined) {
  //               searchResult.soLuong += 1;
  //             }
  //             console.error('Lỗi khi thêm sản phẩm vào hóa đơn chi tiết:', error);
  //           });
  //       } else {
  //         console.log('Số lượng không hợp lệ.');
  //       }
  //     } else {
  //       console.log('Sản phẩm không hợp lệ.');
  //     }
  //   }
  // }

  isIHoaDonChiTiet(obj: any): obj is IHoaDonChiTiet {
    return obj && typeof obj === 'object' && 'chiTietSanPham' in obj;
  }


  removeItemFromInvoice(chiTietId: number | undefined): void {
    if (chiTietId !== undefined) {
      // Trước khi xóa, lấy thông tin chi tiết để biết số lượng và đơn giá
      const chiTietToRemove = this.hoaDonChiTiet[this.selectedTab].find(
        (chiTiet) => chiTiet.id === chiTietId
      );

      if (chiTietToRemove) {
        const soLuongToRemove = chiTietToRemove.soLuong || 0;
        const donGiaToRemove = chiTietToRemove.donGia || 0;

        // Gọi hàm xóa hóa đơn chi tiết từ service
        this.hdctService.deleteHdct(chiTietId).then(
          () => {
            // Xóa thành công, cập nhật lại danh sách
            this.hoaDonChiTiet[this.selectedTab] = this.hoaDonChiTiet[this.selectedTab].filter(
              (chiTiet) => chiTiet.id !== chiTietId
            );

            // Trừ tổng tiền sản phẩm theo số lượng và đơn giá của chi tiết đã bị xóa
            this.totalAmount -= donGiaToRemove;

            console.log("don gia " + this.totalAmount);
            // Kiểm tra và cập nhật số lượng sản phẩm
            const chiTietSanPham = chiTietToRemove.chiTietSanPham;
            if (chiTietSanPham) {
              // Tìm chi tiết sản phẩm tương ứng trong mảng searchResults
              const chiTietSanPhamIndex = this.searchResults[this.selectedTab].findIndex(
                (item) => item.id === chiTietSanPham.id
              );

              // Cộng lại số lượng vào chi tiết sản phẩm
              if (chiTietSanPhamIndex !== -1 && this.searchResults[this.selectedTab][chiTietSanPhamIndex] !== undefined) {
                const chiTietSanPhamItem = this.searchResults[this.selectedTab][chiTietSanPhamIndex];
                if (chiTietSanPhamItem.soLuong !== undefined) {
                  chiTietSanPhamItem.soLuong += soLuongToRemove;

                  // Gọi hàm cập nhật số lượng trong bảng chi tiết sản phẩm trên view
                  this.updateSoLuongInTable(chiTietSanPham.id, chiTietSanPhamItem.soLuong);
                } else {
                  console.error('Số lượng của chi tiết sản phẩm không xác định.');
                }
              }
            }
          },
          (error) => {
            console.error('Lỗi khi xóa hóa đơn chi tiết:', error);
          }
        );
      } else {
        console.error('Không tìm thấy chi tiết hóa đơn để xóa.');
      }
    } else {
      console.error('ID của chi tiết không được phép là undefined.');
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
  //             // Tìm chi tiết sản phẩm tương ứng trong mảng searchResults
  //             const chiTietSanPhamIndex = this.searchResults[this.selectedTab].findIndex(
  //               (item) => item.id === chiTietSanPham.id
  //             );
  //             // Cộng lại số lượng vào chi tiết sản phẩm
  //             if (chiTietSanPhamIndex !== -1 && this.searchResults[this.selectedTab][chiTietSanPhamIndex] !== undefined) {
  //               const chiTietSanPhamItem = this.searchResults[this.selectedTab][chiTietSanPhamIndex];
  //               if (chiTietSanPhamItem.soLuong !== undefined && chiTietToRemove.soLuong !== undefined) {
  //                 chiTietSanPhamItem.soLuong += chiTietToRemove.soLuong;
  //                 // Gọi hàm cập nhật số lượng trong bảng chi tiết sản phẩm trên view
  //                 this.updateSoLuongInTable(chiTietSanPham.id, chiTietSanPhamItem.soLuong);
  //               } else {
  //                 console.error('Số lượng của chi tiết sản phẩm hoặc chi tiết để xóa không xác định.');
  //               }

  //             }
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

  // Hàm được gọi khi giá trị trong ô input thay đổi
  onUpdate(chiTiet: IHoaDonChiTiet): void {
    // Kiểm tra xem chiTiet có giá trị không
    if (chiTiet && chiTiet.id !== undefined && chiTiet.soLuong !== undefined) {
      const oldSoLuong = chiTiet.soLuong; // Lưu trữ giá trị số lượng cũ

      this.hdctService.updateSoLuong(chiTiet.id, this.newSoLuong)
        .then(updatedChiTiet => {
          console.log('Updated Chi Tiet:', updatedChiTiet);

          // Lấy chi tiết sản phẩm từ hóa đơn chi tiết
          const chiTietSanPham = chiTiet.chiTietSanPham;

          // Kiểm tra xem chiTietSanPham có giá trị không
          if (chiTietSanPham) {
            // Cập nhật số lượng trong chi tiết sản phẩm
            chiTietSanPham.soLuong -= (this.newSoLuong - oldSoLuong);

            // Gọi hàm cập nhật số lượng trong chi tiết sản phẩm trên view
            this.updateSoLuongInTable(chiTietSanPham.id, chiTietSanPham.soLuong);
          }
        })
        .catch(error => {
          console.error('Lỗi khi cập nhật:', error);
        });
    } else {
      console.error('ID hoặc số lượng của chi tiết không được phép là undefined.');
    }
  }

  updateSoLuongInTable(chiTietSanPhamId: number, soLuong: number): void {
    // Tìm và cập nhật số lượng trong bảng chi tiết sản phẩm trên view
    const chiTietIndex = this.hoaDonChiTiet[this.selectedTab].findIndex(
      (chiTiet) => chiTiet.chiTietSanPham?.id === chiTietSanPhamId
    );

    if (chiTietIndex !== -1) {
      // Sử dụng cú pháp spread để tạo một bản sao của đối tượng và cập nhật số lượng
      this.hoaDonChiTiet[this.selectedTab][chiTietIndex] = {
        ...this.hoaDonChiTiet[this.selectedTab][chiTietIndex],
        chiTietSanPham: {
          ...this.hoaDonChiTiet[this.selectedTab][chiTietIndex].chiTietSanPham,
          soLuong: soLuong,
        },
      };
    }
  }

  removeTab(tab: string) {
    const tabIndex = this.tabs.indexOf(tab);
    if (tabIndex !== -1) {
      this.tabs.splice(tabIndex, 1);
    }
  }

}
