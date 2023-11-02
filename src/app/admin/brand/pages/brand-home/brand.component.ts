import { Component, OnInit } from '@angular/core';
import { SlicePipe } from '@angular/common';
import { MatDialog, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { BrandService } from '../../service/brand.service';
import { BrandDialogComponent } from '../../components/brand-dialog/brand-dialog.component';
@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {

  brands!: any;
  searchQuery: any = {};
  listTotalPage: any = [];



  iconSortName = 'pi pi-sort-amount-up';
  constructor(private brandService: BrandService,
    private dialog: MatDialog
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
    this.brandService.getBrand(this.searchQuery).then(brand => {
      if (brand && brand.content) {
        this.brands = brand.content;
        this.listTotalPage = this.getTotalPage(brand.totalPages)
        console.log(brand)
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
    const dialogRef = this.dialog.open(BrandDialogComponent, {
      width: '400px',
      height: '500px',
      data: {
        type: "add",
        brand: {}
      },
    })
    dialogRef.afterClosed().subscribe(data => {
      this.getAll();
    })
  }
  openDialogEdit(brand: any) {
    const dialogRef = this.dialog.open(BrandDialogComponent, {
      width: '400px',
      height: '500px',
      data: {
        type: 'update',
        brand: brand,
      }
    })
    dialogRef.afterClosed().subscribe(data => {
      this.getAll();
    })
  }
  openDialogDelete(brand: any) {
    const dialogRef = this.dialog.open(BrandDialogComponent, {
      width: '400px',
      height: '500px',
      data: {
        type: 'delete',
        brand: brand,
      }
    })
    dialogRef.afterClosed().subscribe(data => {
      this.getAll();
    })
  }

}
