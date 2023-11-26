import { Component, OnInit } from '@angular/core';
import { SlicePipe } from '@angular/common';
import { MatDialog, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { BlogService } from '../../service/blog.service';
import { BlogDialogComponent } from '../../components/blog-dialog/blog-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-home',
  templateUrl: './blog-home.component.html',
  styleUrls: ['./blog-home.component.scss']
})
export class BlogHomeComponent implements OnInit {

  blogs!: any;
  searchQuery: any = {};
  listTotalPage: any = [];


  iconSortName = 'pi pi-sort-amount-up';
  constructor(private blogService: BlogService,
    private dialog: MatDialog,
    private router : Router
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
    this.blogService.getBlog(this.searchQuery).then(blog => {
      if (blog && blog.content) {
        this.blogs = blog.content;
        this.listTotalPage = this.getTotalPage(blog.totalPages)
        console.log(blog)
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
    const dialogRef = this.dialog.open(BlogDialogComponent, {
      width: '400px',
      height: '500px',
      data: {
        type: "add",
        blog: {}
      },
    })
    dialogRef.afterClosed().subscribe(data => {
      this.getAll();
    })
  }
  openDialogEdit(blog: any) {
    const dialogRef = this.dialog.open(BlogDialogComponent, {
      width: '400px',
      height: '500px',
      data: {
        type: 'update',
        blog: blog,
      }
    })
    dialogRef.afterClosed().subscribe(data => {
      this.getAll();
    })
  }
  openDialogDelete(blog: any) {
    const dialogRef = this.dialog.open(BlogDialogComponent, {
      width: '400px',
      height: '500px',
      data: {
        type: 'delete',
        blog: blog
      }
    })
    dialogRef.afterClosed().subscribe(data => {
      this.getAll();
    })
  }
  navigateToNewProduct() {
    this.router.navigate(['gioi-thieu/new']);
  }

}
