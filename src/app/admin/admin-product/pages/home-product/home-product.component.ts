import { Component, OnInit } from '@angular/core';
import { SlicePipe } from '@angular/common';
import { MatDialog, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ProductService } from '../../service/product.service';
import { DialogProductComponent } from '../../components/dialog-product/dialog-product.component';
import { CategoryService } from '../../../category/service/category.service';
import { BrandService } from 'src/app/admin/brand/service/brand.service';
import { OriginService } from 'src/libs/service/project/origin/origin.service';
@Component({
  selector: 'app-home-product',
  templateUrl: './home-product.component.html',
  styleUrls: ['./home-product.component.scss']
})
export class HomeProductComponent implements OnInit {
  products!: any;
  category: any = [];
  origin: any = [];
  brand: any = [];
  searchQuery: any = {};
  listTotalPage: any = [];

  iconSortName = 'pi pi-sort-amount-up';
  // constructor(private categoryService: CategoryService)
  constructor(private productService: ProductService,
    private categoryService: CategoryService,
    private originService: OriginService,
    private brandService: BrandService,
    private dialog: MatDialog
  ) {
    this.searchQuery.page = 1;
    this.searchQuery.pageSize = 5;
  }

  ngOnInit(): void {
    this.getAll();
    this.categoryService.getCategory().then(data => {
      this.category = data.content;
    })
    this.originService.getOrigins().then(data => {
      this.origin = data.content;
    })
    this.brandService.getBrand().then(data => {
      this.brand = data.content;
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
      this.iconSortName = 'pi pi-sort-amount-down-alt'
    } else if (this.iconSortName === 'pi pi-sort-amount-down-alt') {
      this.searchQuery['sortField'] = 'ten';
      this.searchQuery['isSortDesc'] = true;
      this.getAll();
      this.iconSortName = 'pi pi-sort-amount-up'
    }
  }

  getAll(action?: 'prev' | 'next'): void {
    if (action) {
      if (action === 'prev' && Number(this.searchQuery.page) > 1) {
        this.searchQuery.page = this.searchQuery.page - 1
      }
      if (action === 'next' &&
        Number(this.searchQuery.page) + 1 <= this.listTotalPage.length) {
        this.searchQuery.page = this.searchQuery.page + 1
      }
      Object.keys(this.searchQuery).forEach(key => {
        if (this.searchQuery[key] === null || this.searchQuery[key] === '') {
          delete this.searchQuery[key];
        }
      });
    }
    this.productService.getProduct(this.searchQuery).then(product => {
      if (product && product.content) {
        this.products = product.content;
        this.listTotalPage = this.getTotalPage(product.totalPages)
        console.log(product)
      }

    })
    console.log(this.searchQuery)
  }


  getTotalPage(totalPages: number) {
    let listTotalPage = []

    for (let i = 1; i <= totalPages; i++) {
      listTotalPage.push(i);
    }
    return listTotalPage;
  }
  searchByName() {
    this.searchQuery['keyword'] = this.searchQuery.keyword;
    this.getAll();
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogProductComponent, {
      width: '400px',
      height: '500px',
      data: {
        type: "add",
        product: {},
        categories: this.category,
        brands: this.brand,
        origins: this.origin,
      },
    })
    dialogRef.afterClosed().subscribe(data => {
      this.getAll();
    })
  }
  openDialogEdit(product: any) {
    const dialogRef = this.dialog.open(DialogProductComponent, {
      width: '400px',
      height: '500px',
      data: {
        type: 'update',
        product: product,
        categories: this.category,
        brands: this.brand,
        origins: this.origin,

        selectedCategoryId: product.danhMuc ? product.danhMuc.id : null,
        selectedBrandId: product.thuongHieu ? product.thuongHieu.id : null,
        // selectedOriginId: product.xuatXu ? product.xuatXu.id : null,
      }
    })
    dialogRef.afterClosed().subscribe(data => {
      this.getAll();
    })
  }
  openDialogDelete(product: any) {
    const dialogRef = this.dialog.open(DialogProductComponent, {
      width: '400px',
      height: '500px',
      data: {
        type: 'delete',
        product: product
      }
    })
    dialogRef.afterClosed().subscribe(data => {
      this.getAll();
    })
  }
}
