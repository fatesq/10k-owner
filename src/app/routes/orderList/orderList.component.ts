import { Component, OnInit } from '@angular/core';
import { ApiService } from './../api.service.ts';

@Component({
  selector: 'app-order-list',
  templateUrl: './orderList.component.html',
  styleUrls: ['./orderList.component.less']
})
export class OrderListComponent implements OnInit {
  list = [];
  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    this.getInfo();
  }

  getInfo() {
    this.api.reserveList({
      sid: localStorage['uid'],
      status: 0
    }).subscribe(res => {
      console.log(res)
      if (res['code'] == 200) {
        this.list = res['data'];
      }
    });
  }

}
