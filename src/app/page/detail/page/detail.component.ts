import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { IProduct } from 'src/app/page/product/service/product.module';
import { ProductService } from 'src/app/page/product/service/product.service';
import { DetailService } from '../service/detail.service';
import { ISize } from 'src/libs/service/project/size/size.module';
import { SizeService } from 'src/app/admin/size/service/size.service';
import { IColor } from 'src/app/admin/color/service/color.module';
import { IMaterial } from 'src/app/admin/material/service/material.module';
import { IMaterialSoles } from 'src/app/admin/material-soles/service/materilal-soles.module';
import { MaterialService } from 'src/app/admin/material/service/material.service';
import { MaterialSolesService } from 'src/app/admin/material-soles/service/material-soles.service';
import { ColorService } from 'src/app/admin/color/service/color.service';
import { IProductDetail } from 'src/app/admin/product-detail/services/product.module';
import { ProductDetailService } from 'src/app/admin/product-detail/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { CacheService } from 'src/libs/service/request/cache.service';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  product!: IProduct;
  size!: ISize
  color!: IColor;
  material!: IMaterial;
  materialSoles!: IMaterialSoles;
  productDetail!: IProductDetail;
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
  quantityProduct: number = 0;
  productDetailSelected: any = {};
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;
  listSize: any = [];
  listColor: any = [];
  listCL: any = [];
  listCLDG: any = [];
  imgProduct: any;
  codeProduct: any;
  statusProduct: any;
  addProductToCart: any = [];



  constructor(
    private notificationService: ToastrService,
    private productService: ProductService,
    private detailService: DetailService,
    private sizeService: SizeService,
    private colorService: ColorService,
    private materialService: MaterialService,
    private materialSoleService: MaterialSolesService,
    private productDetailService: ProductDetailService,
    private route: ActivatedRoute,
    private cacheService: CacheService,
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
        this.imgProduct = p.listChiTietSanPham[0].anhSanPhams;
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
    this.productDetailsByAttribute.forEach((key: any) => {
      this.listSize.push(key.kichCo.id)
    })


    this.sizeService.getSize(this.params).then(s => {
      if (s && s.content) {
        s.content.forEach((key: any) => {
          this.kichCos.push(key)
        })

      }
    })

    this.colorService.getColors(this.params).then(c => {
      if (c && c.content) {
        c.content.forEach((key: any) => {
          this.mauSacs.push(key)
        })

      }
    })

    this.materialService.getMaterials(this.params).then(cl => {
      if (cl && cl.content) {
        cl.content.forEach((key: any) => {
          this.chatLieuGiays.push(key)
        })

      }
    })

    this.materialSoleService.getMaterials(this.params).then(cldg => {
      if (cldg && cldg.content) {
        cldg.content.forEach((key: any) => {
          this.chatLieuDeGiays.push(key)
        })

      }
    })


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


    this.productDetailService.getProductByParam(this.params).then(pd => {
      pd.content.forEach((key) => {
        this.productDetail = key;
      })
      if (this.errorSelected) {
        this.notificationService.error("Vui lòng chọn thuộc tính");
      } else if (this.productDetail.soLuong! < 1) {
        this.notificationService.error('Sản phẩm tạm hết hàng');
      } else if (this.productDetail.soLuong! < this.quantity) {
        this.notificationService.error("Số lượng sản phẩm phải nhỏ hơn số lượng trong kho");
      } else if (this.quantity < 0) {
        this.notificationService.error("Số lượng phải lớn hơn 0");
      } else if (this.productDetail.trangThai === 0) {
        this.notificationService.error("Sản phẩm dừng kinh doanh");
      } else if (this.productDetail.trangThai === 1 && this.productDetail.soLuong! <= 0) {
        this.notificationService.error("Sản phẩm tạm hết hàng");
      } else if (this.cacheService.get('customer') === undefined) {
        this.notificationService.error("Vui lòng đăng nhập");
      } else {
        this.addProductToCart.id = this.productDetail.id;
        this.addProductToCart.quantity = this.quantity;


        this.detailService.addToCart(this.addProductToCart).then(c => {
          this.notificationService.success("Thêm sản phẩm vào giỏ hàng thành công");
        }, err => {
          this.notificationService.error("Vui lòng đăng nhập");
        })
      }
    })


  }



  isSelectedSize(sizeId: any): boolean {
    return this.listSize.includes(sizeId);
  }

  isSelectedColor(colorId: any): boolean {
    return this.listColor.includes(colorId);
  }

  isSelectedMaterial(materialId: any): boolean {
    return this.listCL.includes(materialId);
  }

  isSelectedMaterialSole(materialSoleId: any): boolean {
    return this.listCLDG.includes(materialSoleId);
  }


  getKichCo(kichCo: any) {
    this.query.size = kichCo;
    this.params.product = this.id;
    this.params.size = kichCo.id;
    delete this.params.color;
    delete this.params.shoe_material;
    delete this.params.shoe_sole_material;

    this.listColor = [];
    this.listCL = [];
    this.listCLDG = [];

    this.productDetailService.getProductByParam(this.params).then(pd => {

      pd.content.forEach((key: any) => {
        this.listColor.push(key.mauSac.id);
      })
    })
    this.query.color = null;
    this.query.shoe_material = null;
    this.query.shoe_sole_material = null;
  }

  getMauSac(ms: any) {
    this.query.color = ms;
    this.params.product = this.id;
    this.params.color = ms.id;

    delete this.params.shoe_material;
    delete this.params.shoe_sole_material;

    this.listCL = [];
    this.listCLDG = [];

    this.productDetailService.getProductByParam(this.params).then(pd => {

      pd.content.forEach((key: any) => {
        this.listCL.push(key.chatLieuGiay.id);
      })
    })
    this.query.shoe_material = null;
    this.query.shoe_sole_material = null;
  }

  getChatLieu(cl: any) {
    this.query.shoe_material = cl;
    this.params.product = this.id;
    this.params.shoe_material = cl.id;

    delete this.params.shoe_sole_material;

    this.listCLDG = [];

    this.productDetailService.getProductByParam(this.params).then(pd => {

      pd.content.forEach((key: any) => {
        this.listCLDG.push(key.chatLieuDeGiay.id);
      })
    })
    this.query.shoe_sole_material = null;
  }
  getChatLieuDe(cld: any) {
    this.query.shoe_sole_material = cld;
    this.productDetailService.getProductByParam(this.params).then(pd => {
      pd.content.forEach((key: any) => {
        this.priceProduct = key.giaBan;
        this.imgProduct = key.anhSanPhams;
        this.codeProduct = key.ma;
        this.quantityProduct = key.soLuong;
        key.trangThai === 0 ? this.statusProduct = 'Dừng kinh doanh' : this.statusProduct = 'Kinh doanh';
      })
    })
  }
}
