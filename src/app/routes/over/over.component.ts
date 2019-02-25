import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import * as moment from 'moment';

@Component({
  selector: 'app-over',
  templateUrl: './over.component.html',
  styleUrls: ['./over.component.less']
})
export class OverComponent implements OnInit, OnDestroy {
  code = '';
  auth = localStorage['auth'];
  info = {
    code: '',
    totalPrice: 0,
    totalCutPrice: '',
    createTime: '',
    status: 0,
    saleName: '',
    salePhone: '',
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
    {value: 1, label: '已付款'},
    {value: 2, label: '取车完成'},
    {value: 3, label: '已取消'},
    {value: 4, label: '退款中'},
    {value: 5, label: '退款完成'},
  ];
  ownerList = [];
  saleMan = {};
  modal1 = false;
  footer = [
    {
      text: '确认',
      onPress: () => {
        // this.updata({arriveTime: this.info['arriveTime']});
        this.modal1 = false;
      }
    }
  ];
  constructor(
    private api: ApiService,
    public activeRoute: ActivatedRoute,
    private router: Router,
  ) {
    // history.pushState(null, null, document.URL);
    //   window.addEventListener('popstate',  () => {
    //       window.location.hash = 'center';
    //   }, false);
  }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(params => {
      this.code = params['code'];
      this.getInfo();
      this.getOwner();
    });
    window.addEventListener('resize', this.scrollChange);
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.scrollChange);
  }

  scrollChange () {
    const win_h = document.body.scrollHeight;
    if (document.body.scrollHeight < win_h) {
      document.getElementsByClassName('footer')[0]['style'].display = 'none';
    } else {
      document.getElementsByClassName('footer')[0]['style'].display = 'block';
    }
  }

  getInfo() {
    this.api.getOrderDetail(this.code).subscribe(res => {
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

  onOk1(result: Date) {
    this.info['verifyTime'] = moment(result).format('YYYY-MM-DD HH:mm');
    // this.updata({verifyTime: moment(result).valueOf()});
  }

  updata(data) {
    this.api.getOrderUpdate({
      code: this.code,
      ...data
    }).subscribe(res => {
      // this.getInfo();
      // this.router.navigateByUrl(`/home/overlist/0`);
      window.location.hash = '/home/overlist/0';
    });
  }

  onSelect(val) {
    console.log(val)
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
      verifySite: this.info['verifySite'],
      sid: this.saleMan['value'],
      saleName: this.saleMan['label']
    });
  }
}
