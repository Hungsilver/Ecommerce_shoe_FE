import { Component, OnInit } from '@angular/core';
import { TraHangService } from '../../service/tra-hang.service';

@Component({
  selector: 'app-customer-tra-hang',
  templateUrl: './customer-tra-hang.component.html',
  styleUrls: ['./customer-tra-hang.component.scss']
})
export class CustomerTraHangComponent implements OnInit {
  listTraHang: any [] = [];

  constructor(
    private traHangService: TraHangService
  ){

  }

  ngOnInit(): void {
    this.traHangService.findAllByTrangThai(0).then(c=>{
      this.listTraHang = c;
    })
  }

}