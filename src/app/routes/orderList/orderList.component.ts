import { Component, OnInit } from '@angular/core';
import { ApiService } from './../api.service';
import { ActivatedRoute, ParamMap  } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-order-list',
  templateUrl: './orderList.component.html',
  styleUrls: ['./orderList.component.less']
})
export class OrderListComponent implements OnInit {
  list = [];
  status = '0';
  constructor(
    private api: ApiService,
    public activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activeRoute.paramMap.subscribe(params => {
      this.status = (params.get('id') == '2' ? '5' : params.get('id'));
      this.list = [];
      this.getInfo();
    });
  }

  getInfo() {
    this.api.reserveList({
      sid: localStorage['uid'],
      status: this.status
    }).subscribe(res => {
      if (res['code'] == 200) {
        this.list = res['data'];
      }
    });
  }

}
