import { SlicePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SizeService } from 'src/libs/service/project/size/size.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { SizeDialogComponent } from './size-dialog/size-dialog.component';
@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.scss']
})
export class SizeComponent implements OnInit {

  sizes!: any;
  searchQuery: any = {};
  listTotalPage: any = [];



  iconSortName = 'pi pi-sort-amount-up';
  constructor(private sizeService: SizeService,
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
    this.sizeService.getSizes(this.searchQuery).then(size => {
      if (size && size.content) {
        this.sizes = size.content;
        this.listTotalPage = this.getTotalPage(size.totalPages)
        console.log(size)
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
    this.dialog.open(SizeDialogComponent, {
      width: '400px',
      height: '500px',
      data: {
        type: "add",
        size: {}
      },
    })
  }
  openDialogEdit(size: any) {
    this.dialog.open(SizeDialogComponent, {
      width: '400px',
      height: '500px',
      data: {
        type: 'update',
        size: size,
      }
    })
  }
  openDialogDelete(size: any) {
    const dialogRef = this.dialog.open(SizeDialogComponent, {
      width: '400px',
      height: '500px',
      data: {
        type: 'delete',
        size: size
      }
    })
    dialogRef.afterClosed().subscribe(data => {
      this.getAll();
    })
  }


}
