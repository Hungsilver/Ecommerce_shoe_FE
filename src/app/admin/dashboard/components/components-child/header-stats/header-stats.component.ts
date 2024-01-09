import { Component, Input, OnInit } from '@angular/core';
import { IDataHeader } from '../../../service/dashboard.module';

@Component({
  selector: 'app-header-stats',
  templateUrl: './header-stats.component.html',
  styleUrls: ['./header-stats.component.scss']
})
export class HeaderStatsComponent implements OnInit {

  @Input() dataHeaderStat!: IDataHeader;

  constructor() { }

  ngOnInit() {
  }

}
