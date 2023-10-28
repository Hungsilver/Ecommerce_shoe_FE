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
  }
  ngOnInit(): void {
    this.productService.getProductById(this.id).then((p) => {
      this.product = p;
      let mauSacSet = new Set();
      let kickCoSet = new Set();
      let chatLieuGiaySet = new Set();
      let chatLieuDeGiaySet = new Set();
      this.product.listChiTietSanPham.forEach(ctsp => {
        mauSacSet.add(ctsp.mauSac)
        kickCoSet.add(ctsp.kichCo)
        chatLieuGiaySet.add(ctsp.chatLieuGiay)
        chatLieuDeGiaySet.add(ctsp.chatLieuDeGiay)
      });
      this.mauSacs = [...mauSacSet];
      this.kichCos = [...kickCoSet];
      this.chatLieuGiays = [...chatLieuGiaySet];
      this.chatLieuDeGiays = [...chatLieuDeGiaySet];
      console.log(chatLieuDeGiaySet)
    });
  }

  addToCart() {
    // if (!this.selectedSize) {
    //   this.errorSelected = 'Vui lòng chọn option';
    // } else {
    //   this.errorSelected = undefined;
    //   this.router.navigateByUrl('/');
    // }
  }
  getKichCo(kichCo: any) {
    this.query.size = kichCo;
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
