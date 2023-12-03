import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { IProduct } from 'src/app/page/product/service/product.module';
import { ProductService } from 'src/app/page/product/service/product.service';
import { DetailService } from '../service/detail.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  product!: IProduct;
  productDetailsByAttribute: any = [];
  id!: Number;
  quantity: number = 1;
  errorSelected: string | undefined;
  query: any = {}
  params: any = {}
  idProductDetail!: number;
  chatLieuGiays: any = [];
  chatLieuDeGiays: any = [];
  mauSacs: any = [];
  kichCos: any = [];
  priceProduct: number = 0;
  productDetailSelected: any = {};
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;


  constructor(
    private productService: ProductService,
    private detailService: DetailService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.query.size = null;
    this.query.shoe_material = null;
    this.query.color = null;
    this.query.shoe_sole_material = null;
  }

  ngOnInit(): void {
    this.items = [{ label: 'Chi tiết sản phẩm' }];

    this.home = { icon: '', label: 'Trang chủ', routerLink: '/' };

    this.productService.getProductById(this.id).then((p) => {
      if (p) {
        this.product = p;
        this.productDetailsByAttribute = p.listChiTietSanPham;
        this.handleShowAttributes(this.product.listChiTietSanPham)
        this.priceProduct = p.listChiTietSanPham[0].giaBan;
        // this.query = this.productDetailsByAttribute[0];
        this.params.id = this.productDetailsByAttribute[0]?.id;
      }
    });
  }

  // getAll() {
  //   Object.keys(this.query).forEach(key => {
  //     if (this.query[key] === null || this.query[key] === undefined || this.query[key] === '') {
  //       delete this.query[key]
  //     }
  //   })
  // }

  handleShowAttributes(ctsp: any[]) {
    ctsp.forEach(ctsp => {
      let isExistMS = this.mauSacs.findIndex((item: any) => item.id === ctsp?.mauSac?.id)
      let isExistKC = this.kichCos.findIndex((item: any) => item.id === ctsp?.kichCo?.id)
      let isExistCLG = this.chatLieuGiays.findIndex((item: any) => item.id === ctsp?.chatLieuGiay?.id)
      let isExistCLDG = this.chatLieuDeGiays.findIndex((item: any) => item.id === ctsp?.chatLieuDeGiay?.id)
      if (isExistMS === -1 || this.mauSacs.length === 0) {
        this.mauSacs.push({ ...ctsp.mauSac, isDisable: false })
      }
      if (isExistKC === -1 || this.kichCos.length === 0) {
        this.kichCos.push({ ...ctsp.kichCo, isDisable: false })
      }
      if (isExistCLG === -1 || this.chatLieuGiays.length === 0) {
        this.chatLieuGiays.push(ctsp.chatLieuGiay)
      }
      if (isExistCLDG === -1 || this.chatLieuDeGiays.length === 0) {
        this.chatLieuDeGiays.push(ctsp.chatLieuDeGiay)
      }
    });
  }

  addToCart() {
    this.errorSelected = undefined;
    Object.keys(this.query).forEach(key => {
      if (this.query[key] === null) {
        this.errorSelected = 'Vui lòng chọn option';
        return;
      }
    })
    if (!this.errorSelected) {
      this.errorSelected = undefined;
    }
    this.params.quantity = this.quantity;
    this.detailService.addToCart(this.params).then(data => {
      if (data) {
        console.log(data)
      }
    })
  }

  // findProductDetail() {
  //   this.product.listChiTietSanPham.filter(ctsp => {
  //     ctsp.mauSac.id === 1
  //   })
  // }


  getProductDetailByAttributes() {
    let newSize: any[] = [];
    let newColor: any[] = [];
    let newCL: any[] = [];
    let newCLDG: any[] = [];
    console.log(this.query)
    this.productDetailsByAttribute = this.product?.listChiTietSanPham;
    console.log('first list:', this.productDetailsByAttribute)

    if (this.query?.kichCo && this.query?.kichCo !== '') {
      this.productDetailsByAttribute = this.productDetailsByAttribute.filter((item: any) =>
        this.query?.kichCo?.id === item.kichCo?.id
      )
    }
    if (this.query?.mauSac && this.query?.mauSac !== '') {
      this.productDetailsByAttribute = this.productDetailsByAttribute.filter((item: any) =>
        this.query?.mauSac?.id === item.mauSac?.id
      )
    }
    if (this.query?.chatLieuGiay && this.query?.chatLieuGiay !== '') {
      this.productDetailsByAttribute = this.productDetailsByAttribute.filter((item: any) =>
        this.query?.chatLieuGiay?.id === item.chatLieuGiay?.id
      )
    }
    if (this.query?.chatLieuDeGiay && this.query?.chatLieuDeGiay !== '') {
      this.productDetailsByAttribute = this.productDetailsByAttribute.filter((item: any) =>
        this.query?.chatLieuDeGiay?.id === item.chatLieuDeGiay?.id
      )
    }
    console.log('products end', this.productDetailsByAttribute)

    this.productDetailsByAttribute.forEach((ctsp: any) => {
      let isExistMS = newColor.findIndex((item: any) => item?.id === ctsp?.mauSac?.id)
      let isExistKC = newSize.findIndex((item: any) => item.id === ctsp?.kichCo?.id)
      let isExistCLG = newCL.findIndex((item: any) => item.id === ctsp?.chatLieuGiay?.id)
      let isExistCLDG = newCLDG.findIndex((item: any) => item.id === ctsp?.chatLieuDeGiay?.id)

      if ((isExistMS === -1 && ctsp?.mauSac) || (newColor.length === 0)) {
        newColor.push(ctsp.mauSac);
      }
      if (isExistKC === -1 || (newSize.length === 0 && !ctsp?.kichCo)) {
        newSize.push(ctsp.kichCo)
      }
      if (isExistCLG === -1 || newCL.length === 0) {
        newCL.push(ctsp.chatLieuGiay)
      }
      if (isExistCLDG === -1 || newCLDG.length === 0) {
        newCLDG.push(ctsp.chatLieuDeGiay)
      }
    });
    this.kichCos.forEach((item: any) => {
      if (newSize.includes(JSON.stringify(item))) {
        console.log('nam trong')
        item.isDisable = false;
      } else {
        item.isDisable = true;
      }
    })
  }

  getKichCo(kichCo: any) {
    this.query.kichCo = kichCo;
    this.getProductDetailByAttributes();
  }
  getMauSac(ms: any) {
    this.query.mauSac = ms;
    this.getProductDetailByAttributes()
  }
  getChatLieu(cl: any) {
    this.query.chatLieuGiay = cl;
    this.getProductDetailByAttributes();
  }
  getChatLieuDe(cld: any) {
    this.query.chatLieuDeGiay = cld;
    this.getProductDetailByAttributes();
  }
}
