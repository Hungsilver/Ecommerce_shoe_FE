import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product/service/product.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductHomeComponent } from '../product/components/product-home/product-home.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  products!: any;
  searchQuery: any = {};
  listTotalPage: any = [];

  // iconSortName = 'pi pi-sort-amount-down-alt';
  iconSortName = 'pi pi-sort-amount-up';
  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.searchQuery.page = 1;
    this.searchQuery.pageSize = 10;
  }

  ngOnInit(): void {
    this.getAll();
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

  getAll(action?: 'prev' | 'next'): void {
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
      Object.keys(this.searchQuery).forEach((key) => {
        if (this.searchQuery[key] === null || this.searchQuery[key] === '') {
          delete this.searchQuery[key];
        }
      });
    }
    this.productService.getProducts(this.searchQuery).then((product) => {
      if (product && product.content) {
        this.products = product.content;
        this.listTotalPage = this.getTotalPage(product.totalPages);
        console.log(product);
      }
    });
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
  navigateToNewProduct() {
    this.router.navigate(['/admin/product/new']);
  }
}
