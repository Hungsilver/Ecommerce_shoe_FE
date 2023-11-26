import { Component, Inject, OnInit } from '@angular/core';
// import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { BlogService } from '../blog/service/blog.service';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
selector :'app-blogs-new',
templateUrl: './blogs-new.component.html',
styleUrls: ['./blogs-new.component.scss']
})

export class blogsnewComponent implements OnInit{

  // blog: any={}
  // type: any;
  ngOnInit(): void {
  }

  // constructor(
  //   @Inject() public data:any,

  //   ){

  // }
  // addBlog() {
  //   this.blogService.createBlog(this.blog).then(res => {
  //     console.log('data created', res.content);
  //     if (res) {
  //       this.dialog.closeAll();
  //     }
  //   })
  // }
  // updateBlog() {
  //   this.blogService.updateBlog(this.blog, this.blog.id).then(res => {
  //     if (res) {
  //       this.dialog.closeAll();
  //     }
  //     console.log('data updated', res.content);
  //   })
  // }
  // deleteBlog() {
  //   this.blogService.deleteBlog(this.blog.id);
  //   this.dialog.closeAll()
  // }




}




