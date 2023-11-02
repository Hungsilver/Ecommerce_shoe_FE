import { Component, OnInit } from '@angular/core';
import { SlicePipe } from '@angular/common';
import { MatDialog, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CustomerService } from '../../service/customer.service';
import { CustomerDialogComponent } from '../../components/customer-dialog/customer-dialog.component';
@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.scss']
})
export class CustomerHomeComponent implements OnInit {

  customers!: any;
  searchQuery: any = {};
  listTotalPage: any = [];

  iconSortName = 'pi pi-sort-amount-up';
  constructor(private customerService: CustomerService,
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
    this.customerService.getCustomer(this.searchQuery).then(customer => {
      if (customer && customer.content) {
        this.customers = customer.content;
        this.listTotalPage = this.getTotalPage(customer.totalPages)
        console.log(customer)
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
    const dialogRef = this.dialog.open(CustomerDialogComponent, {
      width: '400px',
      height: '500px',
      data: {
        type: "add",
        customer: {}
      },
    })
    dialogRef.afterClosed().subscribe(data => {
      this.getAll();
    })
  }
  openDialogEdit(customer: any) {
    const dialogRef = this.dialog.open(CustomerDialogComponent, {
      width: '400px',
      height: '500px',
      data: {
        type: 'update',
        customer: customer,
      }
    })
    dialogRef.afterClosed().subscribe(data => {
      this.getAll();
    })
  }
  openDialogDelete(customer: any) {
    const dialogRef = this.dialog.open(CustomerDialogComponent, {
      width: '400px',
      height: '500px',
      data: {
        type: 'delete',
        customer: customer
      }
    })
    dialogRef.afterClosed().subscribe(data => {
      this.getAll();
    })
  }

}
