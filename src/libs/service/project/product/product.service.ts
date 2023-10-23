import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from './product.module';
import { BaseRequestService } from '../../request/base-request.service';
import { IReqApi } from 'src/libs/common/interface/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url: string = 'products-detail';
  products: IReqApi<IProduct[]> =
    {
      content: [
        {
          id: 1,
          ma: 'hshd',
          ten: 'san pham 1',
          anhChinh: 'sanpham1.jpg',
          moTa: 'cuwjc oonnn',
          thuongHieu: {
            id: 1,
            ten: 'dior',
            trangThai: 1,
          },
          xuatXu: {
            id: 1,
            ten: 'vnam',
            trangThai: 1,
          },
          giaThapNhat: 102000,
          giaCaoNhat: 1300000,
          trangThai: 1,
        },
        {
          id: 2,
          ma: 'hshd',
          ten: 'san pham 2',
          anhChinh: 'sanpham2.jpg',
          moTa: 'cuwjc oonnn',
          thuongHieu: {
            id: 2,
            ten: 'gucci',
            trangThai: 1,
          },
          xuatXu: {
            id: 2,
            ten: 'thai lan',
            trangThai: 1,
          },
          giaThapNhat: 102000,
          giaCaoNhat: 1300000,
          trangThai: 1,
        },
        {
          id: 3,
          ma: 'hshd',
          ten: 'san pham 3',
          anhChinh: 'sanpham3.jpg',
          moTa: 'cuwjc oonnn',
          thuongHieu: {
            id: 3,
            ten: 'proo',
            trangThai: 1,
          },
          xuatXu: {
            id: 1,
            ten: 'vnam',
            trangThai: 1,
          },
          giaThapNhat: 102000,
          giaCaoNhat: 1300000,
          trangThai: 1,
        },
        {
          id: 4,
          ma: 'hshd',
          ten: 'san pham 4',
          anhChinh: 'sanpham4.jpg',
          moTa: 'cuwjc oonnn',
          thuongHieu: {
            id: 3,
            ten: 'proo',
            trangThai: 1,
          },
          xuatXu: {
            id: 2,
            ten: 'thai lan',
            trangThai: 1,
          },
          giaThapNhat: 102000,
          giaCaoNhat: 1300000,
          trangThai: 1,
        },
        {
          id: 5,
          ma: 'ffff',
          ten: 'san pham 5',
          anhChinh: 'sanpham5.jpg',
          moTa: 'cuwjc oonnn',
          thuongHieu: {
            id: 1,
            ten: 'dior',
            trangThai: 1,
          },
          xuatXu: {
            id: 1,
            ten: 'vnam',
            trangThai: 1,
          },
          giaThapNhat: 190900,
          giaCaoNhat: 2000000,
          trangThai: 1,
        },
      ],
      pageable: {
        pageNumber: 0,
        pageSize: 3,
        sort: {
          empty: true,
          sorted: false,
          unsorted: true
        },
        offset: 0,
        paged: true,
        unpaged: false
      },
      last: false,
      totalPages: 2,
      totalElements: 5,
      size: 3,
      number: 0,
      sort: {
        empty: true,
        sorted: false,
        unsorted: true
      },
      first: true,
      numberOfElements: 5,
      empty: false
    }


  constructor(
    private http: HttpClient,
    private baseRequestService: BaseRequestService
  ) {

  }

  getProducts(): IProduct[] {
    return this.products.content;
  }

  // getProducts(): Promise<IProduct[]> {
  //   return new Promise<IProduct[]>((resolve, reject) => {
  //     this.baseRequestService.get(`${this.url}`).subscribe(
  //       (result) => {
  //         return resolve(result);
  //       },
  //       (err) => reject(err)
  //     );
  //   });
  // }

  getProductById(id: Number): Promise<IProduct> {
    return new Promise<IProduct>((resolve, reject) => {
      this.baseRequestService.get(`${this.url}/${id}`).subscribe(
        (result) => {
          return resolve(result);
        },
        (err) => reject(err)
      );
    });
  }
}
