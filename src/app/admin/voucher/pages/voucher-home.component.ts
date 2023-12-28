import { Component, OnInit } from "@angular/core";
import { VoucherSevice } from "../service/voucher.service";
import { MatDialog } from "@angular/material/dialog";
import { VoucherDialogComponent } from "../components/voucher-Dialog.component";


@Component({
selector:'app-voucher-home',
templateUrl:'./voucher-home.component.html',
styleUrls: ['./voucher-home.component.scss'],
})

export class VoucherHomeComponent implements OnInit{
    vouchers!: any;
    searchQuery: any ={};
    listTotalPage: any=[];

    iconSortName = 'pi pi-sort-amount-up';
constructor(private voucherService: VoucherSevice,
    private dialog: MatDialog, ){
this.searchQuery.page = 1;
this.searchQuery.pageSize = 10;

}

  ngOnInit(): void {
this.getAll();
  }
  onPageChange(){
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
  if(action){
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
      this.voucherService.getVoucher(this.searchQuery).then(voucher =>{
      if(voucher && voucher.content){
    this.vouchers = voucher.content;
    this.listTotalPage =this.getTotalPage(voucher.totalPages)
  }
})
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
  const dialogRef = this.dialog.open(VoucherDialogComponent, {
    width: '1200px',
    height: '480px',

    data: {
      type: "add",
      voucher: {}
    },
  })
  dialogRef.afterClosed().subscribe(data => {
    this.getAll();
  })
}
openDialogEdit(voucher: any) {
  const dialogRef = this.dialog.open(VoucherDialogComponent, {
    width: '1200px',
    height: '480px',
    data: {
      type: 'update',
      voucher: voucher,
    }
  })
  dialogRef.afterClosed().subscribe(data => {
    this.getAll();
  })
}

openDialogDelete(voucher: any) {
  const dialogRef = this.dialog.open(VoucherDialogComponent, {
    width: '400px',
    height: '500px',
    data: {
      type: 'delete',
      voucher: voucher
    }
  })
  dialogRef.afterClosed().subscribe(data => {
    this.getAll();
  })
}














}









