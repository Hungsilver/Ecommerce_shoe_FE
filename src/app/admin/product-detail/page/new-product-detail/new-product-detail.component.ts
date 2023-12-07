import { Component, OnInit } from '@angular/core';
import { ProductDetailService } from '../../services/product.service';
import { Router } from '@angular/router';
import { MaterialService } from '../../../material/service/material.service';
import { IMaterial } from 'src/app/admin/material/service/material.module';
import { SizeService } from 'src/app/admin/size/service/size.service';
import { ISize } from 'src/app/admin/size/service/size.module';
import { ColorService } from 'src/app/admin/color/service/color.service';
import { IColor } from 'src/app/admin/color/service/color.module';
import { IMaterialSoles } from 'src/app/admin/material-soles/service/materilal-soles.module';
import { MaterialSolesService } from 'src/app/admin/material-soles/service/material-soles.service';
import { ProductService } from 'src/app/admin/admin-product/service/product.service';
import { IProduct } from 'src/app/admin/admin-product/service/product.module';
import { IProductDetail } from '../../services/product.module';



@Component({
  selector: 'app-new-product-detail',
  templateUrl: './new-product-detail.component.html',
  styleUrls: ['./new-product-detail.component.scss']
})
export class NewProductDetailComponent implements OnInit {
  newProduct: IProductDetail ;
  SanPhams: IProduct[]=[];
  chatLieuGiays: IMaterial[]=[];
  kichCos:ISize[]=[];
  mauSacs:IColor[]=[];
  chatLieuDeGiays:IMaterialSoles[]=[];
  
  

  constructor(
    private productDetailService: ProductDetailService,
    private ChatLieuGiayService: MaterialService,
    private kichcoService :SizeService,
    private mauSacService :ColorService,
    private ChatLieuDeGiayService: MaterialSolesService,
    private SanPhamService : ProductService,
    private router: Router
  ) {
    this.newProduct = {} as IProductDetail;
    this.chatLieuGiays = [];
    this.kichCos =[];
    this.mauSacs =[];
    this.chatLieuDeGiays=[];
    this.SanPhams=[];
  }

  ngOnInit(): void {
    this.ChatLieuGiayService.getMaterials().then(data => {
      this.chatLieuGiays = data.content;
    });
    this.kichcoService.getSize().then(data => {
      this.kichCos = data.content;
          // console.log(data.content)
    });
    this.mauSacService.getColors().then(data => {
      this.mauSacs = data.content;
    });
    this.ChatLieuDeGiayService.getMaterials().then(data => {
      this.chatLieuDeGiays = data.content;
    });
    this.SanPhamService.getProduct().then(data => {
      this.SanPhams = data.content;
    });
  }

  saveProductDetail() {
    this.productDetailService.createProduct(this.newProduct).then(
      (data) => {
        console.log("data " + data);
        this.goToEmployeeList();
      },
      (error) => console.log(error)
    );
  }

  goToEmployeeList() {
    this.router.navigate(['admin/chi-tiet-san-pham']);
  }

  // onSubmit() {
  //   console.log(this.newProduct);
  //   this.saveProductDetail();
  // }
}
