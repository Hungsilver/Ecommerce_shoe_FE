import { Component, OnInit } from '@angular/core';
import { ProductDetailService } from '../../services/product.service';
import { MatDialog } from '@angular/material/dialog';

import { dialogProductDetailComponent } from '../dialog-product-detail/dialog-product-detail.component';
import { ProductService } from 'src/app/admin/admin-product/service/product.service';
import { ColorService } from 'src/app/admin/color/service/color.service';
import { SizeService } from 'src/app/admin/size/service/size.service';
import { MaterialService } from 'src/app/admin/material/service/material.service';
import { MaterialSolesService } from 'src/app/admin/material-soles/service/material-soles.service';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  productsDetails!: any;
  product:any =[];
  giaBan: any =[];
  color:any =[];
  size :any =[];
  shoeSoleMaterial:any=[];
  shoeMaterial:any =[];

  searchQuery: any = {};
  listTotalPage: any = [];

  selectedProduct: number | null = null;
  selectedSize: number |null = null;
  selectedColor:number | null = null;
  // iconSortName = 'pi pi-sort-amount-down-alt';
  iconSortName = 'pi pi-sort-amount-up';
  constructor(
    private productDetailService: ProductDetailService,
    private productService : ProductService,
    private colorService :ColorService,
    private sizeService : SizeService,
    private shoesSoleMService: MaterialSolesService,
    private shoesMService :MaterialService,
    private dialog: MatDialog,

  ) {
    this.searchQuery.page = 1;
    this.searchQuery.pageSize = 10;
  }

  ngOnInit(): void {
    this.getAll();

    this.productService.getProduct().then(data => {
      this.product = data.content;
    })
    this.colorService.getColors().then(data => {
      this.color = data.content;
    })
    this.sizeService.getSize().then(data => {
      this.size = data.content;
    })
    this.shoesSoleMService.getMaterials().then(data => {
      this.shoeSoleMaterial = data.content;
    })
    this.shoesMService.getMaterials().then(data => {
      this.shoeMaterial = data.content;
    })
  }
  onPageChange() {
    this.getAll();
  }
  sortByName() {
    if (this.iconSortName === 'pi pi-sort-amount-up') {
      this.searchQuery['sortField'] = 'ten';
      this.searchQuery['isSortDesc'] = false;
      this.getAll();
      this.iconSortName = 'pi pi-sort-amount-down-alt';
    } else if (this.iconSortName === 'pi pi-sort-amount-down-alt') {
      this.searchQuery['sortField'] = 'ten';
      this.searchQuery['isSortDesc'] = true;
      this.getAll();
      this.iconSortName = 'pi pi-sort-amount-up';
    }
  }

  // activeTab: string = 'active'; // Mặc định là tab Hoạt Động

  // changeTab(tab: string): void {
  //   this.activeTab = tab;
  // }

  getAll(action?: 'prev' | 'next' | 'active'): void {
    if (action) {
      if (action === 'prev' && Number(this.searchQuery.page) > 1) {
        this.searchQuery.page = this.searchQuery.page - 1;
      }
      if (
        action === 'next' &&
        Number(this.searchQuery.page) + 1 <= this.listTotalPage.length
      ) {
        this.searchQuery.page = this.searchQuery.page + 1;
      }
      // Thêm trạng thái hoạt động là 1
      // if (action === 'active') {
      //   this.searchQuery.page = 1;
      // }
      Object.keys(this.searchQuery).forEach((key) => {
        if (this.searchQuery[key] === null || this.searchQuery[key] === '') {
          delete this.searchQuery[key];
        }
      });
    }
    this.productDetailService.getProducts(this.searchQuery).then((product) =>{
      if (product && product.content) {
        this.productsDetails = product.content;
        this.listTotalPage = this.getTotalPage(product.totalPages);
        console.log(product);
      }
    });

    if(this.selectedProduct !== null){
    this.searchQuery.product = this.selectedProduct;
      }
      if(this.selectedSize !==null){
        this.searchQuery.size = this.selectedSize;
      }
      if(this.selectedColor !==null){
        this.searchQuery.color =this.selectedColor;
      }
    console.log(this.searchQuery);
  }

  getTotalPage(totalPages: number) {
    let listTotalPage = [];

    for (let i = 1; i <= totalPages; i++) {
      listTotalPage.push(i);
    }
    return listTotalPage;
  }
  searchByName() {
    this.searchQuery['keyword'] = this.searchQuery.keyword;
    this.getAll();
  }



  filterByProduct(): void{
    if(this.selectedProduct !== null){
      this.searchQuery.product =this.selectedProduct;
    }else{
      delete this.searchQuery.product;
    }
    this.getAll();
  }
  filterBySize(): void{
    if(this.selectedSize !== null){
      this.searchQuery.size = this.selectedSize;
    }else{
      delete this.searchQuery.size;
    }
    this.getAll();
  }
  filterByColors(): void{
    if(this.selectedColor !== null){
      this.searchQuery.color = this.selectedColor;
    }else{
      delete this.searchQuery.color;
    }
    this.getAll();
  }





  openDialog() {
    const dialogRef = this.dialog.open(dialogProductDetailComponent, {
      width: '1100px',
      height: '600px',
      data: {
        type: "add",
        productDetail: {},
       products: this.product,
        sizes :this.size,
        colors :this.color,
        shoeMaterials :this.shoeMaterial,
        shoeSoleMaterials:this.shoeSoleMaterial,
      },
    })
    dialogRef.afterClosed().subscribe(data => {
      this.getAll();
    })
  }
  openDialogEdit(productDetail: any) {
    const dialogRef = this.dialog.open(dialogProductDetailComponent, {
      width: '1100px',
      height: '600px',
      data: {
        type: 'update',
        productDetail: productDetail,
       products: this.product,
        sizes :this.size,
        colors :this.color,
        shoeMaterials :this.shoeMaterial,
        shoeSoleMaterials:this.shoeSoleMaterial,
        // giaBan:this.giaBan,

        selectedProductId: productDetail.sanPham ? productDetail.sanPham.id : null,
        selectedSizeId: productDetail.kichCo ? productDetail.kichCo.id : null,
        selectedColorId: productDetail.mauSac ? productDetail.mauSac.id : null,
        selectedShoeMaterialId: productDetail.chatLieuGiay ? productDetail.chatLieuGiay.id : null,
        selectedShoeSoleMaterialId: productDetail.chatLieuDeGiay ? productDetail.chatLieuDeGiay.id : null,
      }
    })
    dialogRef.afterClosed().subscribe(data => {
      this.getAll();
    })
  }
  openDialogDelete(productDetail: any) {
    const dialogRef = this.dialog.open(dialogProductDetailComponent, {
      width: '400px',
      height: '500px',
      data: {
        type: 'delete',
        productDetail: productDetail
      }
    })
    dialogRef.afterClosed().subscribe(data => {
      this.getAll();
    })
  }


}
