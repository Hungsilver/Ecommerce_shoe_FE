import { SlicePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { OriginService } from 'src/libs/service/project/origin/origin.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { OriginDialogComponent } from './origin-dialog/origin-dialog.component';

@Component({
  selector: 'app-origin',
  templateUrl: './origin.component.html',
  styleUrls: ['./origin.component.scss']
})
export class OriginComponent implements OnInit {
  origins!: any;
  searchQuery: any = {};
  listTotalPage: any = [];

  // iconSortName = 'pi pi-sort-amount-down-alt';
  iconSortName = 'pi pi-sort-amount-up';
  constructor(private originService: OriginService,
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
    this.originService.getOrigins(this.searchQuery).then(origin => {
      if (origin && origin.content) {
        this.origins = origin.content;
        this.listTotalPage = this.getTotalPage(origin.totalPages)
        console.log(origin)
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
    this.dialog.open(OriginDialogComponent, {
      width: '400px',
      height: '500px',
      data: {
        type: "add",
        origin: {}
      },
    })
  }
  openDialogEdit(origin: any) {
    this.dialog.open(OriginDialogComponent, {
      width: '400px',
      height: '500px',
      data: {
        type: 'update',
        origin: origin,
      }
    })
  }
  openDialogDelete(origin: any) {
    const dialogRef = this.dialog.open(OriginDialogComponent, {
      width: '400px',
      height: '500px',
      data: {
        type: 'delete',
        origin: origin
      }
    })
    dialogRef.afterClosed().subscribe(data => {
      this.getAll();
    })
  }
}
