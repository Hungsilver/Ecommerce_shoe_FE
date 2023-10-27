import { Component, OnInit } from '@angular/core';
import { SlicePipe } from '@angular/common';
import { ColorService } from 'src/libs/service/project/color/color.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ColorDialogComponent } from './color-dialog/color-dialog.component';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent implements OnInit {
  colors!: any;
  // first: number = 0;
  searchQuery: any = {};
  listTotalPage: any = [];

  iconSortName = 'pi pi-sort-amount-up';
  constructor(private colorService: ColorService,
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
    this.colorService.getColors(this.searchQuery).then(color => {
      if (color && color.content) {
        this.colors = color.content;
        this.listTotalPage = this.getTotalPage(color.totalPages)
        console.log(color)
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
    this.dialog.open(ColorDialogComponent, {
      width: '400px',
      height: '500px',
      data: {
        type: "add",
        color: {}
      },
    })
  }
  openDialogEdit(color: any) {
    this.dialog.open(ColorDialogComponent, {
      width: '400px',
      height: '500px',
      data: {
        type: 'update',
        color: color,
      }
    })
  }
  openDialogDelete(color: any) {
    const dialogRef = this.dialog.open(ColorDialogComponent, {
      width: '400px',
      height: '500px',
      data: {
        type: 'delete',
        color: color
      }
    })
    dialogRef.afterClosed().subscribe(data => {
      this.getAll();
    })
  }


  // rows: number = 10;
  // iconSortName = 'pi pi-sort-amount-down-alt';
  // iconSortName = 'pi pi-sort-amount-up';

  // constructor() {
  //   this.searchQuery.page = 1;
  //   this.searchQuery.pageSize = 10;
  // }
  // ngOnInit(): void {
  //   this.colors = [
  //     { id: 1, ten: 'do', trangThai: 1 },
  //     { id: 2, ten: 'xanh', trangThai: 1 },
  //     { id: 3, ten: 'vang', trangThai: 1 },
  //   ];
  // }
  // onPageChange(event: any) {
  //   this.first = event.first;
  //   this.rows = event.rows;
  // }
  // sortByName() {
  //   if (this.iconSortName === 'pi pi-sort-amount-up') {
  //     this.iconSortName = 'pi pi-sort-amount-down-alt'
  //   } else if (this.iconSortName === 'pi pi-sort-amount-down-alt') {
  //     this.iconSortName = 'pi pi-sort-amount-up'
  //   }

  // }
  // getAll(type?: 'page' | 'rows', action?: 'prev' | 'next'): void {

  // }

}
