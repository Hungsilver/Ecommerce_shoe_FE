import { Component } from '@angular/core';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent {
  visible: boolean = false;
  color = {
    id: '',
    name: '',
    dh: '',
  }
  ingredient: string = '';
  sanpham = {
    id: '',
    name: '',
    idColor: '',
    idSize: ''
  }

  showDialog() {
    this.visible = true;
  }
  showAge() {
    alert(this.color.name)
  }

  addSp() {
    alert(this.sanpham.name)
  }
}
