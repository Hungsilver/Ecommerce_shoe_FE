import { Component, OnInit } from '@angular/core';
import { SlicePipe } from '@angular/common';
import { MatDialog, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { AddressService } from '../../service/address.service';
import { AddressDialogComponent } from '../../components/address-dialog/address-dialog.component';

@Component({
  selector: 'app-address-home',
  templateUrl: './address-home.component.html',
  styleUrls: ['./address-home.component.scss']
})
export class AddressHomeComponent implements OnInit {

  addresse!: any;
  searchQuery: any = {};
  listTotalPage: any = [];


  iconSortName = 'pi pi-sort-amount-up';
  constructor(private addressService: AddressService,
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
    this.addressService.getAddress(this.searchQuery).then(address => {
      if (address && address.content) {
        this.addresse = address.content;
        this.listTotalPage = this.getTotalPage(address.totalPages)
        console.log(address)
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
    const dialogRef = this.dialog.open(AddressDialogComponent, {
      width: '400px',
      height: '500px',
      data: {
        type: "add",
        address: {}
      },
    })
    dialogRef.afterClosed().subscribe(data => {
      this.getAll();
    })
  }
  openDialogEdit(address: any) {
    const dialogRef = this.dialog.open(AddressDialogComponent, {
      width: '400px',
      height: '500px',
      data: {
        type: 'update',
        address: address,
      }
    })
    dialogRef.afterClosed().subscribe(data => {
      this.getAll();
    })
  }
  openDialogDelete(address: any) {
    const dialogRef = this.dialog.open(AddressDialogComponent, {
      width: '400px',
      height: '500px',
      data: {
        type: 'delete',
        address: address
      }
    })
    dialogRef.afterClosed().subscribe(data => {
      this.getAll();
    })
  }

}
