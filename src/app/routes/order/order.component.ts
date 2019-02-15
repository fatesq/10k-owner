import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { ApiService } from '../api.service';
import * as moment from 'moment';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.less'],
})
export class OrderComponent implements OnInit {
  auth = localStorage['auth'];
  code = '';
  info = {
    code: '',
    totalPrice: 0,
    totalRePrice: '',
    totalCutPrice: '',
    createTime: '',
    status: 0,
    arriveTime: '',
    verifyTime: '',
    verifySite: '',
    user: {
      realName: '',
      phone: '',
    }
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
  ownerList = [];
  saleMan = {};
  footer = [
    {
      text: '确认',
      onPress: () => {
        // this.updata({arriveTime: this.info['arriveTime']});
        this.modal1 = false;
      }
    }
  ];
  footer2 = [
    {
      text: '确认',
      onPress: () => {
        // this.updata({verifySite: this.info['verifySite']});
        this.modal2 = false;
      }
    }
  ];
  constructor(
    private api: ApiService,
    public activeRoute: ActivatedRoute,
    private router: Router,
    // private _modal: Modal, private _toast: Toast
  ) { }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(params => {
      this.code = params['code'];
      this.getInfo();
      this.getOwner();
    });
  }

  getInfo() {
    this.api.reserveDetail(this.code).subscribe(res => {
        this.info = res['data'].info;
        this.cars = res['data'].cars;
        this.saleMan = {
          value: this.info['sid'],
          label: this.info['saleName']
        };
    });
  }

  getOwner() {
    this.api.ownSaleman().subscribe(res => {
      this.ownerList = res['data'].map(i => {
        return {
          value: i.id,
          label: i.name,
        };
      });
    });
  }

  updata(data) {
    this.api.orderUpdate({
      code: this.code,
      ...data
    }).subscribe(res => {
      // this.getInfo();
      this.router.navigateByUrl(`/home/orderlist/0`);
    });
  }

  onOk1(result: Date) {
    console.log(result)
    this.info['verifyTime'] = moment(result).format('YYYY-MM-DD HH:mm');
    console.log(this.info['verifyTime'])
    // this.updata({verifyTime: moment(result).valueOf()});
  }

  onSelect(val) {
    this.info['status'] = val[0].value;
    // this.updata({status: val[0].value});
  }

  onSelectSale(val) {
    this.saleMan = val[0];
  }


  add() {
    this.updata({
      verifyTime: moment(this.info['verifyTime']).valueOf(),
      status: this.info['status'],
      arriveTime: this.info['arriveTime'],
      verifySite: this.info['verifySite'],
      sid: this.saleMan['value'],
      saleName: this.saleMan['label']
    });
  }

}
