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

  setType(key) {
    let text = '';
    switch (key) {
      case 0:
        text = '未付款';
        break;
      case 1:
        text = '买家已付款';
        break;
      case 2:
        text = '订单已确认汇款';
        break;
      case 3:
        text = '预约验车中';
        break;
      case 4:
        text = '已预约验车';
        break;
      case 5:
        text = '车辆已入库';
        break;
      default:
        break;
    }
    return text;
  }

}
