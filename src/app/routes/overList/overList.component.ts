import { Component, OnInit } from '@angular/core';
import { ApiService } from './../api.service';
import { ActivatedRoute, ParamMap  } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-over-list',
  templateUrl: './overList.component.html',
  styleUrls: ['./overList.component.less']
})
export class OverListComponent implements OnInit {
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
    this.api.getOrderList({
      sid: localStorage['uid'],
      status: this.status
    }).subscribe(res => {
      console.log(res)
      if (res['code'] == 200) {
        this.list = res['data'];
      }
    });
  }

  setType(key) {
    let text = '';
    switch (key) {
      case 0:
        text = '未付款';
        break;
      case 1:
        text = '已付款';
        break;
      case 2:
        text = '取车完成';
        break;
      case 3:
        text = '已取消';
        break;
      case 4:
        text = '退款中';
        break;
      case 5:
        text = '退款完成';
        break;
      default:
        break;
    }
    return text;
  }

}
