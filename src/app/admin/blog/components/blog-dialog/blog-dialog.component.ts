import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { BlogService } from '../../service/blog.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-blog-dialog',
  templateUrl: './blog-dialog.component.html',
  styleUrls: ['./blog-dialog.component.scss'],
})
export class BlogDialogComponent implements OnInit {
  blog: any = {};
  type: any;
  ngOnInit(): void {}

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private blogService: BlogService,
    private dialog: MatDialog,
    private fireStorage: AngularFireStorage
  ) {
    this.type = data.type;
    this.blog = data.blog;
  }

  title = 'imageupload';
  bannerUrl = '';
   logoUrl ='';
  // upload 1 ảnh lên firebase
  async onFileChange(event: any) {
    const files = event.target.files;
    console.log('file-log', files);
    if (files) {
      console.log('chay vao if');
      for (let i = 0; i < files.length; i++){
        console.log('chay vao for');
        const file = files[i];
        const path = `images/${file.name}`;
        const uploadTask = await this.fireStorage.upload(path, file);
       const imageUrl = await uploadTask.ref.getDownloadURL();
          console.log('image',imageUrl);

       if (file.name.includes('banner')) {
        this.bannerUrl = imageUrl;
      } else if (file.name.includes('logo')) {
        this.logoUrl = imageUrl;
      }

      }
    }
  }
  addBlog() {
    console.log('ben ham add', this.bannerUrl);
    console.log('ben ham add', this.logoUrl);
    // const blogWithImageUrl ={...this.blog,[this.field]:this.imageUrl};
    // blogWithImageUrl[this.blog] =this.imageUrl;
    this.blog.banner = this.bannerUrl;
    this.blog.logo = this.logoUrl;
    this.blogService.createBlog(this.blog).then((res) => {
      console.log('data created', res.content);
      if (res) {
        this.dialog.closeAll();
      }
    });
  }
  clearFile(): void {
    this.blog.banner = null;
    // Nếu bạn muốn thực hiện thêm bất kỳ xử lý nào khác khi xóa file, bạn có thể đặt mã ở đây.
  }
  updateBlog() {
    this.blogService.updateBlog(this.blog, this.blog.id).then((res) => {
      if (res) {
        this.dialog.closeAll();
      }
      console.log('data updated', res.content);
    });
  }
  deleteBlog() {
    this.blogService.deleteBlog(this.blog.id);
    this.dialog.closeAll();
  }
}
