import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { parse, stringify } from 'qs';
import md5 from 'js-md5';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  userName = '';
  passWord = '';
  time = 60;
  constructor(
    private api: ApiService,
    private router: Router,
  ) {}

  ngOnInit() {
  }




  login() {
    this.api.dologin({
      userName: this.userName,
      password: md5(this.passWord),
    }).subscribe(res => {
      if (res['code'] == 200) {
        localStorage['token'] = res['data'].token;
        localStorage['uid'] = res['data'].sid;
        this.router.navigateByUrl(`/home`);
      } else {
        alert(res['description'] || res['msg']);
      }
    });
  }

}
