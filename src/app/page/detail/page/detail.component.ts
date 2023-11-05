import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/page/product/service/product.module';
import { ProductService } from 'src/app/page/product/service/product.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  product!: IProduct;
  id!: Number;
  quantity: number = 1;
  errorSelected: string | undefined;
  query: any = {}
  chatLieuGiays: any = [];
  chatLieuDeGiays: any = [];
  mauSacs: any = [];
  kichCos: any = [];

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
    this.productService.getProductById(this.id).then((p) => {
      if (p) {
        this.product = p;
        this.handleShowAttributes(this.product.listChiTietSanPham)
      }
    });
  }

  getAll() {
    Object.keys(this.query).forEach(key => {
      if (this.query[key] === null || this.query[key] === undefined || this.query[key] === '') {
        delete this.query[key]
      }
    })
    // this.productService.filter
  }

  handleShowAttributes(ctsp: any[]) {
    ctsp.forEach(ctsp => {
      let isExistMS = this.mauSacs.findIndex((item: any) => JSON.stringify(item) === JSON.stringify(ctsp.mauSac))
      let isExistKC = this.kichCos.findIndex((item: any) => JSON.stringify(item) === JSON.stringify(ctsp.kichCo))
      let isExistCLG = this.chatLieuGiays.findIndex((item: any) => JSON.stringify(item) === JSON.stringify(ctsp.chatLieuGiay))
      let isExistCLDG = this.chatLieuDeGiays.findIndex((item: any) => JSON.stringify(item) === JSON.stringify(ctsp.chatLieuDeGiay))
      if (isExistMS === -1 || this.mauSacs.length === 0) {
        this.mauSacs.push(ctsp.mauSac)
      }
      if (isExistKC === -1 || this.kichCos.length === 0) {
        this.kichCos.push(ctsp.kichCo)
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

  findProductDetail() {
    this.product.listChiTietSanPham.filter(ctsp => {
      ctsp.mauSac.id === 1
    })
  }

  getKichCo(kichCo: any) {
    this.query.size = kichCo;
    // this.findProductDetail();
  }
  getMauSac(obj: any) {
    this.query.color = obj;
  }
  getChatLieu(obj: any) {
    this.query.shoe_material = obj;
  }
  getChatLieuDe(obj: any) {
    this.query.shoe_sole_material = obj;
  }
}
