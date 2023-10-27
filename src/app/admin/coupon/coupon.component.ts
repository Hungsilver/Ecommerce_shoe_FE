// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-coupon',
//   templateUrl: './coupon.component.html',
//   styleUrls: ['./coupon.component.scss'],
// })
// export class ColorComponent implements OnInit {
//   colors!: any;
//   first: number = 0;
//   searchQuery: any = {};
//   listTotalPage: any = [];

//   rows: number = 10;
//   // iconSortName = 'pi pi-sort-amount-down-alt';
//   iconSortName = 'pi pi-sort-amount-up';

//   constructor() {
//     this.searchQuery.page = 1;
//     this.searchQuery.pageSize = 10;
//   }
//   ngOnInit(): void {
//     this.colors = [
//       { id: 1, ten: 'do', trangThai: 1 },
//       { id: 2, ten: 'xanh', trangThai: 1 },
//       { id: 3, ten: 'vang', trangThai: 1 },
//     ];
//   }
//   onPageChange(event: any) {
//     this.first = event.first;
//     this.rows = event.rows;
//   }
//   sortByName() {
//     if (this.iconSortName === 'pi pi-sort-amount-up') {
//       this.iconSortName = 'pi pi-sort-amount-down-alt';
//     } else if (this.iconSortName === 'pi pi-sort-amount-down-alt') {
//       this.iconSortName = 'pi pi-sort-amount-up';
//     }
//   }
//   getAll(type?: 'page' | 'rows', action?: 'prev' | 'next'): void {}
// }
