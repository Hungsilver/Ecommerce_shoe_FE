import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  Input,
} from '@angular/core';

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
import {
  NgxScannerQrcodeModule,
  LOAD_WASM,
  ScannerQRCodeConfig,
  NgxScannerQrcodeService,
  NgxScannerQrcodeComponent,
  ScannerQRCodeResult,
} from 'ngx-scanner-qrcode';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IStaff } from '../staff/service/staff.module';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { BaseRequestService } from 'src/libs/service/request/base-request.service';

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

  // productCode: any = {};
  productCodes: any[] = [];

  searchResults: { [tab: string]: IChiTietSanPham[] } = {};
  selectedTab: string = '';

  errorMessage: string | null = null;
  searchKeywords: { [tab: string]: any } = {};

  hoaDonChiTiet: { [tab: string]: IHoaDonChiTiet[] } = {};
  IHoaDon: { [tab: string]: IHoaDon[] } = {};
  currentHoaDonId: number | undefined = undefined; // Lưu trữ ID hóa đơn hiện tại
  currentHoaDonCode: string = ''; // Lưu trữ mã hóa đơn hiện tại
  newlyAddedItems: any[] = [];
  currentCustomerName: string = 'Khách Lẻ';
  newSoLuong: number = 1;
  staffName: string = '';
  // totalAmount: number = 0;
  // totalAmounts: any[] = [];
  totalAmounts: { [key: string]: number } = {};

  money: number | undefined;
  intoMoney: number | undefined;
  idHoaDon!: number;
  selectedPaymentMethod: number = 0; // Giá trị mặc định là 'Tiền mặt'
  cooldownTime: number = 5000;
  result: string | null = null;
  isScanning: boolean = false;
  isCooldown: boolean = false;
  lastScanTime: number = 0;
  idctsp: number | null = null;

  showQuantityForm: boolean = false; // Biến này kiểm soát hiển thị form nhập số lượng
  productInfo: any = {};
  // quantity: number | null = null; // Biến này lưu trữ số lượng nhập từ người dùng
  qrValue: string | null = null;
  id: number | null = null;

  tabs: IHoaDon[] = [];
  maxTabs: number = 5; // Số lượng tab tối đa được phép
  currentInvoiceCodes: string[] = [];

  showQuantityInput: boolean = false;
  quantity: number = 1;

  isShowQrCode: boolean = false;
  showSearchResult: boolean = false; // validate keyword kết quả tìm kiếm
  searchedKeywords: string[] = [];

  idHDCT!: number;
  tongTien: number = 0;
  thanhTien: number = 0;
  iconSortName = 'pi pi-sort-amount-up';
  constructor(
    private toast: NgToastService,
    private ctspService: CTSPService,
    private hoadonService: HoaDonService,
    private nhanVienService: StaffService,
    private hdctService: HDChiTiet,
    private snackBar: MatSnackBar,
    private qrcode: NgxScannerQrcodeService,
    private notification: ToastrService,
    private router: Router,
    private BaseRequestService: BaseRequestService
  ) {}
  params: any = {};

  ngOnInit(): void {
    this.params.status = 0;
    // this.hoadonService.tabs$.subscribe((tabs) => {
    //   this.tabs = tabs;
    // });
    this.hoadonService.getAllHd({ status: 0 }).then((res) => {
      if (res) {
        this.tabs = res.content;
      }
    });

    this.hoadonService.printInvoice$.subscribe((shouldPrint) => {
      if (shouldPrint) {
        this.exportPDF(); // Gọi hàm in hóa đơn ở đây
      }
    });
  }

  onPageChange() {}

  addTab() {
    /*
    if (this.tabs.length < this.maxTabs) {
      this.hoadonService.addTab(`Tab ${this.tabs.length + 1}`);

      this.hoadonService.createHoadon({}).then(
        (result: IReqApi<IHoaDon>) => {
          const newInvoice: IHoaDon = result as IHoaDon;
          // Kiểm tra giá trị maHoaDon trước khi gán
          if (newInvoice.maHoaDon !== undefined) {
            const newInvoiceCode = newInvoice.maHoaDon;

            if (newInvoice.khachHang === null) {
              this.currentCustomerName = 'Khách Lẻ';
            } else if (newInvoice.khachHang?.hoTen) {
              this.currentCustomerName = newInvoice?.khachHang?.hoTen;
            }
            this.staffName = newInvoice?.nhanVien?.hoTen;
            this.idHoaDon = newInvoice.id || 0;

            this.currentInvoiceCodes.push(newInvoiceCode);
            this.productCodes.push({});

            this.currentHoaDonCode = newInvoiceCode; // Gán giá trị mã hóa đơn
            this.currentHoaDonId = newInvoice.id; // gán giá trị id hóa đơn
            // Gán giá trị mã hóa đơn vào ô input
            this.setInputValue(newInvoiceCode);
            this.searchResults[this.selectedTab] =
              this.searchResults[this.selectedTab] || [];
            this.hoaDonChiTiet[this.selectedTab] =
              this.hoaDonChiTiet[this.selectedTab] || [];
          }
        },
        (error) => {
          console.error('Lỗi khi tạo hóa đơn:', error);
          this.notification.error('Lỗi khi tạo hóa đơn.');
        }
      );
    } else {
      this.notification.error('Tối đa chỉ được 5 hóa đơn.');
    }
    */
  }

  // addTab() {
  //   if (this.tabs.length < this.maxTabs) {
  //     this.hoadonService.addTab(`Tab ${this.tabs.length + 1}`);

  //     this.searchResults[this.selectedTab] = [];
  //     this.hoaDonChiTiet[this.selectedTab] = [];
  //     this.hoadonService.createHoadon({}).then(
  //       (result: IReqApi<IHoaDon>) => {
  //         const newInvoice: IHoaDon = result as IHoaDon;
  //         this.tabs.push(`Tab ${this.tabs.length + 1}`);
  //         // Kiểm tra giá trị maHoaDon trước khi gán
  //         if (newInvoice.maHoaDon !== undefined) {
  //           const newInvoiceCode = newInvoice.maHoaDon;

  //           if (newInvoice.khachHang === null) {
  //             this.currentCustomerName = 'Khách Lẻ';
  //           } else if (newInvoice.khachHang?.hoTen) {
  //             this.currentCustomerName = newInvoice.khachHang.hoTen;
  //           }
  //           this.staffName = newInvoice.nhanVien.hoTen;
  //           this.idHoaDon = newInvoice.id || 0;

  //           this.currentInvoiceCodes.push(newInvoiceCode);
  //           this.productCodes.push({});

  //           this.currentHoaDonCode = newInvoiceCode; // Gán giá trị mã hóa đơn
  //           this.currentHoaDonId = newInvoice.id;// gán giá trị id hóa đơn
  //           // Gán giá trị mã hóa đơn vào ô input
  //           this.setInputValue(newInvoiceCode);
  //           this.searchResults[this.selectedTab] = this.searchResults[this.selectedTab] || [];
  //           this.hoaDonChiTiet[this.selectedTab] = this.hoaDonChiTiet[this.selectedTab] || [];
  //         }
  //       },
  //       (error) => {
  //         console.error('Lỗi khi tạo hóa đơn:', error);
  //         this.notification.error("Lỗi khi tạo hóa đơn.")
  //       }
  //     );
  //   } else {
  //    this.notification.error("Tối đa chỉ được 5 hóa đơn.")
  //   }
  // }

  public config: ScannerQRCodeConfig = {
    constraints: {
      video: {
        width: window.innerWidth,
      },
    },
  };

  @ViewChild('action') action!: NgxScannerQrcodeComponent;

  ngAfterViewInit(): void {
    this.action.isReady.subscribe((res: any) => {
      // this.handle(this.action, 'start');
    });
  }
  startScanning(): void {
    const currentTime = Date.now();
    const timeSinceLastScan = currentTime - this.lastScanTime;

    console.log('timeSinceLastScan:', timeSinceLastScan);
    console.log('this.isScanning:', this.isScanning);

    if (!this.isScanning && timeSinceLastScan >= this.cooldownTime) {
      this.isScanning = true;

      console.log('Start scanning...');

      // Gọi hàm quét
      this.handle(this.action, 'start');

      // Cập nhật thời gian của lần quét gần đây
      this.lastScanTime = currentTime;
    } else {
      console.log('Cannot start scanning.');
    }
  }

  stopScanning(): void {
    // Dừng quét và tắt camera
    this.handle(this.action, 'stop');
    this.isScanning = false;
  }

  onEvent(e: ScannerQRCodeResult[], action?: any): void {
    console.log(e);
    // Lưu kết quả vào biến result khi có sự kiện
    if (e && e.length > 0) {
      // Chuyển đổi Int8Array thành string
      const decodedData = new TextDecoder().decode(e[0].data);
      this.result = decodedData;
      // Dừng quét khi có kết quả thành công
      this.showQuantityInput = true;
      this.stopScanning();

      this.searchProductByProductCode();
      // this.addToCartFromQR(this.searchResults, this.quantity);
      console.log('biến searchReasults ' + this.searchResults);
    }
  }
  handle(action: any, fn: string): void {
    const playDeviceFacingBack = (devices: any[]) => {
      const device = devices.find((f) =>
        /back|rear|environment/gi.test(f.label)
      );
      action.playDevice(device ? device.deviceId : devices[0].deviceId);
    };

    if (fn === 'start') {
      action[fn](playDeviceFacingBack).subscribe(
        (r: any) => console.log(fn, r),
        alert
      );
    } else {
      action[fn]().subscribe((r: any) => console.log(fn, r), alert);
    }
  }

  public onDowload(action: NgxScannerQrcodeComponent) {
    action.download().subscribe(console.log, alert);
  }

  searchProductByKeyword(tabIndex: number) {
    const currentProductCode = this.productCodes[tabIndex];

    this.ctspService.getctspByKeyword(currentProductCode).then(
      (result) => {
        console.log('result ' + result);
        if (result) {
          const isDuplicate = this.searchResults[this.selectedTab]?.some(
            (existingResult) => existingResult.id === result.id
          );
          if (!isDuplicate) {
            this.searchResults[this.selectedTab] =
              this.searchResults[this.selectedTab] || [];
            this.searchResults[this.selectedTab].push(result);
            this.searchKeywords[this.selectedTab] = currentProductCode;
          }
        }
      },
      (error) => {
        console.error('Lỗi khi tìm kiếm sản phẩm: ', error);
        // this.snackBar.open('Sản phẩm không tồn tại', 'Đóng', {
        //   duration: 3000,
        // });
        this.notification.error('Sản phẩm không tồn tại');
      }
    );
  }

  searchProductByProductCode() {
    if (this.result !== null) {
      this.ctspService.findByMa(this.result).then(
        (productId) => {
          if (productId !== null) {
            console.log('ID của sản phẩm là:', productId.id);
            this.searchResults = productId;
            this.notification.success('Success');
          } else {
            console.error('Không tìm thấy sản phẩm.');
            this.notification.error('Sản phẩm không tồn tại');
          }
        },
        (error) => {
          console.error('Lỗi khi tìm kiếm sản phẩm:', error);
          this.notification.error('Mã QR không đúng');
        }
      );
    }
  }

  onKeyPress(event: KeyboardEvent, tabIndex: number) {
    if (event.key === 'Enter') {
      this.searchProductByKeyword(tabIndex);
    }
  }

  setInputValue(value: string): void {
    // Gán giá trị vào ô input theo ID của input
    const inputElement = document.getElementById(
      'exampleInputHD'
    ) as HTMLInputElement;
    if (inputElement) {
      inputElement.value = value;
    }
  }

  onTabChange(event: MatTabChangeEvent): void {
    // this.selectedTab = this.tabs[event.index];
  }

  addToCart(searchResult: IChiTietSanPham): void {
    const hoaDonId = this.currentHoaDonId;
    const chiTietSanPhamId = searchResult.id;
    const soLuong = 1;

    if (searchResult && searchResult.soLuong !== undefined) {
      // Kiểm tra xem số lượng có lớn hơn 0 hay không trước khi giảm
      if (searchResult.soLuong > 0) {
        // Kiểm tra xem searchResult.soLuong có tồn tại không trước khi cộng
        if (searchResult.soLuong !== undefined) {
          searchResult.soLuong -= 1; // Giảm số lượng trực tiếp
        }
        // Kiểm tra kiểu dữ liệu của giaBan
        if (searchResult && typeof searchResult.giaBan === 'number') {
          const donGia = searchResult.giaBan;
          this.thanhTien = searchResult.giaBan * soLuong;

          if (this.totalAmounts[this.selectedTab] === undefined) {
            this.totalAmounts[this.selectedTab] = 0;
          }
          this.totalAmounts[this.selectedTab] += this.thanhTien;
          console.log('don gia sp ' + this.totalAmounts[this.selectedTab]);
          // const thanhTien=searchResult.giaBan;
          // console.log("thanh tien "+thanhTien);
          const existingItemIndex = this.hoaDonChiTiet[
            this.selectedTab
          ]?.findIndex((item) => item.chiTietSanPham?.id === chiTietSanPhamId);

          const request = {
            idHoaDon: hoaDonId,
            idChiTietSanPham: chiTietSanPhamId,
            soLuong: soLuong,
            donGia: donGia,
            thanhTien: donGia * soLuong,
          };
          // Nếu sản phẩm chưa có trong hóa đơn chi tiết, thêm mới
          this.hdctService
            .addCtsp(request)
            .then((result) => {
              // Kiểm tra xem hoaDonChiTiet[selectedTab] có phải là một mảng không, nếu không, khởi tạo nó
              if (!Array.isArray(this.hoaDonChiTiet[this.selectedTab])) {
                this.hoaDonChiTiet[this.selectedTab] = [];
              }
              if (this.isIHoaDonChiTiet(result)) {
                const existingItem =
                  this.hoaDonChiTiet[this.selectedTab][existingItemIndex];
                if (existingItem) {
                  if (
                    existingItem.soLuong !== undefined &&
                    existingItem.donGia !== undefined
                  ) {
                    existingItem.soLuong += soLuong;
                    existingItem.donGia = searchResult.giaBan;
                    if (
                      searchResult &&
                      typeof searchResult.giaBan === 'number' &&
                      existingItem.donGia !== undefined
                    ) {
                      //! sua don gia
                      // existingItem.donGia = searchResult.giaBan * existingItem.soLuong;
                      // existingItem.donGia =searchResult.giaBan;
                      // this.thanhTien=searchResult.giaBan * existingItem.soLuong;
                      existingItem.thanhTien =
                        existingItem.donGia * existingItem.soLuong;
                      this.thanhTien = existingItem.thanhTien;
                      console.log(
                        'thanh tien don san pham ' + existingItem.thanhTien
                      );
                    }
                  } else {
                    console.error('existingItem.soLuong không tồn tại.');
                  }
                } else {
                  this.hoaDonChiTiet[this.selectedTab].push(result);
                }
                console.log(
                  'Sản phẩm đã được thêm vào hóa đơn chi tiết.',
                  result
                );
                this.notification.success('Success');
              } else {
                console.error(
                  'Kết quả không phải là kiểu IHoaDonChiTiet:',
                  result
                );
              }
            })
            .catch((error) => {
              // Nếu có lỗi, phục hồi số lượng
              if (searchResult.soLuong !== undefined) {
                searchResult.soLuong += 1;
              }
              console.error(
                'Lỗi khi thêm sản phẩm vào hóa đơn chi tiết:',
                error
              );
            });
        } else {
          console.log('Số lượng không hợp lệ.');
        }
      } else {
        console.log('Sản phẩm không hợp lệ.');
        this.notification.error('Số lượng không hợp lệ');
      }
    }
  }

  isIHoaDonChiTiet(obj: any): obj is IHoaDonChiTiet {
    return obj && typeof obj === 'object' && 'chiTietSanPham' in obj;
  }

  removeItemFromInvoice(chiTietId: number | undefined): void {
    if (chiTietId !== undefined) {
      // Trước khi xóa, lấy thông tin chi tiết để biết số lượng và đơn giá
      const chiTietToRemove = this.hoaDonChiTiet[this.selectedTab].find(
        (chiTiet) => chiTiet.id === chiTietId,
        (this.idHDCT = chiTietId)
      );
      console.log(' id hdct ' + this.idHDCT);

      if (chiTietToRemove) {
        const soLuongToRemove = chiTietToRemove.soLuong || 0;
        const donGiaToRemove = chiTietToRemove.donGia || 0;
        // const thanhTienRemove = chiTietToRemove.thanhTien || 0;
        // Gọi hàm xóa hóa đơn chi tiết từ service
        this.hdctService.deleteHdct(chiTietId).then(
          () => {
            // Xóa thành công, cập nhật lại danh sách
            this.hoaDonChiTiet[this.selectedTab] = this.hoaDonChiTiet[
              this.selectedTab
            ].filter((chiTiet) => chiTiet.id !== chiTietId);
            // Trừ tổng tiền sản phẩm theo số lượng và đơn giá của chi tiết đã bị xóa
            this.totalAmounts[this.selectedTab] -= donGiaToRemove;
            // this.totalAmount -= thanhTienRemove;

            console.log('don gia ' + this.totalAmounts[this.selectedTab]);
            this.notification.success('Success');
            // Kiểm tra và cập nhật số lượng sản phẩm
            const chiTietSanPham = chiTietToRemove.chiTietSanPham;
            if (chiTietSanPham) {
              // Tìm chi tiết sản phẩm tương ứng trong mảng searchResults
              const chiTietSanPhamIndex = this.searchResults[
                this.selectedTab
              ].findIndex((item) => item.id === chiTietSanPham.id);
              // Cộng lại số lượng vào chi tiết sản phẩm
              if (
                chiTietSanPhamIndex !== -1 &&
                this.searchResults[this.selectedTab][chiTietSanPhamIndex] !==
                  undefined
              ) {
                const chiTietSanPhamItem =
                  this.searchResults[this.selectedTab][chiTietSanPhamIndex];
                if (chiTietSanPhamItem.soLuong !== undefined) {
                  chiTietSanPhamItem.soLuong += soLuongToRemove;

                  // Gọi hàm cập nhật số lượng trong bảng chi tiết sản phẩm trên view
                  this.updateSoLuongInTable(
                    chiTietSanPham.id,
                    chiTietSanPhamItem.soLuong
                  );
                } else {
                  console.error(
                    'Số lượng của chi tiết sản phẩm không xác định.'
                  );
                  this.notification.error('Error');
                }
              }
            }
          },
          (error) => {
            console.error('Lỗi khi xóa hóa đơn chi tiết:', error);
            this.notification.error('Error');
          }
        );
      } else {
        console.error('Không tìm thấy chi tiết hóa đơn để xóa.');
        this.notification.error('Error');
      }
    } else {
      console.error('ID của chi tiết không được phép là undefined.');
      this.notification.error('Error');
    }
  }

  updateSoLuongInTable(chiTietSanPhamId: number, soLuong: number): void {
    const chiTietIndex = this.hoaDonChiTiet[this.selectedTab].findIndex(
      (chiTiet) => chiTiet.chiTietSanPham?.id === chiTietSanPhamId
    );

    if (chiTietIndex !== -1) {
      // Sử dụng cú pháp spread để tạo một bản sao của đối tượng và cập nhật số lượng
      const updatedChiTiet = {
        ...this.hoaDonChiTiet[this.selectedTab][chiTietIndex],
        chiTietSanPham: {
          ...this.hoaDonChiTiet[this.selectedTab][chiTietIndex].chiTietSanPham,
          soLuong: soLuong,
        },
      };

      this.hoaDonChiTiet[this.selectedTab][chiTietIndex] = updatedChiTiet;
    }
  }

  removeTab(tab: string) {
    // const tabIndex = this.tabs.indexOf(tab);
    // if (tabIndex !== -1) {
    //   this.tabs.splice(tabIndex, 1);
    //   this.searchResults[this.selectedTab] = [];
    //   this.hoaDonChiTiet[this.selectedTab] = [];
    // }
  }

  // Trong component.ts
  onQuantityChange(newQuantity: number) {
    this.quantity = newQuantity;
  }

  addToCartFromQR(productDetails: IChiTietSanPham, quantity: number): void {
    // Kiểm tra xem số lượng có lớn hơn 0 không trước khi thêm vào giỏ hàng
    if (quantity > 0) {
      const hoaDonId = this.currentHoaDonId;
      const chiTietSanPhamId = productDetails.id;
      this.money = productDetails.giaBan;
      if (this.totalAmounts[this.selectedTab] === undefined) {
        this.totalAmounts[this.selectedTab] = 0; // Khởi tạo nếu chưa được
      }
      // Kiểm tra xem productDetails.giaBan có tồn tại không
      if (productDetails.giaBan !== undefined) {
        //! sua don gia 2
        // const donGia = productDetails.giaBan * quantity;
        const donGia = productDetails.giaBan;
        this.thanhTien = productDetails.giaBan * quantity;
        const request = {
          idHoaDon: hoaDonId,
          idChiTietSanPham: chiTietSanPhamId,
          soLuong: quantity,
          donGia: donGia,
        };

        console.log('test don gia khi add hdct ' + donGia);
        // this.totalAmounts[this.selectedTab] += donGia;
        this.totalAmounts[this.selectedTab] += this.thanhTien;

        console.log('test gia 1 ' + this.totalAmounts[this.selectedTab]);

        const existingItemIndex = this.hoaDonChiTiet[
          this.selectedTab
        ]?.findIndex((item) => item.chiTietSanPham?.id === chiTietSanPhamId);

        const quantitiesInCart: number[] = [];
        if (this.hoaDonChiTiet[this.selectedTab]) {
          // Lặp qua từng sản phẩm trong giỏ hàng và lưu trữ số lượng vào mảng
          this.hoaDonChiTiet[this.selectedTab].forEach((item) => {
            // Kiểm tra xem số lượng của sản phẩm có tồn tại không
            if (item.soLuong !== undefined) {
              quantitiesInCart.push(item.soLuong);
            }
          });
        }

        const totalQuantityInCart = quantitiesInCart.reduce(
          (total, quantity) => total + quantity,
          0
        );

        // const totalQuantityInCart = this.hoaDonChiTiet[this.selectedTab]?.reduce(
        //   (total, item) => (total += item.soLuong || 0),
        //   0
        // );
        // Nếu sản phẩm chưa có trong hóa đơn chi tiết, thêm mới
        if (
          productDetails.soLuong !== undefined &&
          quantity > productDetails.soLuong
        ) {
          this.snackBar.open(
            'Số lượng vượt quá số lượng tồn kho của sản phẩm 1.',
            'Đóng',
            {
              duration: 3000,
              panelClass: ['error-snackbar'],
            }
          );
          return;
        }

        if (
          productDetails.soLuong !== undefined &&
          quantity > productDetails.soLuong
        ) {
          this.snackBar.open(
            'Số lượng vượt quá số lượng tồn kho của sản phẩm 2.',
            'Đóng',
            {
              duration: 3000,
              panelClass: ['error-snackbar'],
            }
          );
          return;
        }

        this.hdctService
          .addCtsp(request)
          .then((result) => {
            // Kiểm tra xem hoaDonChiTiet[selectedTab] có phải là một mảng không, nếu không, khởi tạo nó
            if (!Array.isArray(this.hoaDonChiTiet[this.selectedTab])) {
              this.hoaDonChiTiet[this.selectedTab] = [];
            }
            const existingItem =
              this.hoaDonChiTiet[this.selectedTab][existingItemIndex];

            if (this.isIHoaDonChiTiet(result)) {
              // Thêm vào giỏ hàng
              if (existingItem) {
                // Kiểm tra xem existingItem.soLuong có tồn tại không trước khi cộng
                if (existingItem.soLuong !== undefined) {
                  existingItem.soLuong += quantity;
                  if (productDetails.giaBan !== undefined) {
                    // existingItem.donGia = productDetails.giaBan * existingItem.soLuong;
                    this.thanhTien =
                      productDetails.giaBan * existingItem.soLuong;
                    //! sua 3
                    this.totalAmounts[this.selectedTab] = this.thanhTien;
                    console.log(
                      'don gia 2' + this.totalAmounts[this.selectedTab]
                    );
                  }
                } else {
                  this.snackBar.open(
                    'Số lượng sản phẩm vượt quá giới hạn.',
                    'Đóng',
                    {
                      duration: 3000,
                      panelClass: ['error-snackbar'],
                    }
                  );
                  return;
                }
              } else {
                // Nếu chưa có, thêm mới vào giỏ hàng
                this.hoaDonChiTiet[this.selectedTab].push(result);
              }
              console.log(
                'Sản phẩm đã được thêm vào hóa đơn chi tiết.',
                result
              );
              // this.showQuantityInput=false;
            } else {
              console.error(
                'Kết quả không phải là kiểu IHoaDonChiTiet:',
                result
              );
            }
          })
          .catch((error) => {
            // Nếu có lỗi, phục hồi số lượng
            console.error('Lỗi khi thêm sản phẩm vào hóa đơn chi tiết:', error);
          });
      } else {
        console.log('Gia ban không hợp lệ.');
      }
    } else {
      console.log('Số lượng không hợp lệ.');
      this.snackBar.open('Số lượng không hợp lệ', 'Đóng', {
        duration: 3000,
        panelClass: ['error-snackbar'],
      });
      return;
    }
  }

  showQRCode() {
    this.isShowQrCode = !this.isShowQrCode;
  }

  turnOfQRCode() {
    this.isShowQrCode = false;
  }

  exportPDF(): void {
    const id = this.idHoaDon;
    this.hoadonService.exportPdf(id).subscribe(
      (data) => {
        this.downloadFile(data);
      },
      (error) => {
        console.error('Error exporting PDF', error);
      }
    );
  }

  private downloadFile(data: Blob): void {
    const blob = new Blob([data], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'hoadon.pdf';
    link.click();
  }

  decreaseQuantity(chiTiet: IHoaDonChiTiet): void {
    console.log('goi ham tru quantity');

    if (chiTiet && chiTiet['soLuong'] !== undefined) {
      if (chiTiet['soLuong'] > 1) {
        chiTiet['soLuong']--;
        this.onUpdate(chiTiet);
      } else {
        console.error('Số lượng tối thiểu phải là 1.');
        this.notification.error('Số lượng tối thiểu phải là 1.');
      }
    }
  }
  increaseQuantity(chiTiet: IHoaDonChiTiet): void {
    console.log('goi ham add quantity');
    const tabKeys = Object.keys(this.searchResults);

    if (chiTiet && chiTiet['soLuong'] !== undefined) {
      console.log('ben trong if 1');
      const tabKey = this.selectedTab;
      const chiTietSanPhamId = chiTiet.chiTietSanPham?.id;
      console.log('ctsp id ' + chiTietSanPhamId);

      const chiTietSanPham = chiTiet.chiTietSanPham;
      const tabKeys = Object.keys(this.hoaDonChiTiet);

      if (chiTiet.soLuong >= (chiTietSanPham?.soLuong || 0)) {
        console.error('Số lượng trong hóa đơn đã đạt tối đa.');
        this.notification.error('Số lượng trong hóa đơn đã đạt tối đa.');
        return;
      }

      for (const tabKey of tabKeys) {
        const chiTietIndex = this.hoaDonChiTiet[tabKey].findIndex(
          (item) => item.id === chiTiet.id
        );
        if (chiTietIndex !== -1) {
          // searchResults
          this.hoaDonChiTiet[tabKey][chiTietIndex]['soLuong'] =
            chiTiet['soLuong'];
          if (chiTiet.soLuong !== undefined) {
            // if (chiTietSanPham && chiTietSanPham.soLuong !== undefined && chiTietSanPham.soLuong > 0) {
            chiTiet['soLuong']++;
            this.onUpdate(chiTiet);
            // }
          } else {
            console.error(
              'Số lượng trong chi tiết sản phẩm đã hết hoặc không tồn tại.'
            );
            this.notification.error('Số lượng sản phẩm đã hết.');
            return;
          }
        }
      }
    }
  }

  onUpdate(chiTiet: IHoaDonChiTiet): void {
    if (chiTiet && chiTiet.id !== undefined && chiTiet.soLuong !== undefined) {
      const oldSoLuong = chiTiet.soLuong;
      const newSoLuong = chiTiet.soLuong;
      const newDonGia = chiTiet.donGia;
      // const chiTietSanPham = chiTiet.chiTietSanPham;

      this.hdctService
        .updateSoLuong(chiTiet.id, {
          id: chiTiet.hoaDon.id,
          soLuong: newSoLuong,
          donGia: newDonGia,
        })
        .subscribe(
          (updatedChiTiet: IHoaDonChiTiet) => {
            console.log('Updated Chi Tiet:', updatedChiTiet);
            const chiTietSanPham = updatedChiTiet.chiTietSanPham;
            // Cập nhật lại số lượng và đơn giá trong đối tượng trên view
            const tabKeys = Object.keys(this.hoaDonChiTiet);
            for (const tabKey of tabKeys) {
              const chiTietIndex = this.hoaDonChiTiet[tabKey].findIndex(
                (item) => item.id === updatedChiTiet.id
              );
              if (chiTietIndex !== -1) {
                // searchResults
                this.hoaDonChiTiet[tabKey][chiTietIndex]['soLuong'] =
                  updatedChiTiet['soLuong'];

                if (
                  chiTiet &&
                  chiTiet.soLuong !== undefined &&
                  chiTiet.donGia !== undefined &&
                  newDonGia !== undefined
                ) {
                  // const donGiaNew = chiTiet.soLuong * chiTietSanPham.giaBan;
                  this.thanhTien = chiTiet.soLuong * chiTietSanPham.giaBan;
                  console.log('test tong tien hoa don ' + this.thanhTien);
                  // this.hoaDonChiTiet[tabKey][chiTietIndex]['donGia'] = donGiaNew;
                  // this.totalAmounts[this.selectedTab] = this.hoaDonChiTiet[tabKey].reduce((total, item) => total + (newDonGia || 0), 0);
                  this.totalAmounts[this.selectedTab] = newSoLuong * newDonGia;
                  1;

                  console.log(
                    'tong tien hoa don ' + this.totalAmounts[this.selectedTab]
                  );
                }

                // Cập nhật số lượng và đơn giá trong chi tiết sản phẩm
                if (chiTietSanPham) {
                  const sanPhamIndex = this.searchResults[tabKey].findIndex(
                    (item) => item.id === chiTietSanPham.id
                  );
                  if (sanPhamIndex !== -1) {
                    this.searchResults[tabKey][sanPhamIndex]['soLuong'] =
                      chiTietSanPham.soLuong;
                  }
                }
              }
            }
            // this.totalAmounts[this.selectedTab] = tongTien;
          },
          (error) => {
            console.error('Lỗi khi cập nhật:', error);
          }
        );
    } else {
      console.error(
        'ID hoặc số lượng của chi tiết không được phép là undefined.'
      );
    }
  }

  // handleQuantityDecrease(chiTiet: IHoaDonChiTiet): void {
  //   if (!chiTiet || !this.selectedTab || !this.searchResults || !this.searchResults[this.selectedTab]) {
  //     console.error("Dữ liệu không hợp lệ");
  //     return;
  //   }

  //   const newSoLuong = (chiTiet.soLuong || 0);

  //   if (chiTiet.chiTietSanPham.soLuong < 0 || newSoLuong > chiTiet.chiTietSanPham.soLuong) {
  //     console.error("Số lượng không hợp lệ");
  //     this.notification.error("Số lượng không hợp lệ");
  //     // Đặt số lượng trong hóa đơn chi tiết về 1
  //     // Kiểm tra và cập nhật số lượng trong chi tiết sản phẩm
  //     const selectedTab = this.selectedTab;
  //     const searchResults = this.searchResults;

  //     if (selectedTab && searchResults && searchResults[selectedTab]) {
  //       const chiTietSanPham = chiTiet.chiTietSanPham;
  //       if (chiTietSanPham) {
  //         const sanPhamIndex = searchResults[selectedTab].findIndex(item => item.id === chiTietSanPham.id);
  //         if (sanPhamIndex !== undefined && sanPhamIndex !== -1 && searchResults[selectedTab][sanPhamIndex]) {
  //           const soLuongSanPham = searchResults[selectedTab][sanPhamIndex].soLuong;
  //           if (soLuongSanPham !== undefined) {
  //             searchResults[selectedTab][sanPhamIndex].soLuong = soLuongSanPham;
  //           }
  //         }
  //       }
  //     }
  //   } else {
  //     // Nếu số lượng mới hợp lệ, cập nhật số lượng và gọi hàm onUpdate
  //     chiTiet.soLuong = newSoLuong;
  //     this.onUpdate(chiTiet);
  //   }
  // }
  // console.log("kiem tra " + this.searchResults[tabKey]);

  notificationInvoice(idHoaDonPayment: number, hoaDonRequest: IHoaDon): void {
    hoaDonRequest = hoaDonRequest || {};
    idHoaDonPayment = this.idHoaDon;
    hoaDonRequest.tongTien = this.totalAmounts[this.selectedTab];
    // hoaDonRequest.trangThai = 1;
    hoaDonRequest.tongTienSauGiam = this.totalAmounts[this.selectedTab];
    hoaDonRequest.phuongThucThanhToan = this.selectedPaymentMethod;
    console.log('idHoaDon ' + this.idHoaDon);
    console.log('phương thức thanh toán: ' + hoaDonRequest.phuongThucThanhToan);
    if (hoaDonRequest.phuongThucThanhToan === 0) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You are about to make a payment.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, make payment!',
      }).then((result) => {
        if (result.isConfirmed) {
          // Hỏi xác nhận in hóa đơn
          Swal.fire({
            title: 'Print Invoice',
            text: 'Do you want to print the invoice?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, print!',
          }).then((printResult) => {
            if (printResult.isConfirmed) {
              this.exportPDF();
              this.removeTab(this.selectedTab);
            }
            if (printResult.isConfirmed) {
              this.makePayment(idHoaDonPayment, hoaDonRequest);
            }
            Swal.fire({
              title: printResult.isConfirmed
                ? 'Payment Successful!'
                : 'Payment Successful but Not Printed!',
              text: printResult.isConfirmed
                ? 'Your payment has been completed.'
                : 'Your payment has been completed, but the invoice was not printed.',
              icon: 'success',
            });
          });
        }
      });
    } else {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, proceesd!',
      }).then((result) => {
        // Kiểm tra xem người dùng đã xác nhận hay không
        if (result.isConfirmed) {
          this.makePayment(this.idHoaDon, hoaDonRequest);
          // this.removeTab(this.selectedTab);
          // this.router.navigate(['/payment-success'], { state: { printInvoice: true } });
        }
      });
    }
  }
  makePayment(idHoaDonPayment: number, hoaDonRequest: IHoaDon): void {
    hoaDonRequest = hoaDonRequest || {};
    hoaDonRequest.tongTien = this.totalAmounts[this.selectedTab];
    console.log('Selected Payment Method:', this.selectedPaymentMethod);
    hoaDonRequest.phuongThucThanhToan = this.selectedPaymentMethod;
    hoaDonRequest.tongTienSauGiam = this.totalAmounts[this.selectedTab];
    console.log('phuong thuc thanh toan' + hoaDonRequest.phuongThucThanhToan);
    if (hoaDonRequest.phuongThucThanhToan === 0) {
      this.hoadonService
        .shopPaymentsCast(idHoaDonPayment, hoaDonRequest)
        .subscribe(
          (response) => {
            console.log('Payment successful:', response);
          },
          (error) => {
            console.error('Error making payment:', error);
          }
        );
    } else {
      this.hoadonService
        .shopPaymentsVnpay(idHoaDonPayment, hoaDonRequest)
        .subscribe(
          (response: any) => {
            const vnpPaymentUrl = response.vnpPaymentUrl;
            console.log('Redirecting to VNPay:', response);
            window.location.href = response;
          },
          (error) => {
            console.error('Error making VNPay payment:', error);
          }
        );
    }
  }
}
