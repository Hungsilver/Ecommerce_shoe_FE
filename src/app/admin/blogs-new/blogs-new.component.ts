import { Component, Inject, OnInit } from '@angular/core';
// import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { BlogService } from '../blog/service/blog.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-blogs-new',
  templateUrl: './blogs-new.component.html',
  styleUrls: ['./blogs-new.component.scss'],
})
export class blogsnewComponent implements OnInit {
  blogForm!: FormGroup;

  ngOnInit(): void {}
  constructor(private blogService: BlogService,
     private fb: FormBuilder,
     private toats:NgToastService) {
    if (!this.blogForm) {
      this.blogForm = this.fb.group({
        title: [''],
        content: [''],
        auther: [''],
      });
    }
  }
  addblog(){
    const formData = this.blogForm.value;
    this.blogService.createBlog(formData).then(res => {
      console.log('Blog created', res.content);
    if(res){
      this.toats.success({ detail: "Success Message", summary: "Success", duration: 5000 })

    }else{
      this.toats.error({detail:"Success False",summary:"false",duration:5000})
    }
    });

  }







}
