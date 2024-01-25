import { Component, OnInit } from '@angular/core';
import { CacheService } from 'src/libs/service/request/cache.service';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarAdminComponent implements OnInit {
  infoLogin: any = undefined;
  isAdmin: boolean = true;
  first: number = 0;

  rows: number = 10;
  constructor(private cacheService: CacheService) {

  }
  ngOnInit(): void {
    this.infoLogin = this.cacheService.get('admin') ?? undefined;
    console.log(this.infoLogin.chucVus[0].id);

    this.infoLogin.chucVus[0].id === 1 ? this.isAdmin = true : this.isAdmin = false;

  }
  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }
}
