import { SlicePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MaterialSolesService } from '../../service/material-soles.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MaterialSolesDialogComponent } from '../../components/material-soles-dialog/material-soles-dialog.component';
@Component({
  selector: 'app-material-soles',
  templateUrl: './material-soles.component.html',
  styleUrls: ['./material-soles.component.scss']
})
export class MaterialSolesComponent implements OnInit {
  materialsoles!: any;
  searchQuery: any = {};
  listTotalPage: any = [];

  iconSortName = 'pi pi-sort-amount-up';
  constructor(private materialSoles: MaterialSolesService,
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
    this.materialSoles.getMaterials(this.searchQuery).then(material => {
      if (material && material.content) {
        this.materialsoles = material.content;
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
    const dialogRef = this.dialog.open(MaterialSolesDialogComponent, {
      width: '400px',
      height: '500px',
      data: {
        type: "add",
        material: {}
      },
    })
    dialogRef.afterClosed().subscribe(data => {
      this.getAll();
    })
  }
  openDialogEdit(materialSoles: any) {
    console.log("de giay", materialSoles);
    const dialogRef = this.dialog.open(MaterialSolesDialogComponent, {
      width: '400px',
      height: '500px',
      data: {
        type: 'update',
        material: materialSoles,
      }
    })

    
    dialogRef.afterClosed().subscribe(data => {
      this.getAll();
    })
  }
  openDialogDelete(material: any) {
    const dialogRef = this.dialog.open(MaterialSolesDialogComponent, {
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
