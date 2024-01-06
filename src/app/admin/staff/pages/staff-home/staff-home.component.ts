import { Component, OnInit } from '@angular/core';
import { SlicePipe } from '@angular/common';
import { MatDialog, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { StaffService } from '../../service/staff.service';
import { StaffDialogComponent } from '../../components/staff-dialog/staff-dialog.component';


@Component({
  selector: 'app-staff-home',
  templateUrl: './staff-home.component.html',
  styleUrls: ['./staff-home.component.scss']
})
export class StaffHomeComponent implements OnInit {

  staffs!: any;
  searchQuery: any = {};
  listTotalPage: any = [];


  iconSortName = 'pi pi-sort-amount-up';
  constructor(private staffService: StaffService,
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
    this.staffService.getStaff(this.searchQuery).then(staff => {
      if (staff && staff.content) {
        this.staffs = staff.content;
        this.listTotalPage = this.getTotalPage(staff.totalPages)
        console.log(staff)
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
    const dialogRef = this.dialog.open(StaffDialogComponent, {
      width: '1200px',
      height: '550px',
      data: {
        type: "add",
        staff: {}
      },
    })
    dialogRef.afterClosed().subscribe(data => {
      this.getAll();
    })
  }
  openDialogEdit(staff: any) {
    const dialogRef = this.dialog.open(StaffDialogComponent, {
      width: '1200px',
      height: '500px',
      data: {
        type: 'update',
        staff: staff,
      }
    })
    dialogRef.afterClosed().subscribe(data => {
      this.getAll();
    })
  }
  openDialogDelete(staff: any) {
    const dialogRef = this.dialog.open(StaffDialogComponent, {
      width: '400px',
      height: '500px',
      data: {
        type: 'delete',
        staff: staff
      }
    })
    dialogRef.afterClosed().subscribe(data => {
      this.getAll();
    })
  }
}
