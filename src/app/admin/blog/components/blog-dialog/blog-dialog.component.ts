import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { BlogService } from '../../service/blog.service';
@Component({
  selector: 'app-blog-dialog',
  templateUrl: './blog-dialog.component.html',
  styleUrls: ['./blog-dialog.component.scss']
})
export class BlogDialogComponent implements OnInit {

  blog: any = {};
  type: any;
  ngOnInit(): void {

  }


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private blogService: BlogService,
    private dialog: MatDialog,
  ) {
    this.type = data.type;
    this.blog = data.blog;
  }
  addBlog() {
    this.blogService.createBlog(this.blog).then(res => {
      console.log('data created', res.content);
      if (res) {
        this.dialog.closeAll();
      }
    })
  }
  updateBlog() {
    this.blogService.updateBlog(this.blog, this.blog.id).then(res => {
      if (res) {
        this.dialog.closeAll();
      }
      console.log('data updated', res.content);
    })
  }
  deleteBlog() {
    this.blogService.deleteBlog(this.blog.id);
    this.dialog.closeAll()
  }

}
