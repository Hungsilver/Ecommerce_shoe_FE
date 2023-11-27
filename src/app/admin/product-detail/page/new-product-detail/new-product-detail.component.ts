import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../services/product.module';
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


@Component({
  selector: 'app-new-product-detail',
  templateUrl: './new-product-detail.component.html',
  styleUrls: ['./new-product-detail.component.scss']
})
export class NewProductDetailComponent implements OnInit {
  newProduct: IProduct;
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
    private router: Router
  ) {
    this.newProduct = {} as IProduct;
    this.chatLieuGiays = [];
    this.kichCos =[];
    this.mauSacs =[];
    this.chatLieuDeGiays=[];
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
  }

  saveProductDetail() {
    this.productDetailService.createProduct(this.newProduct).then(
      (data) => {
        console.log(data);
        this.goToEmployeeList();
      },
      (error) => console.log(error)
    );
  }

  goToEmployeeList() {
    this.router.navigate(['admin/chi-tiet-san-pham']);
  }

  onSubmit() {
    console.log(this.newProduct);
    this.saveProductDetail();
  }
}
