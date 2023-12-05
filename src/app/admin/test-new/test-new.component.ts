import { SlicePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';


@Component({
  selector: 'app-test-new',
  templateUrl: './test-new.component.html',
  styleUrls: ['./test-new.component.scss']
})
export class TestNewComponent {
  constructor(private router: Router) { }

  inputData: string = '';

  navigateToComponentB() {
    this.router.navigate(['/admin/test-n'], { state: { inputData: this.inputData } });
  }
}
