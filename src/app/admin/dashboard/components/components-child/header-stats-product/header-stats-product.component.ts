import { Component, Input, OnInit } from '@angular/core';
import { IDataHeader } from '../../../service/dashboard.module';

@Component({
  selector: 'app-header-stats-product',
  templateUrl: './header-stats-product.component.html',
  styleUrls: ['./header-stats-product.component.scss']
})
export class HeaderStatsProductComponent implements OnInit {

  @Input() dataHeaderStat!: any;

  constructor() { }

  ngOnInit() {
  }

}
