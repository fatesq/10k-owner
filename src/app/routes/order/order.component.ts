import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import * as moment from 'moment';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.less'],
})
export class OrderComponent implements OnInit {
  code = '';
  info = {
    code: '',
    totalRePrice: '',
    createTime: '',
    status: '',
  };
  cars = [];
  minDate = new Date();
  select = [
    {value: 0, label: '未付款'},
    {value: 1, label: '买家已付款'},
    {value: 2, label: '订单已确认汇款'},
    {value: 3, label: '预约验车中'},
    {value: 4, label: '已预约验车'},
    {value: 5, label: '车辆已入库'},
  ];
  modal1 = false;
  modal2 = false;
  footer = [
    {
      text: '确认',
      onPress: () => {
        this.updata({arriveTime: this.info['arriveTime']});
        this.modal1 = false;
      }
    }
  ];
  footer2 = [
    {
      text: '确认',
      onPress: () => {
        this.updata({verifySite: this.info['verifySite']});
        this.modal2 = false;
      }
    }
  ];
  constructor(
    private api: ApiService,
    public activeRoute: ActivatedRoute,
    // private _modal: Modal, private _toast: Toast
  ) { }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(params => {
      this.code = params['code'];
      this.getInfo();
    });
  }

  getInfo() {
    this.api.reserveDetail(this.code).subscribe(res => {
        this.info = res['data'].info;
        this.cars = res['data'].cars;
    });
  }

  updata(data) {
    this.api.orderUpdate({
      code: this.code,
      ...data
    }).subscribe(res => {
      this.getInfo();
    });
  }

  onOk1(result: Date) {
    this.info['verifyTime'] = moment(result).format('YYYY-MM-DD HH:mm');
    this.updata({verifyTime: moment(result).valueOf()});
  }

  onSelect(val) {
    this.updata({status: val[0].value});
  }


}
