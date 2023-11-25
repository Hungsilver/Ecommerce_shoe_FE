import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { IProduct } from 'src/app/page/product/service/product.module';
import { ProductService } from 'src/app/page/product/service/product.service';

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
      }
    })
    if (!this.errorSelected) {
      this.errorSelected = undefined;
      // this.router.navigateByUrl('/product/2');
      // this.findProductDetail();
    }
  }

  // findProductDetail() {
  //   this.product.listChiTietSanPham.filter(ctsp => {
  //     ctsp.mauSac.id === 1
  //   })
  // }

  attributes: any = {}

  getProductDetailByAttributes() {
    let newSize: any[] = [];
    let newColor: any[] = [];
    let newCL: any[] = [];
    let newCLDG: any[] = [];
    console.log(this.attributes)
    this.productDetailsByAttribute = this.product?.listChiTietSanPham;
    console.log('first list:', this.productDetailsByAttribute)

    if (this.attributes?.kichCo && this.attributes?.kichCo !== '') {
      this.productDetailsByAttribute = this.productDetailsByAttribute.filter((item: any) =>
        this.attributes?.kichCo?.id === item.kichCo?.id
      )
    }
    if (this.attributes?.mauSac && this.attributes?.mauSac !== '') {
      this.productDetailsByAttribute = this.productDetailsByAttribute.filter((item: any) =>
        this.attributes?.mauSac?.id === item.mauSac?.id
      )
    }
    if (this.attributes?.chatLieuGiay && this.attributes?.chatLieuGiay !== '') {
      this.productDetailsByAttribute = this.productDetailsByAttribute.filter((item: any) =>
        this.attributes?.chatLieuGiay?.id === item.chatLieuGiay?.id
      )
    }
    if (this.attributes?.chatLieuDeGiay && this.attributes?.chatLieuDeGiay !== '') {
      this.productDetailsByAttribute = this.productDetailsByAttribute.filter((item: any) =>
        this.attributes?.chatLieuDeGiay?.id === item.chatLieuDeGiay?.id
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
    this.attributes.kichCo = kichCo;
    this.getProductDetailByAttributes();
  }
  getMauSac(ms: any) {
    this.attributes.mauSac = ms;
    this.getProductDetailByAttributes()
  }
  getChatLieu(cl: any) {
    this.attributes.chatLieuGiay = cl;
    this.getProductDetailByAttributes();
  }
  getChatLieuDe(cld: any) {
    this.attributes.chatLieuDeGiay = cld;
    this.getProductDetailByAttributes();
  }
}
