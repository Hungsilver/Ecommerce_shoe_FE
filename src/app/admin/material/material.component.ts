import { SlicePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MaterialService } from 'src/libs/service/project/material/material.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MaterialDialogComponent } from './material-dialog/material-dialog.component';
@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss']
})
export class MaterialComponent implements OnInit {

  materials!: any;
  searchQuery: any = {};
  listTotalPage: any = [];

  iconSortName = 'pi pi-sort-amount-up';
  constructor(private materialService: MaterialService,
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
    this.materialService.getMaterials(this.searchQuery).then(material => {
      if (material && material.content) {
        this.materials = material.content;
        this.listTotalPage = this.getTotalPage(material.totalPages)
        console.log(material)
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
    this.dialog.open(MaterialDialogComponent, {
      width: '400px',
      height: '500px',
      data: {
        type: "add",
        material: {}
      },
    })
  }
  openDialogEdit(material: any) {
    this.dialog.open(MaterialDialogComponent, {
      width: '400px',
      height: '500px',
      data: {
        type: 'update',
        material: material,
      }
    })
  }
  openDialogDelete(material: any) {
    const dialogRef = this.dialog.open(MaterialDialogComponent, {
      width: '400px',
      height: '500px',
      data: {
        type: 'delete',
        material: material
      }
    })
    dialogRef.afterClosed().subscribe(data => {
      this.getAll();
    })
  }
}
