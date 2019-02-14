import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  activeTab = window.location.hash.indexOf('orderlist') > 0 ? 'orderlist' : 'overlist';
  index = 0;
  index2 = 0;
  indexTab = window.location.hash.indexOf('orderlist') > 0 ? 0 : 1;
  name = '';
  constructor(
    private router: Router,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.getOne();
  }


  onPress(e) {
    this.activeTab = e.key;
    this.router.navigateByUrl(`/home/${e.key}/0`);
  }

  onChange(e) {
    this.router.navigateByUrl(`/home/${this.activeTab}/${e.index}`);
  }

  getOne() {
      this.api.one().subscribe(res => {
        if (res['code'] == 200) {
          this.name = res['data'].name;
        }
      });
  }
  out() {
    this.api.out().subscribe(res => {
      if (res['code'] == 200) {
        localStorage.clear();
        this.router.navigateByUrl(`/login`);
      }
    });
  }
}
